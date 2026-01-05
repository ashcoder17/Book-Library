import axios from 'axios'

const apiKey = "AIzaSyB3DESYJ2L-dUafM9YJG8yzVa1pZ-3ETZE"

const bookFormat = (book) => {
    return {
        isbn: book.volumeInfo.industryIdentifiers[0].identifier,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
        publisher: book.volumeInfo.publisher || 'Unknown Publisher',
        publishDate: book.volumeInfo.publishedDate || 'Unknown Date',
        description: book.volumeInfo.description || 'No Description Available',
        categories: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Uncategorized',
        pageCount: book.volumeInfo.pageCount || 'Unknown Page Count',
        language: book.volumeInfo.language ? book.volumeInfo.language.toUpperCase() : 'Unknown Language',
        thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
        progress: 0
  };
}

const fetchQuery = async (type, crit, search, sort) => {
  let url = `https://www.googleapis.com/books/v1/volumes?q=${search}&orderBy=${sort}&key=${apiKey}&maxResults=40`
  if (crit === "Author")
    url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${search}&orderBy=${sort}&key=${apiKey}&maxResults=40`
  if (crit === "ISBN")
    url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${search}&orderBy=${sort}&key=${apiKey}&maxResults=40`



  let books = []
  console.log("Fetching from URL:", url);
  try {
    const response = await axios.get(url)
    books = response.data.items.map(book => bookFormat(book));
    console.log("books", books); //// Debugging line
    
    return books
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
}
export default fetchQuery;