const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const router = Router();

router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Incorrect password').isLength(
            {
                min: 6,
            },
        ),
    ],
    async(req, res) => {
        try {
            console.log('BODY', req.body);
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Incorrect data during registration'});
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({email});

            if(candidate) {
                return res.status(400).json({message: 'This user has already exist'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({email, password: hashedPassword});

            await user.save();

            res.status(201).json({message: 'User has registered'});
        } catch (error) {
            res.status(500).json({message: 'Something went wrong'});
        }
    },
);

router.post(
    '/login',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input correct password').exists(),
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Incorrect data during logging'});
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});

            if(!user) {
                return res.status(400).json({message: 'This user is not registered'});
            }

            const isMatchPassword = await bcrypt.compare(password, user.password);

            if(!isMatchPassword) {
                return res.status(400).json({message: 'Wrong password'});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecretKey'),
                {expiresIn: '1h'},
            );

            res.json({token, userId: user.id});
        } catch (error) {
            res.status(500).json({message: 'Something went wrong'});
        }
    },
);

module.exports = router;