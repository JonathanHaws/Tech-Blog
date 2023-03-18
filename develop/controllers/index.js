const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll({ include: [{ model: User, attributes: ['username'],},],});
    const posts = postData.map((post) => {
        return {
            ...post.get({ plain: true }),
            date: new Date(post.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric'}),
            author: post.user.username
        }
    });  //res.json (posts);
    
    res.render('pages/home', { title: 'Home', posts,});
});

module.exports = router;