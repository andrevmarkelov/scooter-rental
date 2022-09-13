const apiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Cart } = require('../models/models');


const generateJwt = (id, name, email, phone, role) => {
    return jwt.sign({ id, name, email, phone, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
    async registration(req, res, next) {
        try {
            const { password, name, email, phone, role } = req.body;
            console.log(req.body);
            if (!password || !name || !email || !phone) {
                return next(apiError.badRequest('The fields must all be filled in'));
            }

            // Checking the user
            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return next(apiError.badRequest('A user with this email already exists'))
            }

            // Hashing the password
            const hashPassword = await bcrypt.hash(password, 5);

            // Creating a user
            const user = await User.create({ password: hashPassword, name, email, phone, role });
            const cart = await Cart.create({ userId: user.id });

            const token = generateJwt(user.id, user.name, user.email, user.phone, user.role);
            return res.json({ token });

        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        // Checking the user with email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(apiError.badRequest('The user with the email was not found'));
        }

        // Comparing the password
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(apiError.badRequest('Invalid password specified'));
        }

        const token = generateJwt(user.id, user.name, user.email, user.phone, user.role);
        return res.json({ token });
    }

    async auth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.phone, req.user.role);
        return res.json({ token });
    }

    async get(req, res, next) {
        const users = await User.findAll();
        return res.json(users);
    }
}

module.exports = new UserController();