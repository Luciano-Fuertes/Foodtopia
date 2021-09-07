const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiData = async () => {
    const wholeThing = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=10&addRecipeInformation=true`)
    const result = await wholeThing.results.map(item => {
        return {
            id: item.id,
            name: item.title,
            image: item.image,
            summary: item.summary,
            ingredient: item.extendedIngredients.map(ing => {
                return {
                    name: ing.name,
                    amount: item.original,
                }
            }),
            score: item.spoonacularScore,
            healthyLevel: item.healthScore,
            cookingSteps: item.instructions,
        }
    })
    return result;
}

const dbData = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const allData = async () => {
    const apiD = await apiData();
    const dbD = await dbData();
    const totalData = apiD.concat(dbD);
    return totalData;
}

router.get('/recipes', async (req, res) => {
    const name = req.query.name;
    let allRecipes = await allData();
    if (name) {
        let recipeName = await allRecipes.filter(e =>
            e.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send('No existe esa receta')
    }
    else {
        res.status(200).send(allRecipes);
    }
})

router.get('/types', async (req, res) => {
    const dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=10&addRecipeInformation=true`);
    const allDiet = dietApi.map(e => e.diets)
    const reducedDiet = allDiet.map(e => {
        for (let i = 0; i < allDiet.length; i++) return e[i]
    })
    reducedDiet.forEach(e => {
        Diet.findOrCreate({
            where: { name: e }
        })
    })
    const completeDiet = await Diet.findAll();
    res.send(completeDiet);
})
/* 
router.get(`/recipes/${idReceta}`, (req, res) => {

})


router.post('/recipe', (req, res) => {

}) 


            

*/


module.exports = router;
