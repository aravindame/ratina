import validate, {User} from '../models/user.js';
import { Router } from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

router.get('/profile', async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  const privatekey = config.get('jwtPrivateKey') || 'jwtPrivateKey';
  const token = jwt.sign({ user: user.name, _id: user._id, isAdmin: user.isAdmin}, privatekey);
  res.setHeader('x-auth-token', token);
  res.send(_.pick(user, ['_id','name', 'email', 'isAdmin']));
});

export default router;