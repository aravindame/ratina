import validate, {User} from '../models/user.js';
import { Router } from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt'

const router = Router();

router.get('/me', async (req, res) => {
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
  res.send(_.pick(user, ['_id','name', 'email']))
});

export default router;