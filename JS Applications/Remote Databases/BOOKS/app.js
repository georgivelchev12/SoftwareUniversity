const kinveyUsername = 'guest';
const kinveyPassword = 'guest';
const appKey = 'kid_SypMGvuiH';
const appSecret = '6d8f220d674e44feb4d1e5986961bb25';

const baseUrl = `https://baas.kinvey.com/appdata/kid_SypMGvuiH/books`;

const elements = {
    btnSubmit: document.querySelector('#submit'),
    btnLoadBooks: document.querySelector('#loadBooks'),
    btnDoneEdit: document.querySelector('#editBtn'),
    btnCancelEdit: document.querySelector('#cancelBtn'),
    titleInput: document.querySelector('#title'),
    authorInput: document.querySelector('#author'),
    isbnInput: document.querySelector('#isbn'),
    tbodyBooks: document.querySelector('#tbodyBooks'),
}


elements.btnLoadBooks.addEventListener('click', loadBooks);
elements.btnSubmit.addEventListener('click', addBook);

function loadBooks() {
    const headers = {
        credentials: 'include',
        Authorization: 'Basic ' + btoa(`${kinveyUsername}: ${kinveyPassword}`),
        headers: { 'Content-type': 'application/json' }
    }
    fetch(baseUrl, headers)
        .then(handler)
        .then(data => {
            elements.tbodyBooks.innerHTML = '';
            data.forEach(book => {
                let tableRow = document.createElement('tr');
                tableRow.setAttribute('id', book._id);

                let tdTitle = document.createElement('td');
                let tdAuthor = document.createElement('td');
                let tdISBN = document.createElement('td');
                let tdWithButtons = document.createElement('td');
                let editBtn = document.createElement('button');
                let deleteBtn = document.createElement('button');

                tdTitle.textContent = book.title;
                tdAuthor.textContent = book.author;
                tdISBN.textContent = book.isbn;
                editBtn.textContent = 'Edit';
                deleteBtn.textContent = 'Delete';

                tdWithButtons.append(editBtn, deleteBtn);
                tableRow.append(tdTitle, tdAuthor, tdISBN, tdWithButtons);
                elements.tbodyBooks.appendChild(tableRow);

                editBtn.addEventListener('click', () => {
                    let id = deleteBtn.parentElement.parentElement.id;
                    let title = elements.titleInput;
                    let author = elements.authorInput;
                    let isbn = elements.isbnInput;
                    title.value = book.title;
                    author.value = book.author;
                    isbn.value = book.isbn;
                    elements.btnSubmit.style.display = 'none'
                    elements.btnDoneEdit.style.display = 'block';
                    elements.btnCancelEdit.style.display = 'block';

                    elements.btnDoneEdit.addEventListener('click', (ev) => {
                        ev.preventDefault();
                        const data = {
                            title: title.value,
                            author: author.value,
                            isbn: isbn.value
                        };
                        let headers = {
                            method: 'PUT',
                            credentials: 'include',
                            Authorization: 'Basic ' + btoa(`${kinveyUsername}: ${kinveyPassword}`),
                            body: JSON.stringify(data),
                            headers: { 'content-type': 'application/json' }
                        }
                        fetch(`${baseUrl}/${id}`, headers)
                            .then(handler)
                            .then(loadBooks)

                        title.value = ''
                        author.value = ''
                        isbn.value = ''
                        elements.btnSubmit.style.display = 'block'
                        elements.btnDoneEdit.style.display = 'none';
                        elements.btnCancelEdit.style.display = 'none';
                    })
                    elements.btnCancelEdit.addEventListener('click', (ev) => {
                        ev.preventDefault();
                        title.value = ''
                        author.value = ''
                        isbn.value = ''
                        elements.btnSubmit.style.display = 'block'
                        elements.btnDoneEdit.style.display = 'none';
                        elements.btnCancelEdit.style.display = 'none';
                    })
                })
                deleteBtn.addEventListener('click', (e) => {
                    let id = deleteBtn.parentElement.parentElement.id;
                    let headers = {
                        method: "DELETE",
                        credentials: 'include',
                        Authorization: 'Basic ' + btoa(`${kinveyUsername}: ${kinveyPassword}`),
                        headers: { 'Content-type': 'application/json' },
                    }
                    fetch(`${baseUrl}/${id}`, headers)
                        .then(handler)
                        .then(loadBooks)
                })
            });
        })
}
function addBook(ev) {
    ev.preventDefault()
    let title = elements.titleInput;
    let author = elements.authorInput;
    let isbn = elements.isbnInput;
    if (title.value !== '' && author.value !== '' && isbn.value !== '') {
        const dataObject = {
            title: title.value,
            author: author.value,
            isbn: isbn.value
        };
        const headers = {
            method: "POST",
            body: JSON.stringify(dataObject),
            credentials: 'include',
            Authorization: 'Basic ' + btoa(`${kinveyUsername}: ${kinveyPassword}`),
            headers: { 'Content-type': 'application/json' }
        }
        fetch(baseUrl, headers)
            .then(handler)
            .then(loadBooks)
            .catch(err => console.log(err));
        title.value = '';
        author.value = '';
        isbn.value = '';
    }
    else {
        alert('Fill in all fields!')
    }
}
function handler(response) {
    if (response.status >= 400) {
        throw new Error(`Error: ${response.status}: ${response.statusText}`)
    }
    return response.json()
}