const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.search = async (req, res) => {
  const { name } = req.query;

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });

  res.json({
    success: true,
    data: users,
  });
};
