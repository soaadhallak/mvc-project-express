const { z } = require('zod');

const registerSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters")
        .max(255, "Name must not exceed 255 characters"),

    email: z.string()
        .email("Invalid email address"),

    password: z.string()
        .min(8, "Password must be at least 8 characters")
});


module.exports  = registerSchema