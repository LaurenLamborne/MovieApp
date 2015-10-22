var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  comments: [{
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: String,
    rating: String
  }]
});



mongoose.model('Post', PostSchema);
