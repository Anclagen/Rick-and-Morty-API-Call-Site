//import shared functions between details and index (fetch function, error message and loader generator.)
import {callApi, errorMessage, addLoader} from "./components/components.js";

// const cors = "https://noroffcors.herokuapp.com/";
// Three resource sets available; add character, location, and episode to end to of url all info.
const url = "https://rickandmortyapi.com/api/";
const characterContainer = document.querySelector(".characters");
const showMoreBtn = document.querySelector("#show-more");
const previousBtn = document.querySelector(".previous-page");
const nextBtn = document.querySelector(".next-page");
const pageNumberContainer = document.querySelector(".page-number");


//fetch api character list, they are split into arrays of 20, default without page no is page 1
async function callApiCharacters(url, query, container, runs) {
  try{
    //add loader to page, needed when showing more
    addLoader(container);
    const data = await callApi(url + query);
    //call function to generate character list html
    createCharactersContent(data, container, runs);
  } catch (error){
    console.log(error);
    errorMessage(container);
  }
}

//create characters for selection on the homepage
function createCharactersContent(data, container, runs) {
  container.innerHTML = "";
  for(let i = 0; i < runs; i++){
    //fixes the last page of result as there are only 6, function calls 20
    if(data.results[i] === undefined){
      nextBtn.classList.add("hidden");
      break;
    }

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

  //add navigation
  addRemoveNavBtns(runs, data);
}

// initial call to put 10 result on page
callApiCharacters(url, "character", characterContainer, 10);


//results navigation, to browse other pages of the api
let pageNumber = 1; 

//function to add navigation buttons as needed
function addRemoveNavBtns(runs, data){
if (runs === 20){
    showMoreBtn.classList.add("hidden");
    //if statement needed to remove next on last page
    if(pageNumber < data.info.pages){
    nextBtn.classList.remove("hidden");
    }
    //adds previous for page two and removes when going back
    if(pageNumber > 1){
      previousBtn.classList.remove("hidden");
    } else {
      previousBtn.classList.add("hidden");
    }
  }
}

//required url ending, just add page number
const pageQuery = "character/?page=";

// add the last 10 results of page one
function fetchMoreContent(){
  callApiCharacters(url, "character", characterContainer, 20);
  pageNumberContainer.classList.remove("hidden");
  pageNumberContainer.innerHTML = `Page ${pageNumber} of 42`;
}

//fetches 20 results max for page 1 of characters
showMoreBtn.addEventListener("click", fetchMoreContent);

//change page in api to display next or previous 20 results
function fetchNextPage(){
  pageNumber = pageNumber + 1;
  let query = pageQuery + pageNumber;
  callApiCharacters(url, query, characterContainer, 20);
  pageNumberContainer.innerHTML = `Page ${pageNumber} of 42`;
}

function fetchPreviousPage(){
  pageNumber = pageNumber - 1;
  let query = pageQuery + pageNumber;
  callApiCharacters(url, query, characterContainer, 20);
  pageNumberContainer.innerHTML = `Page ${pageNumber} of 42`;
}

//previous and next buttons event listeners
previousBtn.addEventListener("click", fetchPreviousPage);
nextBtn.addEventListener("click", fetchNextPage);