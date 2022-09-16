import Mongoose from "mongoose";

export default function connect(){
    const host = 'mongodb://mongo_example:27017/playground';

    Mongoose.connect(host)
        .then(()=>console.log('Connection success.....'))
        .catch((error)=>console.log(error));
        console.log(Mongoose.version)
    const schema = createSchema();
    createModel(schema)
}

export function createSchema() {
    const schema = new Mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        isPublished: Boolean
    });
    return schema;
}

export async function createModel(schema) {
    const Course = Mongoose.model('Course', schema);
    const course = new Course({
        name: 'Master Node.js',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });
   // await course.save();
}

// sudo docker run --name mongo_example -d mongo:3.6.2