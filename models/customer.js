import Mongoose from "mongoose";

const schema = new Mongoose.Schema({
    isGold : {
        type: Boolean,
        required: true
    },
    name: String,
    phone: String
});

const Customer = Mongoose.model('Customer', schema);

export default Customer;