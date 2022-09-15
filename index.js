import express from 'express';
import Joi from 'joi';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

let courses = [
    { id : 1, name: 'course 1'},
    { id : 2, name: 'course 2'},
    { id : 3, name: 'course 3'}

];

app.get('/', (req, res)=>{
    res.send('hello world');
});

app.get('/app/courses', (req, res)=>{
    res.send([1,2,3,4]);
});

app.get('/app/courses/:id', ({params: {id}}, res)=>{
    const course = courses.find(item => parseInt(id) === item.id);
    if(!course){
        res.status(404).send(`Given course by ID ${id} is not found.`);
    }
    res.send(course);
});

app.post('/app/courses', ({body}, res)=>{
    const {error} = validateInput(input);
    if(error){
        res.status(400).send(error);
    }
    const course = {
        id: body.id,
        name : body.name
    }
    courses.push(course);
    res.status(201).send(course);
})

app.put('/app/courses/:id', ({body, params:{id}}, res)=>{
    const {id:courseId, name} = courses.find(item => parseInt(id) === item.id);
    if(!courseId){
        res.status(404).send(`Given course by ID ${id} is not found.`);
    }
    const {error} = validateInput(body);
    if(error){
        res.status(400).send(error);
    }
    const course = {id:courseId, name: body.name}
    courses = [...courses.filter(item=>parseInt(id)!==item.id)]
    courses.push(course);
    res.status(201).send(courses);
})

app.delete('/app/courses/:id', ({params:{id}}, res)=>{
    const index = courses.indexOf(courses.find(item => parseInt(id) === item.id));
    if(index === -1){
        res.status(400).send(`Given course by ID ${id} is not found.`);
    }
    courses.splice(index, 1)
    res.status(200).send(courses);
})

function validateInput(input){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(input, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on port ${port}`));