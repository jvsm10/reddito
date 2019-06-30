const Post = require('../database/models/post')
 
module.exports = async (req, res) => {
    const posts = await Post.find().sort({createdAt: -1});
 
    res.render("index", {
        posts
    });
}