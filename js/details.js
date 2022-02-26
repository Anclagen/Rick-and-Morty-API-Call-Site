//import shared functions between details and index (fetch function, error message and loader generator.)
import {callApi, errorMessage, addLoader} from "./components/components.js";

const url = "https://rickandmortyapi.com/api/character/";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
//gets the id for character selected on index
let id = params.get("id");

//randomiser for details page if no character is selected, total of 826 characters in api.
if(id === null){
  id = Math.floor((Math.random() * 826) + 1);
}

//combines base url with id fetched from querystring
const finalUrl = url + id;

//targeting container for content and title of page
const characterContainer = document.querySelector(".character");
const pageTitle = document.querySelector("title");

//fetches specific character
async function callApiCharacter(url, container) {
  try{
    addLoader(container);
    const data = await callApi(url);
    createCharacterContent(data, container);
    } catch (error){
      console.log(error);
      errorMessage(container);
    }
}

//async needed to add await to episode details fetches, as well as try catch for errors
async function createCharacterContent(data, container){
  try{
    //assigning variables
    const name = data.name;
    const image = data.image;
    const origin = data.origin;
    const species = data.species;
    const location = data.location;
    const gender = data.gender;

    //adding custom styling to status based on dead or alive
    let status = "<p>Status: Unknown</p>";
    if (data.status === "Alive") {
      status = `<p>Status: <span class="alive">Alive</span></p>`;
    } else if(data.status === "Dead") {
      status = `<p>Status: <span class="dead">Dead</span></p>`;
    };

    //get first and last episode api urls
    const episodeArrayLength = (data.episode.length - 1);
    const lastEpisode = data.episode[episodeArrayLength];
    const firstEpisode = data.episode[0];

    //getting fetch first and last episode names, and season numbers
    const getFirstEpisode = await callApi(firstEpisode);
    const getLastEpisode = await callApi(lastEpisode);

    //placed below episode fetches to leaves loader in place
    container.innerHTML = "";

    container.innerHTML += `<div class="main-item">
                            <h3>${name}</h3>
                            <img src=${image} alt="${name}" />
                            <p>Gender: ${gender}</p>
                            <p>Species: ${species}</p>
                            <p>Origin: ${origin.name}</p>
                            <p>Last known location: ${location.name}</p>
                            ${status}
                            <p>First appearance in: ${getFirstEpisode.name}, ${getFirstEpisode.episode} </p>
                            <p>Aired on: ${getFirstEpisode.air_date}</p>
                            <p>Last appearance in: ${getLastEpisode.name}, ${getLastEpisode.episode}</p>
                            <p>Aired on: ${getLastEpisode.air_date}</p>
                            </div>`;
    pageTitle.innerHTML = `${name}'s character details | JS 1 CA`; 
  } catch (error){
    console.log(error);
    errorMessage(container);
  }
}


callApiCharacter(finalUrl, characterContainer);