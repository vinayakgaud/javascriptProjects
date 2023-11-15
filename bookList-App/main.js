// **Book Class : Represents a Book
class Book{
    constructor(title, author, number){
        this.title = title
        this.author = author
        this.number = number
    }
}

//**UI Class: Handle UI Tasks
class UI{
    //methods for handling UI related task, as don't want to initiate it that's why creating it as static
    static displayBooks(){
        const books = StoreBook.getBooks();
        //looping through books to add it on UI
        books.forEach((book)=>{
            UI.addBooksToList(book)
        });
    }

    static addBooksToList(book){
        const list = document.querySelector('#book-list'); //fetching table body to create list of books
        const row = document.createElement('tr');
        //i can do appendchild method also for now let's do innerHTML
        //createElement for td tag and append it to parent tr(row)
        //but we also want to add x button to delete that row so using innerHTML
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.number}</td>
        <td><a href ="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBookFromList(delRow){
        if(delRow.classList.contains('delete')){
            delRow.parentElement.parentElement.remove();
        }
    }

    static showAlert(alertMessage, alertCategory){
        //red for alert and green for success message
        //either we can create div and use insertBefore on parent and the element before which we have to put alert
        //parent container, ele: before form
        //parent.insertBefore(div, ele)
        //or we can have div placeholder in html
        const alertDiv = document.querySelector('#alert');
        alertDiv.className = `alert alert-${alertCategory}`; //bootstrap alert classes
        const textNode = document.createTextNode(`${alertMessage}`);
        alertDiv.appendChild(textNode);
        //we can use setTimeout to remove alert in few seconds
        setTimeout(()=>{
            alertDiv.textContent = '';
            alertDiv.removeAttribute('class');
        }, 1500); //but using this way my whole is removed as I am using placeholder, we can create new div if we have it removed, or we can just remove the message?, will use this method as I don't want to delete and create new Div everytime i am having alert because I am using placeholder in HTML, doesn't make sense to create new Div everytime
        //or i can do it on button click as to have hide or show class but not necessary as of now

        //*alertDiv.innerHTML = `${alertMessage}`; //using this way i don't have to worry about removing previous alert
    }
}
//TODO: create getbook method which used number to fetch that book and remove that book, using number as primary key, while adding use same number to add , add validation for repeated number, alert for no books found, try for sessionStorage, localStorage doesn't expire

//**Store Class: Handles storage
class StoreBook{ //storing book to localStorage : DB
    //localstorage store value in key value pair
    //we cannot store the object in localstorage it only accepts string so we have to stringify while storing in localstorage and parse it again while retreiving
    static getBooks(){
        //fetching book from storage
        let books;
        if(localStorage.getItem('books') === null){
            books = []; //fetching empty book array
        }else{
            books = JSON.parse(localStorage.getItem('books')); //parsing string value from localstorage to obj
        }
        return books;
    }
    static addBook(book){
        //adding book from storage
        //getting book from storage to add book into it
        const books = StoreBook.getBooks();
        books.push(book); //pushing book to array fetched, as we get array of objects
        localStorage.setItem('books',JSON.stringify(books)); //stringifying the array of object in strings, 'books' books as we are adding books, which we are using to get also
    }
    static removeBook(number){ //removing book based on number
        //removing book from storage
        //using number as id or primary key it should be unique
        const books = StoreBook.getBooks();
        books.forEach((book, index)=>{
            if(book.number === number){
                books.splice(index, 1); //splicing to make changes to curr array and not create another array, using index to determine which element to remove and 1, as to remove 1 element
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
        //updating that updated array again to localstorage
    }
}

//**Event: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//**Event: Add a Book
document.querySelector('#book-group').addEventListener('submit', (e)=>{
    //getting the values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const number = document.querySelector('#bookNo').value;

    //validate all fields have value
    if(title === '' || author === '' || number === ''){
        UI.showAlert('Please fill in all the fields','danger');
    }else{

        //instatiate book to create book object
        const book = new Book(title,author,number);
        document.querySelector('#book-group').reset(); //resetting the form
        //we can also create function and then clear out each field but this is better
    
        //adding book to list
        UI.addBooksToList(book); //if we don't have it added book won't be displayed on runtime it will only be displayed when browser is reloaded or getbooks method is called
        //** localStorage is similar to sessionStorage, except that while localStorage data has no expiration time, sessionStorage data gets cleared when the page session ends — that is, when the page is closed. (localStorage data for a document loaded in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed.) 
        StoreBook.addBook(book);
        UI.showAlert('Added book successfully','success')
    }
});

//**Event: Remove a Book
/** we cannot directly querySelect the x burtton to remove it will remove first element only
so we can use event delegation to select x button for particular row
we targeting whole table body and delegating event to all rows under it, then using click event to get which element is click using target property
then checking if we targeted delete button or not in delet funciton and remove parent row
*/
document.querySelector('#book-list').addEventListener
('click', (e)=>{
    const target = e.target;
    UI.deleteBookFromList(target);
    StoreBook.removeBook(target.parentElement.previousElementSibling.textContent); //as remove method take number, but when we click on x button it is not number so we have to fetch number from it using parent and child element, or parent element and previous element as number is directly next to x button, we are traversing the DOM
    UI.showAlert('Removed book successfully','success')
})
