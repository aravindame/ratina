import Mongoose from "mongoose";

var Course = null;

export default function connect(){
    const host = 'mongodb://localhost/playground';
    Mongoose.connect(host)
        .then(()=>console.log('Connection success.....'))
        .catch((error)=>console.log(error));
    const schema = createSchema();
    createModel(schema)
}

export function createSchema() {
    const schema = new Mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        isPublished: Boolean,
        price: Number
    });
    return schema;
}

export async function createModel(schema) {
    Course = Mongoose.model('Course', schema);
    const course = new Course({
        name: 'Master Node.js',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true,
        price: 16
    });
    await course.save();
    getCourses();
}

export async function getCourses(){
    const result = await Course.find()
    .or([{name: "Mosh"}, {isPublished: false}])
    .limit(2)
    .select({ name : 1, author: 1, price: 1})
    .count();
    updateCourse('632569f20d022e179ce0c57c') 
}

export async function updateCourse(id='632569f20d022e179ce0c57c'){
    const course = await Course.findById(id);
    if(!course) return;
    course.set({
        isPublished: true,
        author: 'Another Author'
    });
    const result = await course.save(course);
    const foo = await Course.find({ name : "Mosh"})
    .select({ name : 1, author: 1, price: 1})
    .count();
}
