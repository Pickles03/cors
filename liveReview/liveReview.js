const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3000;

app.get('/characters', async (req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const characters = response.data.results;
        res.json(characters);

    } catch (err) {
        console.log(`This is the error: ${err}`);
    }
});

app.get('/characters/:name', async (req, res) => {
    const charName = req.params.name; //this .name has to be the one that is in the url (.../:name)
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${charName}`);
        const character = response.data.results;

        if(character) {
            const filterResultsChar = character.map((person) => {
                const objChar = {
                    name: person.name,
                    status: person.status,
                    species: person.species,
                    origin: person.origin.name,
                    gender: person.gender,
                    image: person.image
                }
                return objChar;
            })
            res.json(filterResultsChar);
        } else {
            res.status(404).send('Character not found');
        }
    } catch (err) {
        console.log(`This is the error: ${err}`); 
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});