// Library array
let myLibrary = [];

// Main HTML elements
const form = document.getElementById('book-form-container');
const bookShelf = document.getElementById('bookshelf');
const addBookBtn = document.getElementById('add-book');

// Form values
const inputTitle = document.getElementById('book-title-input');
const inputAuthor = document.getElementById('book-author-input');
const inputPages = document.getElementById('book-pages-input');
const inputRead = document.getElementById('book-read-input');

// Book constructor
function Book(title, author, pages, id, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
    this.read = read;
}

// Create new book object
function createBook() {// Set book values to parameters
    let title = inputTitle.value;
    let author = inputAuthor.value;
    let pages = inputPages.value;
    let id = Math.floor(100000 + Math.random() * 900000);
    let read = inputRead.checked;

    // Push new book to end of library array
    let book = new Book(title, author, pages, id, read);

    myLibrary.push(book);
    
    return book;
}

// Add new book object to library array
function addBookToLibrary() {
    // Create new book object with parameters
    let newBook = createBook();

    // Display book object as HTML element
    displayBook(newBook);

    // Hide form
    toggleFormDisplay();

    return false;
}

// Create new book element and fill with information
function displayBook(book) {
    // Create book DOM elements
    const newBook = document.createElement('div');

    const newBookTitle = document.createElement('h1');
    const newBookAuthor = document.createElement('p');
    const newBookPages = document.createElement('p');

    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    // Fill book DOM elements
    newBookTitle.innerHTML = book.title;
    newBookAuthor.innerHTML = "by " + book.author;
    newBookPages.innerHTML = book.pages + " pages";
    toggleRead(readBtn, book);
    removeBtn.innerHTML = "X";

    // Add id/classes/event listeners to DOM elements
    newBook.id = +book.id;
    newBook.classList.add('book');
    newBookTitle.classList = "book-title";
    newBookAuthor.classList = "book-author";
    newBookPages.classList = "book-pages";

    readBtn.addEventListener('click', function() {
        toggleRead(this, book);
    })

    removeBtn.classList = "remove-btn";
    removeBtn.addEventListener('click', function() {
        deleteBook(book);
    })

    // Append new elements to main book
    newBook.appendChild(newBookTitle);
    newBook.appendChild(newBookAuthor);
    newBook.appendChild(newBookPages);
    newBook.appendChild(readBtn);
    newBook.appendChild(removeBtn);

    // Add book element to bookshelf
    bookShelf.appendChild(newBook);
}

// Delete book from array, display
function deleteBook(book) {
    // Delete book in array
    const bookIndex = myLibrary.findIndex(index => index.id == book.id);
    myLibrary.splice(bookIndex, 1);

    // Delete book element in DOM
    const bookElem = document.getElementById(book.id);
    bookElem.remove();
}

// Add book button / event listener
addBookBtn.addEventListener("click", () => {
    // Clear input values from form
    inputAuthor.value = "";
    inputTitle.value = "";
    inputPages.value = "";
    inputRead.checked = false;
    toggleFormDisplay();
});

// Toggle form display on/off
function toggleFormDisplay() {
    if (form.style.display == "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
        inputTitle.focus();
    }
}

function toggleRead(button, book) {
    if (book.read == true) {
        button.innerHTML = "Read";
        button.classList = "read-btn";
        book.read = false;
    } else {
        button.innerHTML = "Not read yet";
        button.classList = "not-read-btn";
        book.read = true;
    }
}