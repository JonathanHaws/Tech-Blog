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
    }); //res.json (posts);

    res.render('pages/home', { title: 'Home', posts, user: req.session && req.session.user ? req.session.user.username : null });
});

router.get('/login', async (req, res) => { res.render('pages/login'); });
router.get('/logout', (req, res) => req.session ? req.session.destroy(() => res.redirect('/login')) : res.redirect('/login'));
router.get('/signup', async (req, res) => { res.render('pages/signup'); });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) { return res.status(401).render('pages/login', { error: 'Wrong username or password.' }); }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) { return res.status(401).render('pages/login', { error: 'Wrong username or password.' }); }
    req.session.user = user;
    res.redirect('/');
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) { return res.status(400).render('pages/signup', { error: 'Username already exists.' });}
    const user = await User.create({ username, password });
    req.session.user = user;
    res.redirect('/');
});




module.exports = router;