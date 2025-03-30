let page = 1;

const fetchAndRenderBooks = async (reset = true) => {
    const language = document.getElementById('language').value || "en";
    const seed = document.getElementById('seed').value || 0;
    const avgLikes = document.getElementById('likes').value || 5;
    const avgReviews = document.getElementById('reviews').value || 5;

    const response = await fetch(`/Book/GetBooks?seed=${seed}&page=${page}&language=${language}&avgLikes=${avgLikes}&avgReviews=${avgReviews}`);
    const books = await response.json();

    const tableBody = document.querySelector('#books-table tbody');
    if (reset) {
        tableBody.innerHTML = ''; 
        page = 1; 
    }

    books.forEach(book => {
        const row = `
            <tr>
                <td>${book.index}</td>
                <td>${book.isbn}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>${book.likes}</td>
                <td>${book.reviews}</td>
                  <td>
                <a href="/Book/Details?id=${book.index}&seed=${seed}&page=${page}&language=${language}">View Details</a>
            </td>
            </tr>`;
        tableBody.innerHTML += row;
    });

   
};

const showDetails = (index) => {
    alert(`Details for Book Index: ${index}`);
    
};

const generateRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 10000);
    document.getElementById('seed').value = randomSeed;
    fetchAndRenderBooks();
};

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        page++;
        fetchAndRenderBooks(false);
    }
});

document.getElementById('language').addEventListener('change', () => fetchAndRenderBooks());
document.getElementById('seed').addEventListener('input', () => fetchAndRenderBooks());
document.getElementById('likes').addEventListener('input', () => {
    document.getElementById('likesValue').textContent = document.getElementById('likes').value;
    fetchAndRenderBooks();
});
document.getElementById('reviews').addEventListener('input', () => fetchAndRenderBooks());

fetchAndRenderBooks();
