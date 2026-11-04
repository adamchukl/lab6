function hatchEgg(){
    let randomID = Math.floor(Math.random() * 151) + 1;

    let apiURL = "https://pokeapi.co/api/v2/pokemon/" + randomID;

    let button = document.querySelector("#hatchButton");
    let message = document.querySelector("#message");

    button.disabled = true;
    message.textContent = "Matching your egg...";

    fetch(apiURL)
        .then(response => {
            if (!response.ok){
                throw new Error("Failed to fetch Pokémon");
            }

            return response.json();
        })
        .then(data => {
            let name = data.name;
            let id = data.id;
            let type = data.types[0].type.name;

            let image = data.sprites.other["official-artwork"].front_default;

            let hp = data.stats[0].base_stat;
            let attack = data.stats[1].base_stat;
            let defense = data.stats[2].base_stat;

            document.querySelector("#egg").style.display = "none";

            let pokemonImage = document.querySelector("#pokemonImage");
            pokemonImage.src = image;
            pokemonImage.alt = name;
            pokemonImage.style.display = "block";

            document.querySelector("#pokemonName").textContent = name;
            document.querySelector("#pokemonType").textContent = "Type: " + type;
            document.querySelector("#pokemonNumber").textContent = "#" + id;
            document.querySelector("#hp").textContent = "HP: " + hp;
            document.querySelector("#attack").textContent = "Attack: " + attack;
            document.querySelector("#defense").textContent = "Defense: " + defense;
            
            
            let card = document.querySelector("#pokemonCard");

            if (type === "fire"){
                card.style.backgroundColor = "#ffe0cf";
            }

            button.textContent = "Hatch Another Egg";
            message.textContent = "You hatched " + name + "!";
        })

        .catch(error => {
            console.error("Error:",error);
            message.textContent = "Something went wrong. Try again!";
        })

        .finally(() => {
            button.disabled = false;
        });
}