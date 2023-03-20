const { User, Post, Comment } = require('../models');

async function getPosts(req) {
    let posts = await Post.findAll({ include: [{ model: User, attributes: ['username'] },], raw: true,});
    

    posts.map(async (post) => { 
        post.user = req.session?.user;
        post.author = (await User.findByPk(post.userId)).username;
        post.canDelete = req.session?.user?.id === post.userId;
        post.date = new Date(post.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric'}); 
        post.comments = await Comment.findAll({ where: { postId: post.id }, raw: true,});  console.log(post.comments)  
        post.comments.map(async (comment) => {  
            comment.author = (await User.findByPk(comment.userId)).username;
            comment.canDelete = req.session?.user?.id === comment.userId;
            comment.date = new Date(comment.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric'}); 
        });
    }); 

    //console.log(posts);
    return posts;
}

module.exports = getPosts;