const Post = require('../database/models/post')
 
module.exports = async (req, res) => {
    const posts = await Post.find({description: req.params.type}).sort({createdAt: -1});
    res.render("typePost", {
        posts
    })
}