const express = require('express');
const router = express.Router();
const filmy = require('../services/filmy');
const bodyParser = require('body-parser');



router.get('/', async function(req, res, next) {
    try {
        res.json(await filmy.getFilmy());
    } catch (err) {
        console.error(`Coś poszło nie tak `, err.message);
        next(err);
    }
});

router.get('/:id', async function(req, res) {
    try {
       x= res.json(await filmy.getFilm(req.params.id));
        return x;
    } catch (err) {
        console.error(`Coś poszło nie tak `, err.message);
        x="";
        return x;

    }
});

router.post('/add/:idf', async function(req, res) {


    try {

            res.json(await filmy.addFilm(req.params.idf));

    } catch (err) {
        console.error(`Coś poszło nie tak `, err.message);

    }

});

router.delete('/delete/:id', async function(req, res) {


    try {

        res.json(await filmy.deleteFilm(req.params.id));

    } catch (err) {
        console.error(`Coś poszło nie tak `, err.message);

    }

});


module.exports = router;