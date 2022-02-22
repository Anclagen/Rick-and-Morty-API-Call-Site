//general api call
export async function callApi(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

//general error message
export function errorMessage(container){
  container.innerHTML = `<div class="error message">
                          <p> An error occurred while fetching the data </p>
                          <p> Welp! it looks like someone really screwed the pooch on this one, Morty. </p>
                        </div>`
}