//import basic fetch function and error message.
import {callApi, errorMessage} from "./components/components.js";

const url = "https://rickandmortyapi.com/api/character/";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let id = params.get("id");
//randomiser for details page if no character is selected
  if(id === null){
    id = Math.floor((Math.random() * 826) + 1);
  }

//combines base url with id fetched from querystring
const finalUrl = url + id;

//targeting container for content and title of page
const characterContainer = document.querySelector(".character");
const pageTitle = document.querySelector("title");

//fetches specific character
async function callApiCharacters(url, container) {
  try{
    const data = await callApi(url);
    createCharacter(data, container);
    } catch (error){
      console.log(error);
      errorMessage(container);
    }
}

//async needed to add await to episode details fetches, as well as try catch for errors
async function createCharacter(data, container){
  try{
    //assigning variables
    const name = data.name;
    const image = data.image;
    const origin = data.origin;
    const species = data.species;
    const location = data.location;
    const gender = data.gender;

    //adding custom styling to status
    let status = "<p>Status: Unknown</p>"
    if (data.status === "Alive") {
      status = `<p>Status: <span class="alive">Alive</span></p>`
    } else if(data.status === "Dead") {
      status = `<p>Status: <span class="dead">Dead</span></p>`
    };

    //get first and last episode api urls
    const episodeArrayLength = (data.episode.length - 1);
    const lastEpisode = data.episode[episodeArrayLength];
    const firstEpisode = data.episode[0];

    //getting fetch first and last episode data 
    const getFirstEpisode = await callApi(firstEpisode);
    const getLastEpisode = await callApi(lastEpisode);

    
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

callApiCharacters(finalUrl, characterContainer);

