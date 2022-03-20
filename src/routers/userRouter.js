// user CRUD Operations routes

const userRouter = require('express').Router();
let User = require('../models/user.js');
let Course = require('../models/course.js');

userRouter.use((req,res,next) => {
    if(req.user){
        next();
    }else{
        res.redirect('/');
    }
})

userRouter.use((req,res,next) => {
    if(req.user){
        next();
    }else{
        res.redirect('/auth/signIn');
    }
})

userRouter.use((req,res,next) => {
    if(req.user){
        next();
    }else{
        res.redirect('/auth/creditCard');
    }
})

userRouter.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

userRouter.route('/add').post((req,res) => {
    const username = req.body.username;
    const User = new User({ username });

    User.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

userRouter.route('/:id').get((req,res) => {
    User.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

userRouter.route('/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

userRouter.route('/:id').put((req,res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = userRouter;

