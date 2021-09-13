const axios = require('axios');
const { Diet } = require('../db')

require('dotenv').config();

const { YOUR_API_KEY } = process.env;

async function dietPreload() {
    try {
        let dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);
        let allDiet = dietApi.data.results.map(e => e.diets)
        allDiet.flat().forEach(e => {
            Diet.findOrCreate({
                where: { name: e }
            })
        })
    }
    catch (err) { console.error(err); }
}


module.exports = dietPreload;