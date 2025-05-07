const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const PORT = 3000;

app.use(cors());

app.get('/characters', async (req, res) => {
    const url = `https://rickandmortyapi.com/api/character`;
    try {
        const response = await axios.get(url);
        res.json(response.data.results.map(character => ({
            name: character.name,
            image: character.image,
        })));
    } catch (ERROR) { 
        res.status(404).json({error: 'Character not found'});
    }
});

app.get('/characters/:name', async (req, res) => {
    const name = req.params.name;
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
    try {
        const response = await axios.get(url);
        const {name, status, species, gender, origin:{name: originName}, image} = response.data.results[0]; //i am only targeting the first element of the array -> [0], that's why the other ricks are not showing
        res.json({name, status, species, gender, origin:{name: originName}, image})
    } catch (ERROR) {
        res.status(404).json({error: 'Character not found'});
    }   
})


app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
})

//https://rickandmortyapi.com/api/character