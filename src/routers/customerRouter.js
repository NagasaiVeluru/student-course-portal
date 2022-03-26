// user CRUD Operations routes

const customerRouter = require('express').Router();
let Customer = require('../models/customer.js');

customerRouter.route('/').get((req,res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err));
});

customerRouter.route('/add').post((req,res) => {
    const name = req.body.name;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const zipCode = req.body.zipCode;
    const discount = req.body.discount;
    const customers = new Customer({ name,address,city,state,country,zipCode,discount });

    customers.save()
        .then(() => res.json('Customer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

customerRouter.route('/:id').get((req,res) => {
    Customer.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

customerRouter.route('/:id').delete((req,res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Customer deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

customerRouter.route('/:id').put((req,res) => {
    Customer.findById(req.params.id)
        .then(customers => {
            customers.username = req.body.username;
            customers.save()
                .then(() => res.json('Customer updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = customerRouter;

