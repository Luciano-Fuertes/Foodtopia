const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require('../db')

require('dotenv').config();

const { YOUR_API_KEY } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiData = async () => {
    const wholeThing = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`)
    const result = await wholeThing.data.results.map(item => {
        return {
            id: item.id,
            name: item.title,
            image: item.image,
            summary: item.summary,
            ingredient: item.extendedIngredients?.map(ing => {
                return {
                    name: ing.name,
                    amount: item.original,
                }
            }),
            score: item.spoonacularScore,
            healthyLevel: item.healthScore,
            cookingSteps: item.instructions,
            dietsAvailable: item.diets,
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
    try {
        await Diet.findAll()
            .then((someDiet) => {
                return res.send(someDiet);
            })
    } catch (err) { console.log(err) }
})


router.get('/recipes/:idReceta', async (req, res) => {
    const unfiltered = await allData();
    const filtered = unfiltered.filter(e => parseInt(e.id) === parseInt(req.params.idReceta))
    filtered ?
        res.status(200).send(filtered) :
        res.status(404).send('Recipe not found');
})


router.post('/recipe', async (req, res) => {
    let {
        name,
        image,
        summary,
        ingredient,
        score,
        healthyLevel,
        cookingSteps,
        dietsAvailable,
        dbRecipe,
    } = req.body

    let originalRecipe = await Recipe.create({
        name,
        image,
        summary,
        ingredient,
        score,
        healthyLevel,
        cookingSteps,
        dbRecipe,
    })

    let availableDiets = await Diet.findAll({ where: { name: dietsAvailable } })

    originalRecipe.addDiet(availableDiets)
    res.send('Succesfully created recipe')
})







module.exports = router;
