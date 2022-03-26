// user CRUD Operations routes

const courseRouter = require('express').Router();
let User = require('../models/user.js');
let Course = require('../models/course.js');

courseRouter.use((req,res,next) => {
    if(req.body.user){
        next();
    }else{
        res.redirect('/');
    }
})

// courseRouter.use((req,res,next) => {
//     if(req.user){
//         next();
//     }else{
//         res.redirect('/auth/signIn');
//     }
// })

// courseRouter.use((req,res,next) => {
//     if(req.user){
//         next();
//     }else{
//         res.redirect('/auth/creditCard');
//     }
// })

courseRouter.route('/').get((req,res) => {
    Course.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/add').post((req,res) => {
    const coursename = req.body.coursename;
    const courseID = req.body.courseID
    const course = new Course({ coursename, courseID });

    course.save()
        .then(() => res.json('Course added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/:id').get((req,res) => {
    Course.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/:id').delete((req,res) => {
    Course.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Course deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/:id').put((req,res) => {
    Course.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json('Course updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = courseRouter;

