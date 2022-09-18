import Mongoose from "mongoose";

const Schema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 50
    }
})

const Genres = Mongoose.model('Genres', Schema);

export default Genres;