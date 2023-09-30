const STORAGE_KEY = "BOOKSHELF_APPS";
const unfinishedParentEl = document.getElementById('notFinished');
const finishedParentEl = document.getElementById('finished');
let bookshelf = [];
  
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitButton");
  
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        addToReadList();
        closeOverlay();
    });
    
    if(isStorageExist()){
        loadDataFromStorage();
    }
    
});

 document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
 
 document.addEventListener("ondataloaded", () => {
    // loadDataFromStorage();
    refreshingData();
});


function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
 }

 function saveData() {
    const parsed = JSON.stringify(bookshelf);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
 }

 function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        bookshelf = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
 }
 
 function updateDataToStorage() {
    if(isStorageExist())
        saveData();
 }

 function composeTodoObject(title, author, year, isComplete, colorBook) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
        colorBook
    };
 }
