const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const section = document.querySelector("section");
let searchQuery = "";
const APP_ID = "8ad69c81";
const APP_key = "9ad5b52ebe870ab642ead60e834968e7";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=18`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits, searchQuery);
    console.log(data);
}

function generateHTML(results, searchQuery) {
    let generatedHTML = "";
    if(results.length > 0) {
        container.classList.remove("initial");
        section.classList.add("result");
        results.map((result) => {
            generatedHTML += `
          <div class="item">
            <div class="thumbBlock">
            <img src="${result.recipe.image}" alt="img">
            </div>
            <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
          </div>
          </div>
        `;
        });        
    } else {
        container.classList.add("initial");
        section.classList.remove("result");
        generatedHTML += `<div class="no-result">No receipe found for <strong>${searchQuery}</strong>!<br/>Try with another recipe</div>`;
    }

    searchResultDiv.innerHTML = generatedHTML;
}
