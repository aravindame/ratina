import express from 'express';
import Customer from '../models/customer.js';
import { validateCustomer } from '../validators/customer.js';

const router = express.Router();

router.get('/', async (req, res)=>{
    const result = await Customer.find();
    res.status(200).send(result);
});

router.get('/:id', async (req, res)=>{
    const result = await Customer.findById(req.params.id);
    if(!result) return res.status(404).send('The genre with the given ID was not found.');
    res.status(200).send(result);
});

router.post('/', async (req, res)=>{
    const newCustomer = req.body;
    const { error } = validateCustomer(newCustomer);
    if(error) res.status(400).send(error.details[0].message);
    const customer = new Customer(newCustomer);
    let result = null;
    try {
        result = await customer.save();
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
    res.status(200).send(result);
});

router.put('/:id', async (req, res)=>{
    const newCustomer = req.body;
    const { error } = validateCustomer(newCustomer);
    if(error) res.status(400).send(error.details[0].message);
    const { name, phone, isGold } = newCustomer;
    const result = await Customer.findByIdAndUpdate(req.params.id, { name, phone, isGold }, {new: true});
    console.log(result);
    if (!result) return res.status(404).send('The genre with the given ID was not found.');
    res.send(result);
});

router.delete('/:id', async (req, res)=>{
    const result = await Customer.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send('The genre with the given ID was not found.');
    res.status(200).send(result);
});

export default router;