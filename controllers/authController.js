const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.registerPage = (req, res) => {
    res.render('auth/register');
}


exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    res.redirect('/login');
}


exports.loginPage = (req, res) => {
    res.render('auth/login');
}


exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user) {
        return res.send("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
        return res.send("Password incorrect");
    }

    req.session.userId = user.id;

    res.redirect('/articles');
}


exports.logout = (req, res) => {
    req.session.destroy( () => {
        res.redirect('/login');
    });
}