
//save bookmark
function saveBookmark(e){
    //get form values
      var siteName= document.getElementById('siteName').value;
      var siteURL= document.getElementById('siteURL').value;

      if (!validateForm(siteName,siteURL)) {
        return false;
  }

  //storing value in object
      var bookmark = {

          name: siteName,
          url: siteURL
        }

    /*setting up local storage.
    Local storage is feature of html5 and can be used to store only string value
    locally.
    localStorage.setItem('test',"Hello World" )
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    */

          //test if bookmark is null
          if (localStorage.getItem('bookmarks') === null) {
            //init array
            var bookmarks=[];
            //add to array
            bookmarks.push(bookmark);
            //set to localStorage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          }
          else {
            //get bookmarks from localStorage
            var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
            //add bookmark to array
            bookmarks.push(bookmark);
            //set to localStorage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          }
  //refetching the bookmarks
    fetchBookmarks();

  //prevent form from submitting
    e.preventDefault();
  }


  //deleting bookmark
  function deleteBookmark(url){
      //get bookmarks from  localStorage
      var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
      //loop through bookmarks
        for (var i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].url==url) {
              //remove from array
              bookmarks.splice(i,1);
            }
          }

          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          //refetching the bookmarks
          fetchBookmarks();
        }

      //Fetching the dbookmarkResults.innerHTML="";ata
      function fetchBookmarks(){

        //get bookmarks from localStorage
        var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
        //get output id
        var bookmarkResults =  document.getElementById('bookmarkResults');


        //build output
        bookmarkResults.innerHTML="";
          for (var i = 0; i < bookmarks.length; i++) {
            var name= bookmarks[i].name;
            var url= bookmarks[i].url;
            bookmarkResults.innerHTML += '<div class="well">'+
                                '<h3>'+name+
                                '<a class="btn btn-success" target="_blank" href="'+url+'"> Visit</a> '+
                                '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete</a> '+

                                '</h3>'+
                                '</div>';
                              }
                            }

  function validateForm(siteName,siteURL){

          if (!siteName || !siteURL ) {
            alert("Please enter Site name and url");
            return false;
          }

          var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
          var regex = new RegExp(expression);

            if (!siteURL.match(regex)) {
                  alert("Please enter valid url");
                  return false;
                }
        return true;
      }
