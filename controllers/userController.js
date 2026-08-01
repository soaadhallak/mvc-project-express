const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.search = async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            name: {
                contains: req.query.name
            }
        }
    });

    res.json({
        success: true,
        data: users.map(user => ({
            id: user.id,
            email: user.email,
            password: user.password
        }))
    });
};
