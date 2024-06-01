  function responsiveNav() {
            let x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        }
    document.getElementById('search-button').addEventListener('click', function() {
    searchBooks();
    });
    document.getElementById('search-query').addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            searchBooks();
        }
    });
function searchBooks(){
    const query = document.getElementById('search-query').value;
    if (query) {
        fetchBooks(query);
    } else {
        alert('Please enter a search term');
    }
}

async function fetchBooks(query) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        displayResults(data.items);
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to fetch books. Please try again later.');
    }
}

function displayResults(books) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (!books || books.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        const title = book.volumeInfo.title || 'No title available';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors available';
        const publishedDate= book.volumeInfo.publishedDate;
        const description = book.volumeInfo.description || 'No description available';
        const imageSrc = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'No image available';
        const previewLink = book.volumeInfo.previewLink || '#';
        const titleWithinLink = previewLink !== '#' ? `<a href="${previewLink}" target="_blank" style="text-decoration: none;color:#153448;text-transform: uppercase">${title}</a>` : title;


        bookItem.innerHTML = `
        <div class="book-details">
            <div class="book-cover">
                <a href="${previewLink}"><img src="${imageSrc}" alt="${title}"></a>
            </div>
            <div class="info">
            <h3>${titleWithinLink}</h3>
            <p><strong>Authors:</strong> ${authors}</p>
            <p><strong>Published Date:</strong> ${publishedDate}</p>
            <p class="description">${description}</p>
            </div>
            </div>
        `;

        resultsContainer.appendChild(bookItem);
    });
}


