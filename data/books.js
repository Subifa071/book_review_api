// Create an array of book objects
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    rating: 4.5,
    review:
      'This book was a classic! I loved the characters and the themes it explored.',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    rating: 4.0,
    review:
      'I enjoyed the story and the setting, but the characters felt a bit shallow.',
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    genre: 'Science Fiction',
    rating: 5.0,
    review:
      'This book was hilarious and had some really interesting ideas about the universe.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Fiction',
    rating: 4.5,
    review:
      'This book was a bit depressing, but it really made me think about government control and privacy.',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    rating: 5.0,
    review:
      'This book is a masterpiece! The world-building and characters are incredible.',
  },
]

// Loop through the books array and display each book's information
for (let i = 0; i < books.length; i++) {
  console.log(`Title: ${books[i].title}`)
  console.log(`Author: ${books[i].author}`)
  console.log(`Genre: ${books[i].genre}`)
  console.log(`Rating: ${books[i].rating}`)
  console.log(`Review: ${books[i].review}`)
  console.log('--------------')
}
module.exports = books
