var express = require('express');

var routes = function(Book){
var bookRouter = express.Router();

bookRouter.route('/books')
    .post(function(req, res){
        var books = new Book(req.body);
        books.save();
        res.status(201).send(books);
    })
    .get(function(req, res){
        var query = {};
        if(req.query.title){
            query.title = req.query.title;
        }
        Book.find(query, function(err, books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });

    })
    bookRouter.use('/books/:bookId', function(req, res, next){
        Book.findById(req.params.bookId, function(err, book){
            if(err){
                res.status(500).send(err);
            }else if(book){
                req.book = book;
                req.next();
            }else{
                req.status(404).send('no book found');
            }
        })
        
    })
    bookRouter.route('/books/:bookId')
    .get(function(req, res){        
        res.json(req.book);
    })
    .put(function(req, res){       
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.category = req.body.category;
        req.book.save();
        res.json(req.book);
    });

    
    return bookRouter;
}
module.exports = routes;