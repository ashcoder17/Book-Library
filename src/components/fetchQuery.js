import axios from 'axios'


const bookFormat = (type, book) => {
    return {
        //isbn: book.volumeInfo.industryIdentifiers[0].identifier,
        id : book.key,
        title: book.title,
        author: type == "search" ? (book.author_name ? book.author_name.join(', ') : 'Unknown Author') : (book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown Author'),
        //publisher: book.volumeInfo.publisher || 'Unknown Publisher',
        publishDate: book.first_publish_year || 'Unknown Date',
        description: "No description available.",
        //categories: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Uncategorized',
        //pageCount: book.volumeInfo.pageCount || 'Unknown Page Count',
        //language: book.volumeInfo.language ? book.volumeInfo.language.toUpperCase() : 'Unknown Language',
        thumbnail: `https://covers.openlibrary.org/b/${(book.lending_edition_s || book.cover_edition_key) ? `olid/${book.lending_edition_s || book.cover_edition_key}` : `id/${book.cover_id}`}-L.jpg`,
        progress: 0
  };
}


const fetchQuery = async (type, crit, search, sort) => {
  let url = "";
  if (type === "search"){
  let limit = 70;
  if (sort === "Newest")  
    sort = 'new'
  else if (sort === "Rating")
    sort = 'rating'
  else
    sort = ''
  let url = `https://openlibrary.org/search.json?q=${search}&limit=${limit}&sort=${sort}`
  if (crit === "Author")
    url = `https://openlibrary.org/search.json?author=${search}&sort=${sort}&limit=${limit}`
  if (crit === "ISBN")
    url = `http://openlibrary.org/api/volumes/brief/isbn/${search}.json?limit=${limit}&sort=${sort}`
  let books = []
  console.log("Fetching from URL:", url); // Debugging line
  try {
    const response = await axios.get(url)
    books = response.data.docs.map(book => bookFormat(type, book));
    console.log("books", books); //// Debugging line
    
    return books
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
  }
  else{
    url = `https://openlibrary.org/subjects/${search}.json?limit=24`
    let books = []
  console.log("Fetching from URL:", url); // Debugging line
  try {
    const response = await axios.get(url)
    books = response.data.works.map(book => bookFormat(type, book));
    console.log("books", books); //// Debugging line
    return books
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
  }
  
}
export default fetchQuery;