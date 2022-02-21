import {callApi} from "./components/components.js";
// const cors = "https://noroffcors.herokuapp.com/";
const url = "https://rickandmortyapi.com/api/";
// Three resource sets available, add characters, location, and episode to end to get all info.
const characterContainer = document.querySelector(".characters");

async function callApiCharacters(url, query, container, runs) {
  try{
    const response = await fetch(url + query);
    const data = await response.json();
    console.log(data);
    createCharacterList(data, container, runs);
  } catch (error){
    console.log(error);
  }
}

let results = await callApi((url + "location"));
console.log(results);

function createCharacterList(data, container, runs) {
  container.innerHTML += "";
  for(let i = 0; i < runs; i++){
    const id = data.results[i].id;
    const name = data.results[i].name;
    const image = data.results[i].image;

    container.innerHTML += `<div class="item">
                              <a href="details.html?url=character&id=${id}">
                                <h3>${name}</h3>
                                <img src=${image} alt="${name}" />
                              </a>`;
  }
}

callApiCharacters(url, "character", characterContainer, 10);

//callApi(url, "location", locationContainer);

async function callApiLocations(url, query) {
  const response = await fetch(url + query);
  const data = await response.json();
  console.log(data);
}

callApiLocations(url, "location");


//callApi(url, "episode", episodesContainer);