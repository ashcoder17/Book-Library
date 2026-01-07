import axios from 'axios'


const bookFormat = (book) => {
    return {
        //isbn: book.volumeInfo.industryIdentifiers[0].identifier,
        title: book.title,
        author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
        //publisher: book.volumeInfo.publisher || 'Unknown Publisher',
        publishDate: book.first_publish_year || 'Unknown Date',
        //description: book.volumeInfo.description || 'No Description Available',
        //categories: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Uncategorized',
        //pageCount: book.volumeInfo.pageCount || 'Unknown Page Count',
        //language: book.volumeInfo.language ? book.volumeInfo.language.toUpperCase() : 'Unknown Language',
        thumbnail: `https://covers.openlibrary.org/b/${(book.lending_edition_s || book.cover_edition_key) ? `olid/${book.lending_edition_s || book.cover_edition_key}` : `id/${book.cover_id}`}-L.jpg`,
        progress: 0
  };
}

const fetchQuery = async (type, crit, search, sort) => {
  let url = `https://openlibrary.org/search.json?q=${search}&limit=30`
  if (crit === "Author")
    url = `https://openlibrary.org/search.json?limit=40&author=${search}`
  if (crit === "ISBN")
    url = `http://openlibrary.org/api/volumes/brief/isbn/${search}.json`



  let books = []
  console.log("Fetching from URL:", url);
  try {
    const response = await axios.get(url)
    books = response.data.docs.map(book => bookFormat(book));
    console.log("books", books); //// Debugging line
    
    return books
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
}
export default fetchQuery;