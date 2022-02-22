import {callApi, errorMessage} from "./components/components.js";
// const cors = "https://noroffcors.herokuapp.com/";
const url = "https://rickandmortyapi.com/api/";
// Three resource sets available, add characters, location, and episode to end to get all info.
const characterContainer = document.querySelector(".characters");

//fetch api character list, they are split into arrays of 20, default without page no is first 20
async function callApiCharacters(url, query, container, runs) {
  try{
    const data = await callApi(url + query);
    console.log(data);
    //call function to generate character list html
    createCharacterContent(data, container, runs);
  } catch (error){
    console.log(error);
    errorMessage(container);
  }
}

//create items for homepage
function createCharacterContent(data, container, runs) {
  container.innerHTML += "";
  for(let i = 0; i < runs; i++){
    const id = data.results[i].id;
    const name = data.results[i].name;
    const image = data.results[i].image;
    const origin = data.results[i].origin;
    const species = data.results[i].species;

    container.innerHTML += `<div class="item">
                              <a href="details.html?id=${id}">
                                <h3>${name}</h3>
                                <img src=${image} alt="${name}" />
                              </a>
                              <p>Species: ${species}</p>
                              <p>Origin: ${origin.name}</p>`;
  }
}

callApiCharacters(url, "character", characterContainer, 10);