import {callApi} from "./components/components.js";

const url = "https://rickandmortyapi.com/api/character/";
const urlEpisodes = "https://rickandmortyapi.com/api/episode/";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id = params.get("id");
//randomiser for details page
  if(id === null){
    id = Math.floor((Math.random() * 826) + 1);
  }

const finalUrl = url + id;
const characterContainer = document.querySelector(".character");

//
async function callApiCharacters(url, container) {
  try{
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    createCharacter(data, container);
  } catch(error){
    console.log(error);
  }
}

//async needed to add await to episode details fetches
async function createCharacter(data, container){
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
                          <p>Current Location: ${location.name}</p>
                          ${status}
                          <p>First Appearance: ${getFirstEpisode.name}, ${getFirstEpisode.episode} </p>
                          <p>Aired: ${getFirstEpisode.air_date}</p>
                          <p>Last Appearance: ${getLastEpisode.name}, ${getLastEpisode.episode}</p>
                          <p>Aired: ${getLastEpisode.air_date}</p>

                          </div>`;
}

callApiCharacters(finalUrl, characterContainer);

