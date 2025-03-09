const searchBtn = document.getElementById("search-button");
const userInput = document.getElementById("search-input");
const pokemonCont = document.getElementById("pokemon-container");
const pokemonApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const getPokemon = async () => {
    try {
        const res = await fetch(pokemonApi);
        const data = await res.json();
        const {results} = data;
        const pokemonToSearch = userInput.value.toLowerCase();
        userInput.value = "";
        console.log(results);
        let pokemonFound = false; 
        let pokemonUrl = "";
        
        results.forEach(({id,name,url}) => {
            if (pokemonToSearch == name || pokemonToSearch == id) {
                pokemonFound = true;
                pokemonUrl = url;
                return;
            }
        });
        if (!pokemonFound) {
            alert("Pokémon not found");
        } else {
            console.log("found");
            fetch(pokemonUrl)
                .then((res) => res.json())
                .then((data) => {
                    updateStats(data);
                })
                .catch((err) => console.log(`Data Error: ${err}`));
        }
        console.log(results);

    } catch (err) {
        console.log(`Caught Error: ${err}`);
    }
};

const updateStats = (data) => {
    console.log(data);
    const {base_experience, height,id,name,order,sprites,stats,types,weight} = data;
    const {base_stat, effort, stat} = stats;
    console.log("Stats:", stats);
    
    const pName = document.getElementById("pokemon-name");
    const pId = document.getElementById("pokemon-id");
    const pWeight = document.getElementById("weight");
    const pHeight = document.getElementById("height");


    const hp = document.getElementById("hp");
    const attack = document.getElementById("attack");
    const defense = document.getElementById("defense");
    const spAttack = document.getElementById("special-attack");
    const spDefense = document.getElementById("special-defense");
    const speed = document.getElementById("speed");
    const pTypes = document.getElementById("types");

    pName.textContent = name.toUpperCase();
    pId.textContent = `#${id}`;
    pWeight.textContent = `Weight: ${weight}`;
    pHeight.textContent = `Height: ${height}`;

    pTypes.innerHTML = "";
    console.log(`These are the types:`, types);
    types.forEach((el) => {
        const span = document.createElement("span");
        span.textContent = el.type.name.toUpperCase();
        pTypes.appendChild(span);
    });

    hp.textContent = stats[0].base_stat;
    attack.textContent = stats[1].base_stat;
    defense.textContent = stats[2].base_stat;
    spAttack.textContent = stats[3].base_stat;
    spDefense.textContent = stats[4].base_stat;
    speed.textContent = stats[5].base_stat;

    const {front_default} = sprites;
    const img = document.createElement(`img`);
    img.id = "sprite";
    img.src = front_default;
    pokemonCont.removeChild(pokemonCont.lastChild);
    pokemonCont.appendChild(img);

};

searchBtn.addEventListener("click", getPokemon);