/* Variables */
let allPost = [];
let filteredPost = [];
const URL_FIREBASE =
  "https://challenge3-92fe2-default-rtdb.firebaseio.com/.json";

/* Elements DOM */
const searchButton = document.querySelector("#searchButton");
const createPostButton = document.querySelector(".create-post__button");
const containerListPosts = document.querySelector("#list-posts");

/* Functions */
const cleanList = () => {
  while (containerListPosts.firstChild) {
    containerListPosts.removeChild(containerListPosts.firstChild);
  }
};

const renderTag = (hashTag, container) => {
  const tag = document.createElement("li");
  tag.className = "card__tag me-2";
  tag.textContent = hashTag;
  container.appendChild(tag);
};

const renderListTags = (listTags, tag) => {
  listTags.forEach((element) => {
    renderTag(element, tag);
  });
};

const renderPost = (dataPost) => {
  // elements interactions
  const reactionItem = document.createElement("li");
  reactionItem.className = "reaction--item";
  const listReactions = document.createElement("ul");
  listReactions.className = "multiple__reactions--container";
  const spanNumberReactions = document.createElement("span");
  spanNumberReactions.className = "reactions--number-final";
  spanNumberReactions.textContent = "reactions";
  const anchorMainReactions = document.createElement("a");
  anchorMainReactions.className = "main__reaction--container";
  anchorMainReactions.appendChild(listReactions);
  anchorMainReactions.appendChild(spanNumberReactions);

  const txtMessage = document.createElement("span");
  txtMessage.className = "comments__number--card";
  txtMessage.textContent = dataPost.comments.length + " " + "comments";
  const iconMessage = document.createElement("img");
  iconMessage.className = "comments__number_icon";
  iconMessage.src = "./img/icons/messaje.svg";
  iconMessage.alt = "icon message";
  const numberComments = document.createElement("div");
  numberComments.className =
    "comments__number--cards d-flex align-items-center";
  numberComments.style = "width: 350px;";
  numberComments.appendChild(iconMessage);
  numberComments.appendChild(txtMessage);

  const iconRead = document.createElement("img");
  iconRead.className = "comments__number_icon";
  iconRead.src = "./img/icons/iconReaction.svg";
  iconRead.alt = "icon message";
  const txtMinute = document.createElement("span");
  txtMinute.className = "";
  txtMinute.style = "color: gray; font-size:12px";
  txtMinute.textContent = dataPost.time_read + " " + "min" + " " + "read";
  const minuteReaction = document.createElement("div");
  minuteReaction.className = "last__minute__reaction";
  minuteReaction.style = "width: 18%; display: flex";
  minuteReaction.appendChild(txtMinute);
  minuteReaction.appendChild(iconRead);

  const multipleReactions = document.createElement("div");
  multipleReactions.className = "multiple__reactions__number";
  multipleReactions.style = "width: 100%; margin-left: 8px;";
  multipleReactions.appendChild(anchorMainReactions);
  multipleReactions.appendChild(numberComments);
  multipleReactions.appendChild(minuteReaction);

  // elements tags
  const listTags = document.createElement("ul");
  listTags.className = "card__tags d-flex flex-wrap list-unstyled";
  renderListTags(dataPost.tags, listTags);
  // elment description
  const cardDescription = document.createElement("p");
  cardDescription.className = "card-text";
  cardDescription.textContent = dataPost.description;
  // element title
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.style = "font-size:28px; font-weight: 800";
  cardTitle.textContent = dataPost.title;

  const rowContainer = document.createElement("div");
  rowContainer.className = "row container";
  rowContainer.appendChild(cardTitle);
  rowContainer.appendChild(cardDescription);
  rowContainer.appendChild(listTags);
  rowContainer.appendChild(multipleReactions);

  // elements author
  const imgAuthor = document.createElement("img");
  imgAuthor.src = dataPost.author.avatar;
  imgAuthor.alt = dataPost.author.name;

  const anchorCommentImage = document.createElement("a");
  anchorCommentImage.className = "card__comment--image--final d-flex";
  anchorCommentImage.appendChild(imgAuthor);

  const authorImage = document.createElement("div");
  authorImage.className = "card__comment--image";
  authorImage.appendChild(anchorCommentImage);

  const anchorAuthorName = document.createElement("a");
  anchorAuthorName.textContent = dataPost.author.name;
  const anchorAuthorDate = document.createElement("a");
  anchorAuthorDate.textContent = dataPost.date_post;

  const authorNameDate = document.createElement("div");
  authorNameDate.className = "name__date--container d-flex flex-column";
  authorNameDate.appendChild(anchorAuthorName);
  authorNameDate.appendChild(anchorAuthorDate);

  const cardAuthorContainer = document.createElement("div");
  cardAuthorContainer.className = "card__top--photo-name d-flex flex-row";
  cardAuthorContainer.appendChild(authorImage);
  cardAuthorContainer.appendChild(authorNameDate);

  // Buttons
  const btnEliminar = document.createElement("button");
  const btnEditar = document.createElement("button");
  btnEliminar.className = "btn btn-danger btn-sm m-1";
  btnEditar.className = "btn btn-info btn-sm m-1";
  btnEliminar.textContent = "Eliminar";
  btnEditar.textContent = "Editar";
  btnEliminar.dataset.post = dataPost.id;
  btnEditar.dataset.post = dataPost.id;
  // Event button edit
  btnEditar.addEventListener("click", (event) => {
    const idPost = event.target.dataset.post;
    window.location.href = "http://127.0.0.1:5500/pages/Edit/?id=" + idPost;
  });
  // Event button delete
 btnEliminar.addEventListener("click", (event) => {
  const idPost = event.target.dataset.post; // aqui obtengo el hash
  eliminarPostApi(idPost);
 })

  const divButtons = document.createElement("div");
  divButtons.className = "gap-2";
  divButtons.appendChild(btnEditar);
  divButtons.appendChild(btnEliminar);

  const cardAuthor = document.createElement("div");
  cardAuthor.className = "card__top--content d-flex justify-content-between";
  cardAuthor.style = "width: 100%;";

  cardAuthor.appendChild(cardAuthorContainer);
  cardAuthor.appendChild(divButtons);

  // element card body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  cardBody.appendChild(cardAuthor);
  cardBody.appendChild(rowContainer);

  // element image post
  const imgPost = document.createElement("img");
  imgPost.className = "card-img-top";
  imgPost.src = dataPost.img_url;
  imgPost.alt = dataPost.title;

  // element card
  const card = document.createElement("div");
  card.className = "card";

  card.appendChild(imgPost);
  card.appendChild(cardBody);

  containerListPosts.append(card);
};

const renderListPost = (listPosts) => {
  listPosts.forEach((post) => {
    renderPost(post);
  });
};

const parserResponsePostFireBase = (object) => {
  const listPostParsed = [];

  for (const key in object) {
    const obectParsed = {
      id: key,
      title: object[key].title,
      img_url: object[key].img_url,
      description: object[key].description,
      content: object[key].content,
      date_post: object[key].date_post,
      author: {
        avatar: object[key].author.avatar,
        name: object[key].author.name,
      },
      category: object[key].category,
      tags: object[key].tags,
      reactions: object[key].reactions,
      time_read: object[key].time_read,
      comments: [...object[key].comments],
    };
    listPostParsed.push(obectParsed);
  }
  allPost = listPostParsed;
  return listPostParsed;
};

/* Events */
//Search Button
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  filteredPost = []
  const searchPost = document.querySelector("#searchInput").value;
  if (searchPost.trim().length === 0) {
    filteredPost = allPost;

  }
  else{
    filterListPost = allPost.forEach((post)=>{
    const lowerCase = post.title.toLowerCase();
    const result = lowerCase.match(searchPost.toLowerCase());  

    if (result != null) {
      const coincidence = post.title;
      if (post.title ===coincidence){
        filteredPost.push(post);
      }     
    }
    
  })

}
cleanList();
renderListPost(filteredPost);
});

//Create Post Button
createPostButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "http://127.0.0.1:5500/pages/createPost";
});

//Filter Posts
// var filteredPosts = listPostParsed.filter(function (posts) {});

/* Methods API */
const getPostsApi = async () => {
  try {
    const response = await fetch(URL_FIREBASE, {
      method: "GET",
    });
    const parsed = await response.json();
    const results = parserResponsePostFireBase(parsed);
    cleanList();
    renderListPost(results.reverse());
  } catch (error) {
    console.error(error);
  }
};

const eliminarPostApi = async (id) => { 
  const URL_FIREBASE_BY_POST = "https://challenge3-92fe2-default-rtdb.firebaseio.com/" + id + ".json";
  try{ 
    const response = await fetch(URL_FIREBASE_BY_POST,{
      method: "DELETE",
    });
    if (response.status === 200){
      getPostsApi();
    }

  }catch (error){
    console.error(error);
  }
}


getPostsApi();


