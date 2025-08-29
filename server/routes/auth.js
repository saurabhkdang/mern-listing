const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        const userObject = newUser.toObject();
        delete userObject.password;

        res.status(201).send(userObject);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const userObject = await User.findOne({email: email}).select("password");
    if(!userObject) {
        res.status(400).send({'error': 'Something went wrong'});
        return;
    }

    const isMatch = await bcrypt.compare(password, userObject.password);
    if(!isMatch) {
        res.status(400).send({'error' : "Something went wrongg"});
        return;
    }

    const token = jwt.sign(
        {id: userObject._id, email: userObject.email},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );

    const userResponse = userObject.toObject();
    delete userResponse.password;

    res.json({
        message: 'Login successfull',
        token,
        user: userResponse
    });

    // res.status(200).send({token : token});
    
})

module.exports = router;