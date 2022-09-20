import { Router } from 'express';
import Joi from 'joi';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import {User} from '../models/user.js';

const router = Router();


router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!user || !valid) return res.status(400).send('Username or Password not matched.');
  const privatekey = config.get('jwtPrivateKey') || 'jwtPrivateKey';
  const token = jwt.sign({ user: user.name, _id: user._id, isAdmin: user.isAdmin}, privatekey);
  res.send(token);
});

function validate(user) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
}

export default router;