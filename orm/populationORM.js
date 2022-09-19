import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/population')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    ref: 'Author'
}
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author')
    .select('name');
  console.log(courses);
}createAuthor('Mosh', 'My bio', 'My Website');


//createAuthor('Mosh', 'My bio', 'My Website');
// createCourse('Node Course', '6327afd33a126842568f70e6');
 listCourses();