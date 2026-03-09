const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.index = async (req, res) => {
    const articles = await prisma.article.findMany();

    res.render('articles/index', { articles: articles });
}


exports.create = (req, res) => {
    res.render('articles/create')
}


exports.store = async (req, res) => {
    const { title, content } = req.body;

    await prisma.article.create({
        data: { title, content }
    });

    res.redirect("/articles");
}


exports.edit = async (req, res) => {
    const id = Number(req.params.id);

    const article = await prisma.article.findUnique({
        where: { id }
    });

    res.render("articles/edit", {article: article});
}


exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    await prisma.article.update({
        where: { id },
        data: { title, content }
    });

    res.redirect("/articles");
}


exports.destroy = async (req, res) => {
    const id = Number(req.params.id);

    await prisma.article.delete({
        where: { id }
    });

    res.redirect("/articles");
}