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
var cardContent = document.querySelector('.card-content');
var cardImageImg = document.querySelector('.card-image img');

fetch("https://www.googleapis.com/blogger/v3/blogs/4816302503592460113/posts?key=AIzaSyARD4hXPEU2klOLmJPjPDHP_tE6x7fzNOA")
  .then(response => response.json())
  .then(data => {
    bloggerPosts = data;
    postsID = bloggerPosts["items"].map(function(item){return item["id"]});
    
    // Problem
    var promises = postsID.map(getPost);
    return Promise.all(promises);
  })
  .then(posts => {
    POSTS.push(...posts);
    createMainCard(POSTS[0]);
    let size = POSTS.length;
    document.querySelector(".number").textContent = '' + size;
    POSTS.slice(1).forEach(function(el){
        createMiniCard(el);
    })
    cardContent = document.querySelector('.card-content');
    cardImageImg = document.querySelector('.card-image img');
    cardImageImg.style.height = `${cardContent.offsetHeight+60}px`;
    adjustCard();
  })
  .catch(error => console.error(error));

// Create Cards
// obtener el elemento container
const containerMini = document.getElementById("containerMini");
const containerMain = document.getElementById("mainCard");
let counterCard = 0;
let rowCard = 0;

function createMainCard(object){
    let card = document.createElement("div");
    card.classList.add("card", "mt-5");
    card.innerHTML =   `
                  <div class="card-image">
                    <img src=${object.image}>
                  </div>
                  <div class="card-content">
                    <h4 class="card-title">${object.theme}</h4>
                    <h3 class="card-subtitle">${object.title}</h3>
                    <p class="card-text">${object.content[2]}</p>
                    <div class="author">
                      <img src=${object.img_author}>
                      <div class="info">
                        <h5 class="author-text">${object.author}</h5>
                        <h5 class="author-position pt-1">${object.position}</h5>
                        <h5 class="author-date pt-1">${object.date}</h5>
                      </div>
                    </div>
                  </div>
    `
    card.addEventListener("click", function(){
        const isLocalFile = window.location.protocol === 'file:';
        if (isLocalFile) {
            window.location.href = `file:///C:/Users/user/Desktop/Programming/Projects/Apolo/Apolo/https---github.com-rosannabautista-APOLO27SWEBSITE/post.html?id=${object.postID}`;
        } else {
            window.location.href = `/post?id=${object.postID}`;
        }
    });
    containerMain.appendChild(card);
    let size = ACTUAL_POSTS.length;
    document.querySelector(".number").textContent = '' + size;
}

function createMiniCard(object){
    // crear el elemento de la card
    let card = document.createElement("div");
    card.classList.add("card", "col-lg-4", "col-sm-6", `card-${counterCard+1}`, "mt-3", "delete");

    card.innerHTML = `
    <div class="card-wrapper d-flex flex-column">
        <div class="col-md-12 card-image-small">
        <img src=${object.image} class="card-img-top mb-5" alt="${object.title}">
        </div>
        <div class="col-md-12 mt-3">
        <div class="card-body d-flex flex-column">
            <h4 class="card-title">${object.theme}</h4>
            <h3 class="card-subtitle mb-2 mt-1">${object.title}</h3>
            <p class="card-text mt-1    ">${object.content[2]}</p>
            
            
            <div class="author mt-auto">
            <img src=${object.img_author}>
            <div class="info">
                <h5 class="author-text">${object.author}</h5>
                <h5 class="author-position pt-1">${object.position}</h5>
                <h5 class="author-date pt-1">${object.date}</h5>
            </div>
            </div>
        </div>
        </div>
    </div>
    `;


    // agregar la card como hijo del containerMini
    
    card.addEventListener("click", function(){
        const isLocalFile = window.location.protocol === 'file:';
        if (isLocalFile) {
            window.location.href = `file:///C:/Users/user/Desktop/Programming/Projects/Apolo/Apolo/https---github.com-rosannabautista-APOLO27SWEBSITE/post.html?id=${object.postID}`;
        } else {
            window.location.href = `/post?id=${object.postID}`;
        }
    });
    
    

    
    containerMini.appendChild(card);

    adjustCard()
    let element = document.createElement("hr");
    element.classList.add("hr-hide");
    containerMini.appendChild(element); 
    counterCard += 1;
        if (counterCard==3){
            counterCard = 0;
            rowCard += 1;
        }
    // adjustCard();
}

var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let sizeGroup = 3;
function adjustCard(){
    sizeGroup = function(){
        if (viewportWidth<1200 && viewportWidth>=600){
            return 2;
        }
        else if (viewportWidth<600){
            return  1;
        }
        else{
            return  3;
        }
    }();
    console.log("Size viewpower: " + sizeGroup);
    if (document.querySelectorAll(".card-wrapper")[0]!=undefined){
        let cardWrapperHeight = document.querySelectorAll(".card-wrapper")[rowCard*sizeGroup].offsetHeight;
        let cardsWrapper = 0;
        if (sizeGroup==1){
            // cardsWrapper = Array.from(document.querySelectorAll(".card-wrapper"))[counterCard+rowCard*3];
            // cardsWrapper.style.height = `${cardWrapperHeight+30}px`;
        }   
        else{
            cardsWrapper = Array.from(document.querySelectorAll(".card-wrapper")).slice(rowCard*sizeGroup, rowCard*sizeGroup+sizeGroup);
            
            cardsWrapper.forEach(function(el){
                el.style.height = `${cardWrapperHeight+30}px`
            })
        }

    }
}



function updateCards(cards){
    ACTUAL_POSTS = cards;
    let size = cards.length;
    document.querySelector(".number").textContent = '' + size;
    rowCard = 0;
    counterCard = 0;
    document.querySelectorAll(".card").forEach(function(el){el.remove()})
    document.querySelectorAll(".hr-hide").forEach(function(el){el.remove()})
    // Filter
    createMainCard(cards[0]);
    cards.slice(1).forEach(function(el){
        createMiniCard(el);
    })
    cardContent = document.querySelector('.card-content');
    cardImageImg = document.querySelector('.card-image img');
    cardImageImg.style.height = `${cardContent.offsetHeight+60}px`;
    
}




function activeButton(button, type){
    Array.from(document.querySelector(".labels").children).forEach(function(label){label.classList.remove("active")});
    button.classList.add("active");
    if (type=="all"){
        updateCards(POSTS);
    }
    else if(type=="STEM"){
        updateCards(POSTS.filter(function(el){return el.theme==="STEM"}));
    }
    else if(type=="Telemetría"){
        updateCards(POSTS.filter(function(el){return el.theme==="Telemetría"}));
    }
    else if(type=="Manufactura"){
        updateCards(POSTS.filter(function(el){return el.theme==="Manufactura"}));
    }
    else if(type=="Blog"){
        updateCards(POSTS.filter(function(el){return el.theme==="Blog"}));
    }
    
}
