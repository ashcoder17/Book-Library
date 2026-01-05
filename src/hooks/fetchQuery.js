import axios from 'axios'

const apiKey = "AIzaSyB3DESYJ2L-dUafM9YJG8yzVa1pZ-3ETZE"


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
    books = response.data.items
    console.log("books", books);
    
    return books
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
}
export default fetchQuery;