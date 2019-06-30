const Post = require('../database/models/post')

module.exports = (req, res) => {
    Post.deleteOne({_id: req.params.id}, (error, post) => {
        res.redirect("/");
    });
    } 