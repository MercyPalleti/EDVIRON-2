const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');


const generateToken = (user) => {
return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};


exports.register = async (req, res) => {
const schema = Joi.object({ name: Joi.string().required(), email: Joi.string().email().required(), password: Joi.string().min(6).required() });
const { error } = schema.validate(req.body);
if (error) return res.status(400).json({ message: error.message });
const { name, email, password } = req.body;
const exists = await User.findOne({ email });
if (exists) return res.status(400).json({ message: 'User exists' });
const user = await User.create({ name, email, password });
res.status(201).json({ token: generateToken(user), user: { id: user._id, name: user.name, email: user.email } });
};


exports.login = async (req, res) => {
const schema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });
const { error } = schema.validate(req.body);
if (error) return res.status(400).json({ message: error.message });
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
res.json({ token: generateToken(user), user: { id: user._id, name: user.name, email: user.email } });
};