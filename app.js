import { colors, pokedexURL } from "./constants.js";
import { Pokedex } from "./Pokedex.js";

const pokeContainer = document.querySelector(".poke-container");
const searchInput = document.querySelector("#search-input");
const pokedex = new Pokedex(pokedexURL);



let $box = document.querySelector("#box");
let $form = document.getElementById("form");
let $btnModal = document.getElementById("btn_modal");
let $asideBtn = document.getElementById("aside_btn");
let $asideList = document.getElementById("aside_list");
let $modal = document.getElementById("modal");
let $aside = document.getElementById("aside_list");
let $heard = document.getElementById("heard");



window.addEventListener('load', loadNextPageAndRender);
document.querySelector("#load-button").addEventListener("click", loadNextPageAndRender);

// TODO: Debounce mechanism can be added.
searchInput.addEventListener("input", () => {
  pokeContainer.innerHTML = "";
  pokedex.findPokemonsByName(searchInput.value).forEach(createPokemonBox);
});

async function loadNextPageAndRender() {
  const pokemons = await pokedex.getNextPage();
  pokemons.forEach(createPokemonBox);
}


function createPokemonBox(pokemon) {
  const { name, weight } = pokemon;
  const id = pokemon.id.toString().padStart(3, "0");
  const type = pokemon.types[0].type.name

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.style.backgroundColor = colors[type];
  pokemonEl.innerHTML = buildHtmlOfPokemon(id, name, weight, type)
  pokeContainer.appendChild(pokemonEl);
}

function buildHtmlOfPokemon(id, name, weight, type) {
  return `
  <img
    class="poke-img"
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"

    alt="${name} Pokemon"
  />

  <div class="img_b_hr"></div>
  
   <div class="flex_div1">
    <div class="block_div">
      <h3 class="poke-name">${name}</h3>
      <p class="poke-id">Number: ${id}</p>
    </div>
    <button class="heard" id="heardlike" onclick="likeClick(4)">❤</button>
  </div>
  <div class="flex_div">
  <p class="poke-type">Type : ${type}</p>
  <p class="poke-weight">${weight} kg</p>
  </div>
  `
}



$btnModal.addEventListener('click', () => {
  $modal.style.transform = 'translateX(0%)'
})
$asideBtn.addEventListener('click', () => {
  $modal.style.transform = 'translateX(150%)'
})

async function likeClick(id) {
  let fech = await fechData()
  let logFech =  fech.filter(element => element.id.includes(id))
  let localSet = localStorage.setItem("users", JSON.stringify(logFech))
  let localGet = JSON.parse(localStorage.getItem("users"))
  console.log(localGet);

  let asideLI = "";
  await localGet.forEach((item) => {
    
   
      asideLI += `
      <li class="card">
      <img class="card_img" src='${item.images}' alt="sjhas" >
      <ul class="card_text">
           <li class="name_check">
              <h2>${item.name}</h2>
              <button class="heard" id="heardlike" onclick="likeClick(${item.id})"> &#x2764;</button>
           </li>
           <li>${item.type}</li>
           <li class="nums">
               <strong>${item.kg} kg</strong>
               <strong>${item.age} age</strong>
           </li>
           </ul> 
      </li>
      `;
  });
  
  likeClick();

  $asideList.innerHTML += asideLI;
}


async function renderFilms(array, element) {
  element.innerHTML = null;
  let newLi = "";

  await array.forEach((item) => {
      newLi += `
      <li class="card">
      <img class="card_img" src='${item.images}' alt="sjhas">
      <ul class="card_text">
           <li class="name_check">
              <h2>${item.name}</h2>
              <button class="heard" id="heardlike" onclick="likeClick(${item.id})"> &#x2764;</button>
           </li>
           <li>${item.type}</li>
           <li class="nums">
               <strong>${item.kg} kg</strong>
               <strong>${item.age} age</strong>
           </li>
           </ul> 
      </li>
      `;
  });
  element.innerHTML += newLi;
}

