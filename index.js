//consts and variables
const searchInput = document.querySelector(".search-input");

//key listeners
document.addEventListener("DOMContentLoaded", init);
document.querySelector('.search-input').addEventListener('input', handleSearch);

function init() {
    const searchBtn = document.querySelector(".search-btn");
    searchBtn.addEventListener("click", handleSearch);
}

function handleSearch(event) {
    event.preventDefault();

    const API_KEY = "Sf2FMFg5ZDgB8uu0aboKsldCFJbmgN7h";
    const searchInput = document.querySelector(".search-input");
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
        return;
    }

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=12&q=${searchTerm}`;

    fetch(url)
        .then(handleResponse)
        .then(displayGifs)
        .catch(handleError);
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error("Network response was not ok.");
    }
    return response.json();
}

function displayGifs(data) {
    const contentContainer = document.querySelector(".content-container");
    contentContainer.innerHTML = "";

    data.data.forEach(gif => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = gif.images.downsized.url;
        img.alt = gif.title;
        figure.appendChild(img);

        const gifFigure = document.createElement("div");
        gifFigure.classList.add("content__item");
        gifFigure.appendChild(figure);

        contentContainer.appendChild(gifFigure);
    });
}

function handleError(error) {
    console.error("Error fetching data:", error);
}
