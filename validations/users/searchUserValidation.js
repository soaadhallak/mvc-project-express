const { z } = require("zod");

const searchUserSchema = z.object({
  name: z.preprocess(
    (val) => (val === undefined || val === null ? "" : val),
    z.string().trim().min(1, "Search term is required"),
  ),
});

module.exports = searchUserSchema;
