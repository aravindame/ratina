import Mongoose from "mongoose";

var Course = null;

export function createSchemaCourse() {
    const schema = new Mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        },
        category:{
            type: String,
            required: true,
            enum: ['web', 'mobile', 'network'],
            lowercase: true,
            trim: true 
        },        
        author: String,
        tags: {
            type: Array,
            validate: {
                isAsync: true,
                validator: function(value, callback){
                    setTimeout(()=>{
                        const result = value && value.length > 0;
                        callback(result);
                    }, 4000);
                },
                message: 'A course should have at least one tag.'
            }
        },
        date: { type: Date, default: Date.now },
        isPublished: Boolean,
        price: {
            type: Number,
            required: function () { return this.isPublished },
            min: 20,
            max: 200,
            get: (value)=>Math.round(value),
            set: (value)=>Math.round(value)
        }
    });
    return schema;
}

export async function createModel(schema) {
    Course = Mongoose.model('Course', schema);
    const course = new Course({
        name: 'Master Node.js',
        category: 'web',
        author: 'Mosh',
        tags: ['node'],
        isPublished: true,
        price: 50
    });
    try {
        await course.save();
    } catch (error) {
        console.log(error.message);
    }
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