/* Variables */
const URL_FIREBASE =
  "https://challenge3-92fe2-default-rtdb.firebaseio.com/.json";

/* Elements DOM */
const searchButton = document.querySelector("#searchButton");
const createPostButton = document.querySelector(".create-post__button")
const containerListPosts = document.querySelector("#list-posts");

/* Functions */

const cleanList = () => {
  while(containerListPosts.firstChild) {
    containerListPosts.removeChild(containerListPosts.firstChild)
  }
}

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
  cardTitle.textContent = dataPost.title;

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

  const cardAuthor = document.createElement("div");
  cardAuthor.className = "card__top--content d-flex flex-row";

  cardAuthor.appendChild(cardAuthorContainer);

  // element card body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  cardBody.appendChild(cardAuthor);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescription);
  cardBody.appendChild(listTags);

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
  console.log(dataPost);
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
  return listPostParsed;
};

/* Events */
//Search Button
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchPost = document.querySelector("#searchInput");
  console.log(searchPost.value);
});

//Create Post Button

createPostButton.addEventListener("click", (event) => {
  window.location.href = 'pages/createPost/index.html'  
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
    renderListPost(results);
  } catch (error) {
    console.error(error);
  }
};

getPostsApi();
