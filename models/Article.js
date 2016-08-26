// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is required
  title: {
    type:String,
    required:true,
    unique: true,
    dropDups: true
  },
  // link is required
  link: {
    type:String,
    required:true,
    unique: true,
    dropDups: true
  },
  //coment not required
  comments: String
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model('Article', ArticleSchema);

// export the model
module.exports = Article;
