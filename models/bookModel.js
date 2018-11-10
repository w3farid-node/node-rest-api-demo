var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var BookModel = new Schema({
    title:{
        type: String
    },
    author:{type:String},
    category:{type:String},
    read:{Boolean, default: false}
});

module.exports = mongoose.model('Book', BookModel);