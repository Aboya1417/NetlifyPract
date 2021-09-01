const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#show-modal");
const modalClose = document.querySelector("#close-modal"); 
const bookmarkForm = document.querySelector("#bookmark-form"); 
const websiteNameEl = document.querySelector("#website-name"); 
const websiteUrl =  document.querySelector("#website-url");
const bookmarksContainer = document.querySelector("bookmarks-container");

let bookmark = [];

function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

modalShow.addEventListener('click', showModal);

modalClose.addEventListener('click', ()=> modal.classList.remove('show-modal') );

window.addEventListener('click', (e)=> e.target === modal ?  modal.classList.remove('show-modal') : false );
function validate(nameValue, urlValue) {
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
      alert('Please submit values for both fields.');
      return false;
    }
    if (!urlValue.match(regex)) {
      alert('Please provide a valid web address.');
      return false;
    }
    // Valid
    return true;
  }
  function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    } else{
        bookmarks = [
            {
                name: 'google',
                url: 'https://google.com'
            }
        ]
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }
    buildBookmarks()
  }
function  storeBookMark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrl.value;

    if(!urlValue.includes('http:, https:')){
        urlValue = `https://${urlValue}`;
    }
    if(!validate(nameValue, urlValue)){
        return false;
    };

    const bookmark = {
        name: nameValue,
        url: urlValue
    }
   bookmarks.push(bookmark);
 
    bookmarkForm.reset();
    websiteNameEl.focus();
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
 
}

function deleteBookmark(url){
    bookmarks.forEach((bookmark, i)=>{
        if(bookmark.url === url){
            bookmarks.splice(i,1)
        }
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function buildBookmarks(){
    // Remove all bookmark elements
  bookmarksContainer.textContent = '';
 
    bookmarks.forEach((bookmark)=>{
        const {name, url} =  bookmark;
        const item = document.createElement("div");
        item.classList.add('item'); 

        const closedIcon = document.createElement("i");
        closedIcon.classList.add('fas','fa-times');
        closedIcon.setAttribute('title', 'Delete Bookmark');
        closedIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

        const linkInfo = document.createElement("div");
        linkInfo.classList.add('name');

        const favicon = document.createElement("img");
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt','Favicon');

        const link = document.createElement("a");
        link.setAttribute('href',url);
        link.setAttribute('target','_blank');
        link.textContent =  name;

        linkInfo.append(favicon,link);

        item.append(closedIcon, linkInfo);

        bookmarksContainer.appendChild(item);
    });
}

bookmarkForm.addEventListener('submit',storeBookMark);


fetchBookmarks();
