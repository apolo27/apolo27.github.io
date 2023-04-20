let bloggerPosts = null;
let postsID = null;

let POSTS = [];
let ACTUAL_POSTS = []

class Post{
    constructor(postID, theme, title, image, content, date, author, position, img_author){
        this.postID = postID;
        this.theme = theme;
        this.title = title;
        this.image = image;
        this.content = content;
        this.date = date;
        this.author = author;
        this.position = position;
        this.img_author = img_author;
    }
}

var actualPost = null;

function getPost(id){
    return fetch(`https://www.googleapis.com/blogger/v3/blogs/4816302503592460113/posts/${id}?key=AIzaSyARD4hXPEU2klOLmJPjPDHP_tE6x7fzNOA`)
        .then(response => response.json())
        .then(data => {
            element = data;
            
            postID = element["id"];
            let text = data["title"].split("|")
            theme = text[0].trim();
            title = text[1].trim();
            // Extract image
            let parser = new DOMParser();
            let doc = parser.parseFromString(data.content, "text/html");
            let firstLink = doc.querySelector("img").getAttribute("src");
            image = firstLink;
            content = Array.from(doc.querySelectorAll("p")).map(function(item){return item.textContent})
            const newDate = new Date(data["published"]);
            date = newDate.toISOString().split("T")[0];
            
            // console.log(element)

            let author = text[2].trim();
            let position = text[3].trim();
            let img_author = text[4].trim();

            return new Post(
                postID, theme, title, image, content, date, author, position, img_author
            );
            

        })
        .catch(error => console.error(error));
}

let actualPostID = new URL(window.location.href);
actualPostID = actualPostID.searchParams.get("id");
console.log(actualPostID);  

getPost(actualPostID).then(function(object){
    let container = document.querySelector(".showcase-area .container");

    let content = document.createElement("div");
    content.classList.add("row");

    // Colocar primera letra Roja
    let firstParragraphs=1;
    let parragraphsHTML = "";
    object.content.forEach(function(element){
        if (element.trim() != ""){
            if (firstParragraphs==1){
                parragraphsHTML += `<p class="first-parragraph">${element}</p>`;
                firstParragraphs = 0;
            }
            else{
                parragraphsHTML += `<p>${element}</p>`;
            }
        }
    })

    content.innerHTML = `
    <div class="row mt-4">
            <div class="col-lg-4 col-sm-7 title-card">
            <div class="row">
                <h1 class="post-title">${object.title}</h1>
            </div>
            <div class="row mt-3">
                <div class="author mt-auto">
                <img class="post-image" src=${object.img_author}>
                <div class="info">
                    <h5 class="author-text">${object.author}</h5>
                    <h5 class="author-position mt-1">${object.position}</h5>
                    <h5 class="author-date mt-1">${object.date}</h5>
                </div>
                </div>
            </div>
            </div>
            
            <div class="col-lg-8 col-sm-5">
            <img src=${object.image} class="card-img-top animate-img" alt="STEM Tour">
            </div>
        </div>
        <hr>
        
        <div class="row mt-3">
        <div class="post-content col-lg-12">
            ${parragraphsHTML}
        </div>
    </div>`
    container.appendChild(content);

    const title = document.querySelector('.post-title');
    const titleText = title.textContent;
    title.innerHTML = '';

    for (let i = 0; i < titleText.length; i++) {
    const letter = document.createElement('span');
    letter.textContent = titleText[i];
    letter.classList.add('letter');
    letter.style.animationDelay = i * 0.1 + 's';
    title.appendChild(letter);
    }


})


const rocket = document.getElementById('rocket');

document.addEventListener('mousemove', function(e) {
  rocket.style.left = e.pageX + 'px';
  rocket.style.top = (e.pageY-25) + 'px';
});
