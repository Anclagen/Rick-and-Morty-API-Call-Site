import {callApi, errorMessage} from "./components/components.js";
// const cors = "https://noroffcors.herokuapp.com/";
const url = "https://rickandmortyapi.com/api/";
// Three resource sets available, add characters, location, and episode to end to get all info.
const characterContainer = document.querySelector(".characters");
const showMoreBtn = document.querySelector("#show-more");

//fetch api character list, they are split into arrays of 20, default without page no is first 20
async function callApiCharacters(url, query, container, runs) {
  try{
    addLoader(container);
    const data = await callApi(url + query);
    console.log(data);
    //call function to generate character list html
    createCharacterContent(data, container, runs);
  } catch (error){
    console.log(error);
    errorMessage(container);
  }
}

function addLoader(container){
  container.innerHTML = `<div class="loader">
                          <div class="rotate"></div>
                          <div class="rotate30"></div>
                          <div class="rotate70"></div>
                        </div>`;
}

//create items for homepage
function createCharacterContent(data, container, runs) {
  container.innerHTML = "";
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
  if (runs === 20){
    showMoreBtn.classList.add("hidden");
  }
  // } else {}
}

// initial call to put 10 result on page
callApiCharacters(url, "character", characterContainer, 10);

//create function to pass other function with parameters needed
function printAll(){
  return callApiCharacters(url, "character", characterContainer, 20)
}

showMoreBtn.addEventListener("click", printAll);
