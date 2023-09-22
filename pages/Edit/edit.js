const search = window.location.search;
const url = new URLSearchParams(search);
const ID_POST = url.get("id");
const URL_FIREBASE_BY_ID =
  "https://challenge3-92fe2-default-rtdb.firebaseio.com/" + ID_POST + ".json";

const editButton = document.createElement ("button")


//FUNCIÓN EDITAR

const editButton1 = document.querySelector("#Enviar");

const postEdit = async (textEdited) => {
    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(textEdited),
      });
      if (response.status === 200) {
        window.location.href = 'http://127.0.0.1:5500/';
      }
    } catch (error) {
      console.error(error);
    }
  };

editButton.addEventListener("click", () => {
  
    const coverIMG = document.querySelector("#file");
    const newPostTitle = document.querySelector("#newPostTitle");
    const hashTags = document.querySelector("#hashTags")
    const postContent = document.querySelector("#postcontent")
    
    const post = {
      IMG: coverIMG.value, 
      TitlePost: newPostTitle.value,
      Tags: hashTags.value,
      ContentPost: postContent.value,

    }
  createPost(post)
  console.log(post)
});