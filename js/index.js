// const cors = "https://noroffcors.herokuapp.com/";
const url = "https://rickandmortyapi.com/api/";
// Three resource sets available, add characters, location, and episode to end to get all info.
const characterContainer = document.querySelector(".characters");

async function callApiCharacters(url, query, container, runs) {
  const response = await fetch(url + query);
  const data = await response.json();
  console.log(data);
  createCharacterList(data, container, runs);
}

function createCharacterList(data, container, runs) {
  container.innerHTML += "";
  for(let i = 0; i < runs; i++){
    const id = data.results[i].id;
    const name = data.results[i].name;
    const image = data.results[i].image;
    const origin = data.results[i].origin;
    const species = data.results[i].species;
    const location = data.results[i].location;
    let status = "<p>Status: Unknown</p>"
    if (data.results[i].status === "Alive") {
      status = `<p>Status: <span class="alive">Alive</span></p>`
    }

    container.innerHTML += `<div class="item">
                              <a href="details.html?url=characters&id=${id}">
                                <h3>${name}</h3>
                                <img src=${image} alt="${name}" />
                              </a>
                              <p>Species: ${species}</p>
                              <p>Origin: ${origin.name}</p>
                              <p>Current Location: ${location.name}</p>
                              ${status}
                            </div>`;
  }
}

callApiCharacters(url, "character", characterContainer, 10);

//callApi(url, "location", locationContainer);
//callApi(url, "episode", episodesContainer);
