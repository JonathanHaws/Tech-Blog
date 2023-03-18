const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll(); 
    const posts = postData.map((post) => post.get({ plain: true })); //res.json (posts);
    res.render('pages/home', { title: 'Home', posts,});
});

module.exports = router;