function getCharacterInfo() {
    const characterNameInput = document.getElementById('characterName');
    const getInfoBtn = document.getElementById('getInfo');
    const characterInfo = document.getElementById('characterInfo');

    const characterName = characterNameInput.value.toLowerCase();

    fetch(`http://localhost:3000/characters/${characterName}`)
        .then(response => response.json())
        .then(data => {
            const {name, status, species, gender, origin:{name: originName}, image} = data;
            characterInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="${image}" alt="${name}">
                <p><strong>Status:</strong> ${status}</p>
                <p><strong>Species:</strong> ${species}</p>
                <p><strong>Gender:</strong> ${gender}</p>
                <p><strong>Origin:</strong> ${originName}</p>
            `;
        })
        .catch(error => {
            characterInfo.innerHTML = `<p>Error: Character not found</p>`;
        });
}