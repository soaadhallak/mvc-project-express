const { describe, test, before, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const Module = require('module');

const mockFindMany = {
    calls: [],
    implementation: async () => [],
    async fn(...args) {
        this.calls.push(args);
        return this.implementation(...args);
    },
    reset() {
        this.calls = [];
        this.implementation = async () => [];
    }
};

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
    if (request === '@prisma/client') {
        return {
            PrismaClient: class {
                constructor() {
                    this.user = {
                        findMany: (...args) => mockFindMany.fn(...args)
                    };
                }
            }
        };
    }
    return originalLoad.apply(this, arguments);
};

let search;
let validateQuery;
let searchUserSchema;

const createMockRes = () => {
    const res = {
        statusCode: null,
        body: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        }
    };
    return res;
};

describe('GET /api/users/search', () => {
    before(() => {
        search = require('../controllers/userController').search;
        validateQuery = require('../middlewares/validateQuery').validateQuery;
        searchUserSchema = require('../validations/users/searchUserValidation');
    });

    beforeEach(() => {
        mockFindMany.reset();
    });

    test('successful search', async () => {
        const users = [
            { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
            { id: 2, name: 'Alice Johnson', email: 'alice.j@example.com' }
        ];
        mockFindMany.implementation = async () => users;

        const req = { query: { name: 'alice' } };
        const res = createMockRes();

        await search(req, res);

        assert.equal(mockFindMany.calls.length, 1);
        assert.deepEqual(mockFindMany.calls[0][0], {
            where: {
                name: {
                    contains: 'alice',
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        assert.deepEqual(res.body, {
            success: true,
            data: users
        });
    });

    test('missing search parameter', () => {
        const middleware = validateQuery(searchUserSchema);
        const req = { query: {} };
        const res = createMockRes();
        let nextCalled = false;

        middleware(req, res, () => {
            nextCalled = true;
        });

        assert.equal(res.statusCode, 400);
        assert.deepEqual(res.body, {
            success: false,
            message: 'Search term is required'
        });
        assert.equal(nextCalled, false);
    });

    test('no users found', async () => {
        mockFindMany.implementation = async () => [];

        const req = { query: { name: 'nonexistent' } };
        const res = createMockRes();

        await search(req, res);

        assert.equal(mockFindMany.calls.length, 1);
        assert.deepEqual(res.body, {
            success: true,
            data: []
        });
    });
});
