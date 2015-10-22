var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: 'payload',
  secret: "This_IS_My_sEcReT_PhRASE"
});

router.get('/', function(req, res, next) {
  Post.find({}).exec(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

router.put('/', function(req, res, next) {
  Post.update({_id: req.body.IDofPostToEdit}, req.body.postEditted, function(err, result) {
  if(err) return next(err);
  if(!result) return next({err: "The post wasn't found"});
  res.send(result);
  });

});

router.post('/', function(req, res, next) {
  var post = new Post(req.body);
  post.save(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

router.delete('/:id', function(req, res, next) {
  Post.remove({_id: req.params.id}, function(err, result) {
      if(err) return next(err);
      console.log(result);
      res.send();
  });
});

router.get('/:id', function(req, res, next) {
  Post.findOne({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not find that post");
    res.send(result);
  });
});

router.post('/:id/comment', auth, function(req, res, next) {
  var comment = {
    body: req.body.body,
    user: req.payload._id,
    rating: req.body.rating
  };
  Post.findOne({_id: req.params.id}, function(err, detail) {
    if(err) return next(err);
    if(!detail) return next("Could not find that");
    detail.comments.push(comment);
    detail.save(function(err, details) {
      res.send(detail);
    });
  });
});

module.exports = router;
