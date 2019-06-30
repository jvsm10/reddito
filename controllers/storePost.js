const path = require('path')
const Post = require('../database/models/post')
 
module.exports = (req, res) => {
    const {
        image
    } = req.files;
    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            userId: req.session.userId,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect("/");
        });
    })
}