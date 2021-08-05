

// Import express and create a router and model
const express = require('express');
const router = express.Router();
const Project = require('../models/crud');

// Add GET for index to show
router.get('/', (req, res, next) => {
    Project.find((err, database) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('crud/view', { title: 'View', dataset: database });
        }
    })
});

// Add GET for index to show
router.get('/onlyReadView', (req, res, next) => {
    Project.find((err, project) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('crud/onlyReadView', { title: 'View', dataset: project });
        }
    })
});



router.get('/add', (req, res, next) => {
    res.render('crud/add', { title: 'Add' });
});

// Add POST handler to post
router.post('/add', (req, res, next) => {
    Project.create({
        episode: req.body.episode,
        type: req.body.type,
        member: req.body.member
    }, (err, newProject) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/crud');
        }
    });
});

//to use delet
router.get('/delete/:_id', (req, res, next) => {
    Project.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/crud');
        }
    });
});

//to use edit
router.get('/edit/:_id', (req, res, next) => {
    Project.findById(req.params._id, (err, project) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('crud/edit', { title: 'Edit', project: project });
        }
    });
});

// POST handler for /projects/edit/:_id
router.post('/edit/:_id', (req, res, next) => {
    Project.findOneAndUpdate(
        {
            _id: req.params._id
        },
        {
            episode: req.body.episode,
            type: req.body.type,
            member: req.body.member
        }, (err, updatedProject) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/crud');
            }
        });
});

// Export this router module
module.exports = router;