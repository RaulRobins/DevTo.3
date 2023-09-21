/* Variables */
const URL_FIREBASE =
  "https://challenge3-92fe2-default-rtdb.firebaseio.com/.json";

/* Elements DOM */
const searchButton = document.querySelector("#searchButton");
const containerListPosts = document.querySelector("#list-posts");

/* Functions */
const renderPost = (dataPost) => {
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
    // cleanList();
    renderListPost(results);
  } catch (error) {
    console.error(error);
  }
};

getPostsApi();
