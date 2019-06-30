const Post = require('../database/models/post')
 
module.exports = async (req, res) => {
    const posts = await Post.find({userId: req.session.userId}).sort({createdAt: -1});
    res.render("mypost", {
        posts
    })
}