var express = require('express');
var router = express.Router();
var Book = require('../model/book');

// Create book
router.post('/books', async (req, res) => {
  console.log("Received book data");
  console.log("request:"+(req));
  const book = new Book({
    name: req.body.name,
    author: req.body.author
  })
  await book.save()
  res.send(book)
});

// Get all books
router.get('/books', async (req, res) => {
  const books_from_db = await Book.find()
  res.send(books_from_db)
});

// Get a book
router.get('/books/:id', async (req, res) => {
console.log("Getting book id:"+req.params.id);
try{
const book = await Book.findOne({ _id: req.params.id })
 res.send(book)
} catch {
  res.status(404)
  res.send({err: "Wrong ID"})
}
});

// Update a books
router.patch('/books/:id', async (req, res) => {
console.log("Updating id:"+req.params.id);
try
{
  var existing_book = await Book.findOne({_id : req.params.id})
existing_book.name = req.body.name;
existing_book.author = req.body.author;

await existing_book.save()
res.send(existing_book)
} catch {
  res.status(404)
  res.send({err: "Wrong ID"})
}
})

// Delete a books
router.delete('/books/:id', async(req, res) => {
  try {
      await Book.deleteOne({ _id: req.params.id })
      res.status(204).send()
    } catch {
      res.status(404)
      res.send({ error: "Book doesn't exist!" })
    }

})


module.exports = router;
