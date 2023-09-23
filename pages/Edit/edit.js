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

//OBTENER POSTS CREADOS
const getInfoByID = async () => {
  const url = URL_FIREBASE_BY_ID + ID_POST + ".json";
  const info = await fetch (url);
  const parsed = await info.json();
  coverIMG.value = parsed.img_url;
  newPostTitle.value = parsed.title
  hashTags.value = parsed.tags
  postContent.value = parsed.content
}
//FUNCIÓN PARA EDITAR
const updatePost = async (postToEdit) => {
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
  const postToEdit = {
    
      title : newPostTitle.value,

      img_url : coverIMG.value,

      description: "",

      content : postContent.value,

      date_post: "2023",

      author: {

        avatar: "",

        name: "Farid"

      },

      category: "",

      tags : ["#webdev", "#opensource", "#begginners", "#automation"],

      reactions: "",

      time_read: "2",

      comments: [{

        avatar:
      
          "https://res.cloudinary.com/practicaldev/image/fetch/s--VHUZhlht--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/998426/a483c1c2-a1c5-41ab-9b23-37697d3f344b.png",
      
        name: "SofiiaSov",
      
        date_comment: "21-10-2023",
      
        comment:
      
          "I appreciate you sharing this article on optimizing embedded development with VSCode extensions! It's incredibly useful. For those interested in further enhancing their embedded software development skills, I suggest taking a look at this article: Software Development in Embedded System. It provides a comprehensive overview of the topic. Thanks for the valuable resources!",
      
        likes: 2,
      
        reply: 1,
      
      },],
  };
  updatePost(postToEdit)
})    

getInfoByID()
