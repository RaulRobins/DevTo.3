//ACCEDER A POST POR HASH
editButton.addEventListener("click", () => {
  const elementToEdit = event.target.dataset.post //OJO CON EL POST
  window.location.href = 'http://127.0.0.1:5500/?id=' + elementToEdit
})

//ACCEDER A URL 
const URL_FIREBASE_BY_ID = "https://challenge3-92fe2-default-rtdb.firebaseio.com/" 
const search = window.location.search;
const url = new URLSearchParams(search);
const ID_POST = url.get("id");
//VARIABLES A OBTENER
const coverIMG = document.querySelector("#file");
const newPostTitle = document.querySelector("#newPostTitle");
const hashTags = document.querySelector("#hashTags")
const postContent = document.querySelector("#postcontent")
const editButton = document.querySelector("#Enviar");
//const editButton = document.createElement ("button")

//OBTENER POSTS CREADOS
const getInfoByID = async () => {
  const url = URL_FIREBASE_BY_ID + ID_POST + ".json";
  const info = await fetch (url);
  const parsed = await info.json();
  coverIMG.value = parsed.name
  newPostTitle.value = parsed.name
  hashTags.value = parsed.name
  postContent.value = parsed.name
}
//FUNCIÓN PARA EDITAR
const updatePost = async () => {
  const postToEdit = {
    name : "Fermin",
    lastName : "Monreal"
  };
  const url = URL_FIREBASE_BY_ID + ID_POST + ".json";
  const response = await fetch (url, {
    method : 'PUT',
    body: JSON.stringify(postToEdit)
  });
  if (response.status === 200){
    window.location.href = 'http://127.0.0.1:5500/';
  }
  console.log(response);
}

//REGRESAR A PÁGINA PRINCIPAL Y GUARDAR
editButton.addEventListener("click", () => {
  window.location.href = 'http://127.0.0.1:5500/create'
  updatePost()
})    


//FUNCIÓN EDITAR EN BASE DE DATOS

// const postEdit = async (textEdited) => {
//     try {
//       const response = await fetch(URL, {
//         method: "PUT",
//         headers: { "Content-type": "application/json;charset=UTF-8" },
//         body: JSON.stringify(textEdited),
//       });
//       if (response.status === 200) {
//         window.location.href = 'http://127.0.0.1:5500/';
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// postEdit()


//NI IDEA
  //   const post = {
  //     IMG: coverIMG.value, 
  //     TitlePost: newPostTitle.value,
  //     Tags: hashTags.value,
  //     ContentPost: postContent.value,

  //   }
  // createPost(post)
  // console.log(post)
