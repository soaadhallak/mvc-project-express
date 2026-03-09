exports.validate = (schema, view) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errors = {};

        result.error.issues.forEach(e => {
            errors[e.path[0]] = e.message;
        });

        return res.render(view, { errors: errors, old: req.body });
    }

    next();
}
