const express = require('express')
const {bookModel} = require('../models/book.model')
const bookRouter = express.Router()

bookRouter.get('/',async (req,res) => {
   try{
   const books = await bookModel.find()
   console.log(books)
   res.status(200).send(books)
   }
   catch(err){
    res.send(err)
   }
})

bookRouter.post('/add', async(req,res) => {
    try{
    const {title, author, genre, description, price} = req.body;
    const newBook = new bookModel({title,author,genre,description,price})
    await newBook.save()
    res.status(200).send("New Book Added Successfully!")
    }
    catch(err){
        res.send(err)
    }
})



bookRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
        await bookModel.findByIdAndDelete({_id:id})
        res.send({"msg":`Book with this id:${id} has been deleted`})
    }catch(err){
        res.send(err)
    }
})


bookRouter.get('/filter', async (req, res) => {
    const { genre } = req.query;
    try {
      const filteredBooks = await bookModel.find({ genre });
      res.status(200).send(filteredBooks);
    } catch (err) {
      res.send(err);
    }
  });
  

  bookRouter.get('/sort', async (req, res) => {
    const { order } = req.query;
    try {
      let sortedBooks;
      if (order === 'asc') {
        sortedBooks = await bookModel.find().sort({ price: 1 });
      } else if (order === 'desc') {
        sortedBooks = await bookModel.find().sort({ price: -1 });
      } else {
        return res.status(400).send('Invalid sort order');
      }
      res.status(200).send(sortedBooks);
    } catch (err) {
      res.send(err);
    }
  });
  


module.exports = {bookRouter}