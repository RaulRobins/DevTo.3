/* Variables */
const URL_FIREBASE =
  "https://challenge3-92fe2-default-rtdb.firebaseio.com/.json";

/* Functions */
const parserResponsePersonsFireBase = (object) => {
  const listPersonParsed = [];

  for (const key in object) {
    const obectParsed = {
      id: key,
      avatar: object[key].avatar,
      name: object[key].name,
      lastName: object[key].lastName,
      gender: object[key].gender,
      date: object[key].date,
      country: object[key].country,
      description: object[key].description,
    };
    listPersonParsed.push(obectParsed);
  }
  return listPersonParsed;
};

/* Methods API */
const getPostsApi = async () => {
  try {
    const response = await fetch(URL_FIREBASE, {
      method: "GET",
    });
    const parsed = await response.json();
    const results = parserResponsePersonsFireBase(parsed);
    console.log(results);
    // cleanList();
    // renderListPersons(results);
  } catch (error) {
    console.error(error);
  }
};

getPostsApi();




const deleteButton = document.getElementById('deleteButton');

deleteButton.addEventListener("click", async (event) => {
    console.log( "click")
    console.log( event) /*objeto que representa el event*/
    console.log( event.target) /*objeto que representa el elemento que recibió el evento*/
    console.log( event.target.dataset)
    const response = await fetch(`DB_URL/${event.target.dataset,postId}`,{
        method:"DELETE"
    })

    const data = await response.json()

}
)
console.log('deleteButton');



