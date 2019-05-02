// listen for form submit
document.getElementById('newBookmarkForm').addEventListener('submit', saveBookmark);

// function to save bookmarks
function saveBookmark(e) {
    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    var siteTags = document.getElementById('siteTags').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl,
        tags: siteTags
    }

    // check if bookmarks exist
    if(localStorage.getItem('bookmarks') === null) {
        // init array
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form after submit
    document.getElementById('newBookmarkForm').reset();

    // fetch bookmarks to display an updated list
    fetchBookmarks();

    // prevent form from submitting
    e.preventDefault();
}

// function for deleting bookmarks
function deleteBookmark(url) {
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks to determine bookmark existence
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            // if bookmark exists, remove bookmark from array
            bookmarks.splice(i, 1);
        }
    }
    // re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // fetch bookmarks again to display an updated list
    fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output ID
    var bookmarksResults = document.getElementById('bookmarksResults');

    // build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var tags = bookmarks[i].tags;

        bookmarksResults.innerHTML += '<div class="card shadow p-3 mb-5 text-white bg-dark w-auto rounded">'+
                                      '<div class="card-header">'+name+
                                      '</div>'+
                                      '<div class="card-body shadow p-3 mb-5">'+
                                      '<a class="btn btn-info" target="_blank" href="'+url+'">Visit</a> ' +
                                      '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                      '<p class="card-text">'+tags+
                                      '</p>'+
                                      '</div>'+
                                      '</div>';
    }

}

// validation of form fields
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Name and URL fields must be populated.');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please enter a valid URL.');
        return false;
    }

    return true;
}