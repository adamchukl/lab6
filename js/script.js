let collection = [];


function hatchEgg(){
    let randomID = Math.floor(Math.random() * 151) + 1;

    let apiURL = "https://pokeapi.co/api/v2/pokemon/" + randomID;

    let button = document.querySelector("#hatchButton");
    let message = document.querySelector("#message");

    button.disabled = true;
    document.querySelector("#resetButton").disabled = true;
    message.textContent = "Hatching your egg...";

    let egg = document.querySelector("#egg");
    
    egg.src = "images/egg.png";
    egg.style.display = "block";

    document.querySelector("#pokemonImage").style.display = "none";
    document.querySelector("#pokemonName").textContent = "Mystery Pokémon";
    document.querySelector("#pokemonNumber").textContent = "???";
    document.querySelector("#pokemonType").textContent = "Type: ???";

    document.querySelector("#hp").textContent = "";
    document.querySelector("#attack").textContent = "";
    document.querySelector("#defense").textContent = "";

    document.querySelector("#pokemonCard").style.backgroundColor = "#e5e0f3";

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

            egg.src = "images/eggCrack.png";

            setTimeout(() => {
                egg.style.display = "none";

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

                if (type === "fire") {
                    card.style.backgroundColor = "#ffe0cf";
                }
                else if (type === "water") {
                    card.style.backgroundColor = "#d5e8fa";
                }
                else if (type === "grass") {
                    card.style.backgroundColor = "#d5eedc";
                }
                else if (type === "electric") {
                    card.style.backgroundColor = "#fff2b8";
                }
                else if (type === "psychic") {
                    card.style.backgroundColor = "#f9d9ed";
                }
                else if (type === "ice") {
                    card.style.backgroundColor = "#d8f5f5";
                }
                else if (type === "fighting") {
                    card.style.backgroundColor = "#f4d1cd";
                }
                else if (type === "poison") {
                    card.style.backgroundColor = "#ead5f5";
                }
                else if (type === "ground") {
                    card.style.backgroundColor = "#f2e2c7";
                }
                else if (type === "flying") {
                    card.style.backgroundColor = "#e1e3fa";
                }
                else if (type === "bug") {
                    card.style.backgroundColor = "#eaf1cb";
                }
                else if (type === "rock") {
                    card.style.backgroundColor = "#e8e1cf";
                }
                else if (type === "ghost") {
                    card.style.backgroundColor = "#e0d9f0";
                }   
                else if (type === "dragon") {
                    card.style.backgroundColor = "#dcd5fa";
                }
                else if (type === "dark") {
                    card.style.backgroundColor = "#ddd8d6";
                }
                else if (type === "steel") {
                    card.style.backgroundColor = "#e2e7ec";
                }
                else if (type === "fairy") {
                    card.style.backgroundColor = "#fbe0ee";
                }
                else if (type === "normal") {
                    card.style.backgroundColor = "#eeece7";
                }
                else {
                    card.style.backgroundColor = "#e5e0f3";
                }

                button.textContent = "Hatch Another Egg";
                message.textContent = "You hatched " + name + "!";

                addToCollection(id, name, image);

                button.disabled = false;
                document.querySelector("#resetButton").disabled = false;

            }, 1000);
        })

        .catch(error => {
            console.error("Error:",error);
            message.textContent = "Something went wrong. Try again!";
            button.disabled = false;
            document.querySelector("#resetButton").disabled = false;
        });
}

function addToCollection(id, name, image) {

    let alreadyCollected = false;

    for (let i = 0; i < collection.length; i++) {
        if (collection[i] === id) {
            alreadyCollected = true;
        }
    }

    if (alreadyCollected === false) {

        collection[collection.length] = id;

        let card = `
            <div class="collectionCard">
                <img src="${image}" alt="${name}">
                <p>${name}</p>
                <p>#${id}</p>
            </div>
        `;

        document.getElementById("collection").innerHTML += card;

        document.getElementById("collectionCount").innerHTML =
            "Collected: " + collection.length + " / 151";
    }
}

function resetCollection(){
    // Clear the collection
    collection = [];

    document.getElementById("collection").innerHTML = "";
    document.getElementById("collectionCount").textContent = "Collected: 0 / 151";

    // Reset the egg image
    document.querySelector("#egg").src = "images/egg.png";
    document.querySelector("#egg").style.display = "block";

    // Hide the Pokémon image
    document.querySelector("#pokemonImage").style.display = "none";

    // Reset Pokémon information
    document.querySelector("#pokemonName").textContent = "Mystery Pokémon";
    document.querySelector("#pokemonNumber").textContent = "???";
    document.querySelector("#pokemonType").textContent = "Type: ???";

    // Reset Pokémon stats
    document.querySelector("#hp").textContent = "";
    document.querySelector("#attack").textContent = "";
    document.querySelector("#defense").textContent = "";

    // Reset background colour
    document.querySelector("#pokemonCard").style.backgroundColor = "#e5e0f3";

    // Reset Hatch Egg button
    document.querySelector("#hatchButton").textContent = "Hatch Egg";

    // Reset message
    document.querySelector("#message").textContent = "Click the button to hatch your egg!";
}