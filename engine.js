function addToReadList() {
    const inputTitle = document.getElementById('inputTitle').value;
    const inputAuthor = document.getElementById('inputAuthor').value;
    const inputYear = document.getElementById('inputYear').value;
    const inputStatus = document.getElementById('inputStatus').checked;
    const unfinishedParentEl = document.getElementById('notFinished');
    const finishedParentEl = document.getElementById('finished');
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    let colorBook = "#"+randomColor;
   
    const bookObject = composeTodoObject(inputTitle, inputAuthor, Number(inputYear), inputStatus, colorBook);

    bookshelf.push(bookObject);

    if (inputTitle != "" && inputAuthor != "" && inputYear != 0 ) {
        if (inputStatus == false) {
            let readListContentUncompleted = 
            `<div class="card-list" id="id${bookObject.id}">
                <div class="book-display" id="readingList${bookObject.id}">
                    <div class="book-info">
                        <p class="book-title" id="onTitle${bookObject.id}">${bookObject.title}</p>
                        <p class="book-year">${bookObject.year}</p>
                        <p class="book-author" id="onAuthor${bookObject.id}">${bookObject.author}</p>
                    </div>
                </div>
                <div class="card-info">
                    <p class="card-title">${bookObject.title}</p>
                    <p class="card-author">By ${bookObject.author}</p>
                    <p class="card-year">${bookObject.year}</p>

                    <div class="button-wrapper">
                        <button class="done-read-btn uncomplete" onclick='move(this)'><i class="fas fa-check"></i>Mark as Completed</button>
                        <button class="remove-btn" onclick='openCustomDialog(this)'><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>`;
                
            unfinishedParentEl.insertAdjacentHTML("beforeend", readListContentUncompleted);
            let bookColor = document.getElementById('readingList'+bookObject.id);
            bookColor.style.backgroundColor = bookObject.colorBook; 
            uncompleteContent = readListContentUncompleted;
            updateDataToStorage();

        } else {
            let readListContentCompleted = 
                `<div class="card-list" id="id${bookObject.id}">
                    <div class="book-display" id="readingList${bookObject.id}">
                        <div class="book-info">
                            <p class="book-title" id="onTitle${bookObject.id}">${bookObject.title}</p>
                            <p class="book-year">${bookObject.year}</p>
                            <p class="book-author" id="onAuthor${bookObject.id}">${bookObject.author}</p>
                        </div>
                    </div>
                    <div class="card-info">
                        <p class="card-title">${bookObject.title}</p>
                        <p class="card-author">By ${bookObject.author}</p>
                        <p class="card-year">${bookObject.year}</p>

                        <div class="button-wrapper">
                            <button class="done-read-btn  completed" onclick='move(this)'><i class="fas fa-minus"></i>Mark as Uncompleted</button>
                            <button class="remove-btn" onclick='openCustomDialog(this)'><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>`;
            
            finishedParentEl.insertAdjacentHTML("beforeend", readListContentCompleted);
            let bookColor = document.getElementById('readingList'+bookObject.id);
            bookColor.style.backgroundColor = bookObject.colorBook; 
            
            updateDataToStorage();

        }
     
    } else {
        alert("All fields must be filled !");
    }
}

function refreshingData() {
    const unfinishedParentEl = document.getElementById('notFinished');
    const finishedParentEl = document.getElementById('finished');
    
    for (books of bookshelf) {
        if(books.isComplete) {
            let readListContentCompleted = 
            `<div class="card-list" id="id${books.id}">
                <div class="book-display" id="readingList${books.id}">
                    <div class="book-info">
                        <p class="book-title" id="onTitle${books.id}">${books.title}</p>
                        <p class="book-year">${books.year}</p>
                        <p class="book-author" id="onAuthor${books.author}">${books.author}</p>
                    </div>
                </div>
                <div class="card-info">
                    <p class="card-title">${books.title}</p>
                    <p class="card-author">By ${books.author}</p>
                    <p class="card-year">${books.year}</p>

                    <div class="button-wrapper">
                        <button class="done-read-btn completed" onclick='move(this)'><i class="fas fa-minus"></i>Mark as Uncompleted</button>
                        <button class="remove-btn" onclick='openCustomDialog(this)'><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>`;
        
            finishedParentEl.insertAdjacentHTML("beforeend", readListContentCompleted);
            let bookColor = document.getElementById('readingList'+books.id);
            bookColor.style.backgroundColor = books.colorBook;
        } else {
            let readListContentUncompleted = 
                `<div class="card-list" id="id${books.id}">
                    <div class="book-display" id="readingList${books.id}">
                        <div class="book-info">
                            <p class="book-title" id="onTitle${books.id}">${books.title}</p>
                            <p class="book-year">${books.year}</p>
                            <p class="book-author" id="onAuthor${books.author}">${books.author}</p>
                        </div>
                    </div>
                    <div class="card-info">
                        <p class="card-title">${books.title}</p>
                        <p class="card-author">By ${books.author}</p>
                        <p class="card-year">${books.year}</p>

                        <div class="button-wrapper">
                            <button class="done-read-btn uncomplete" onclick='move(this)'><i class="fas fa-check"></i>Mark as Completed</button>
                            <button class="remove-btn" onclick='openCustomDialog(this)'><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>`;
            unfinishedParentEl.insertAdjacentHTML("beforeend", readListContentUncompleted);
            let bookColor = document.getElementById('readingList'+books.id);
            bookColor.style.backgroundColor = books.colorBook; 
        }
    }
}

function move(e) {
    let nearby = e.closest('.card-list');
    let getBtn = e.closest('.done-read-btn')
    let parentId = nearby.id;
    let getId = parseInt(parentId.replace("id", ""));

    for(books of bookshelf) {
        if(getId == books.id){
            if(books.isComplete) {
    
                unfinishedParentEl.append(nearby);
                books.isComplete = false;
                
                getBtn.classList.remove('completed');
                getBtn.classList.add('uncomplete');
                getBtn.innerHTML = `<i class="fas fa-check"></i>Mark as Completed`;
                updateDataToStorage(); 

    
            } else {
    
                finishedParentEl.append(nearby);
                books.isComplete = true;
                getBtn.classList.remove('uncomplete');
                getBtn.classList.add('completed');
                
                getBtn.innerHTML = `<i class="fas fa-minus"></i>Mark as Uncompleted`;
                updateDataToStorage(); 

            }

        } else {
            console.log("error id");
        }
    }    
}

function find(myValue){
    for(let i = 0; i < bookshelf.length; i++) {
        if(bookshelf[i].id == myValue){
            return found = i, custDialBookName = bookshelf[i].title, custDialBookId = bookshelf[i].id;
        }
    }
}

function openFormOverlay() {
    window.scrollTo(0, 0)
    const formOverlay = document.getElementById('formOverlay');
    const bgOverlay = document.getElementById('bgOverlay');
    const body = document.querySelector('body');
    
    formOverlay.style.display = "block";
    bgOverlay.style.display = "block";
    body.style.overflowY = "hidden";
}

function openCustomDialog(e) {
    window.scrollTo(0, 0)
    const customDialogOverlay = document.getElementById('customDialog');
    const bgOverlay = document.getElementById('bgOverlay');
    const body = document.querySelector('body');
    const customDialogContent = document.getElementById('bookName');
    const fillId = document.querySelector('.yes');
    
    
    customDialogOverlay.style.display = "block";
    bgOverlay.style.display = "block";
    body.style.overflowY = "hidden";
    
    let nearby = e.closest('.card-list');
    let parentId = nearby.id;
    let myvalue = Number(parentId.replace("id", ''));
    find(myvalue);
    customDialogContent.innerHTML = custDialBookName;
    fillId.setAttribute("id", "id"+custDialBookId);
}

function closeOverlay() {
    const formOverlay = document.getElementById('formOverlay');
    const bgOverlay = document.getElementById('bgOverlay');
    const body = document.querySelector('body');
    
    formOverlay.style.display = "none";
    bgOverlay.style.display = "none";
    body.style.overflowY = "visible";
}

function closeCustomDialog() {
    const customDialogOverlay = document.getElementById('customDialog');
    const bgOverlay = document.getElementById('bgOverlay');
    const body = document.querySelector('body');
    
    customDialogOverlay.style.display = "none";
    bgOverlay.style.display = "none";
    body.style.overflowY = "visible";
}

function no() {
    closeCustomDialog();
}

function yes(e) {
    let rawId = e.id;
    let whatId = Number(rawId.replace("id", ''));
    find(whatId);    
    bookshelf.splice(found, 1);

    e.remove();
    
    const customDialogOverlay = document.getElementById('customDialog');
    const bgOverlay = document.getElementById('bgOverlay');
    const body = document.querySelector('body');
    
    customDialogOverlay.style.display = "none";
    bgOverlay.style.display = "none";
    body.style.overflowY = "visible";
    
    updateDataToStorage();
    window.location.reload()
}

function searchTitle(value){
    const searchInput = document.getElementById('searchInput');
    const myInput = searchInput.value.toUpperCase();
    var section = document.querySelectorAll('.card-list');
    for(let i = 0; i < section.length; i++) {
        var bookLists = section[i].getElementsByTagName('p')[0];
        var bookListsTitle = bookLists.innerText.toUpperCase();
        
        if(bookListsTitle.indexOf(myInput) > -1){
            section[i].style.display = "";
        } else {
            section[i].style.display = "none";
        }
    }

}


