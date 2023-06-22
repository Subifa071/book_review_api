const express = require('express')
const { verifyAdmin } = require('../middlewares/auth')
const router = express.Router()
const Book = require('../models/Book')

router
  .route('/')
  .get((req, res) => {
    Book.find()
      .then((books) => res.json(books))
      .catch((err) => console.log(err))

    // try {
    //     const books = await Book.find()
    //     res.json(books)
    // } catch (error) {
    //     console.log(error)
    // }
  })
  // .post(verifyAdmin, (req, res, next) => {
  .post((req, res, next) => {
    Book.create(req.body)
      .then((book) => {
        res.status(201).json(book)
      })
      .catch(next)
  })
  .put((req, res) => {
    res.status(405).json({ error: 'method not allowed' })
  })
  .delete(verifyAdmin, (req, res, next) => {
    Book.deleteMany()
      .then((result) => {
        res.json(result)
      })
      .catch(next)
  })

router
  .route('/:book_id')
  .get((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        if (!book) res.status(404).next(new Error('book not found'))
        res.json(book)
      })
      .catch(next)
  })
  .post((req, res) => {
    res.status(405).json({ error: 'method not allowed' })
  })
  .put((req, res, next) => {
    Book.findByIdAndUpdate(
      req.params.book_id,
      { $set: req.body },
      { new: true }
    )
      .then((updated) => res.json(updated))
      .catch(next)
  })
  .delete((req, res, next) => {
    Book.findByIdAndDelete(req.params.book_id)
      .then((reply) => {
        res.json(reply)
      })
      .catch(next)
  })
router
  .route('/:book_id/reviews')
  .get((req, res, next) => {
    book
      .findById(req.params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: 'Book not found' })
        res.json(book.reviews)
      })
      .catch(next)
  })
  .post((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: 'Book not found' })
        const review = {
          text: req.body.text,
        }
        book.reviews.push(review)
        book
          .save()
          .then((book) =>
            res.status(201).json(book.reviews[book.reviews.length - 1])
          )
          .catch(next)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: 'Book not found' })
        book.reviews = []
        book
          .save()
          .then((book) => res.status(204).end())
          .catch(next)
      })
      .catch(next)
  })
router
  .route('/:book_id/reviews/:review_id')
  .get((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: 'Book not found' })
        const review = book.reviews.id(req.params.reviews_)
        res.json(review)
      })
      .catch(next)
  })
  .put((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: 'Book not found' })
        book.reviews.map((r) => {
          if (r._id === req.params.review_id) {
            r.text = req.body.text
          }
          return r
        })
        book
          .save()
          .then((book) => {
            res.json(book.reviews.id(req.params.reviews_id))
          })
          .catch(next)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: 'book not found' })
        book.reviews = book.reviews.filter((r) => r._id !== req.params.book_id)
        book
          .save()
          .then((book) => res.status(204).end())
          .catch(next)
      })
      .catch(next)
  })
module.exports = router
