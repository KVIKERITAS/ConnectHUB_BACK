import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Posts from '../db/posts';
import User from '../db/users';
import { imageChangeSchema, loginSchema, passwordChangeSchema } from '../models/typesForm';
require('dotenv').config();

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hash
    });

    await user.save();
    return res.status(200).json({ error: false, message: 'User successfully created' });
  } catch (error) {
    res.sendStatus(400);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.safeParse(req.body);

    if (!data.success) return res.status(400).json({ error: true, message: 'Invalid data' });

    const { username, password } = req.body;

    const foundUser = await User.findOne({ username });

    if (!foundUser) return res.status(400).json({ error: true, message: 'Bad credentials' });

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) return res.status(400).json({ error: true, message: 'Bad credentials' });

    const user = {
      username: foundUser.username,
      image: foundUser.image,
      _id: foundUser._id
    };

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.status(200).json({
      user,
      token: token
    });
  } catch (error) {
    res.sendStatus(400);
  }
};

const changeImage = async (req: Request, res: Response) => {
  try {
    const checkData = imageChangeSchema.safeParse(req.body);

    if (!checkData.success) return res.status(400).json({ error: true, message: 'Invalid data' });

    const data = req.body;

    const user = await User.findOneAndUpdate({ _id: data.data._id }, { $set: { image: data.image } });

    await Posts.updateMany({ userId: data.data._id }, { $set: { userImage: data.image } });

    if (!user) return res.status(400).json({ error: true, message: 'User was not found' });

    const updatedUser = {
      username: user.username,
      image: data.image,
      _id: user._id
    };

    res.status(200).json({ ...updatedUser });
  } catch (error) {
    res.sendStatus(400);
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const checkData = passwordChangeSchema.safeParse(req.body);

    if (!checkData.success) return res.status(400).json({ error: true, message: 'Invalid data' });

    const data = req.body;

    const hash = await bcrypt.hash(data.password, 10);

    const user = await User.findOneAndUpdate({ _id: data.data.id }, { $set: { password: hash } });

    if (!user) return res.status(400).json({ error: true, message: 'User was not found' });

    res.status(200).json({ error: false, message: 'Password successfully changed' });
  } catch (error) {
    res.sendStatus(400);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    const users = await User.find({}, { password: 0 });
    const filteredUsers = users.filter((user) => user.username !== data.username).reverse();

    res.status(200).json({ error: false, users: filteredUsers });
  } catch (error) {
    res.sendStatus(400);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    res.status(200).json({ error: false, user: data });
  } catch (error) {
    res.sendStatus(400);
  }
};

export default { registerUser, loginUser, changeImage, changePassword, getAllUsers, getUser };
