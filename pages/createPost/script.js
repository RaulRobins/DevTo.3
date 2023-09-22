const URL = 'https://js-2a847-default-rtdb.firebaseio.com/'; 
const publishButton = document.querySelector("#Enviar");



const createPost = async(post) => {
    //codigo que se ejecute  por default
    const url = URL + '.json';
     const create = await fetch(url , { 
      method: 'POST', 
       headers: { 'Content-type': 'application/json:charset=UTF-8'}, 
      body: JSON.stringify(post),
     });   
     /* if(create.status === 200){
      getinfo()
     } */
  };

publishButton.addEventListener("click", () => {
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
