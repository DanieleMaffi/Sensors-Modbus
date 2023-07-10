const express = require("express");
const pageLoader = require("../controllers/loader.js");
const router = express.Router();

router.get('/home', pageLoader.loadMainPage);  
router.get('/loadInfo/:misuratore/:from/:to/:isReport', pageLoader.loadInfo);

router.post('/sendForm', pageLoader.sendForm)


router.get('*', (req, res) => {res.status(404).render('notfound')})

module.exports = router;