const express = require('express'); 
const app = express(); 
const PORT = 8080;

app.use(express.json())

let recipes = [
    { id: 2, recipeName: "Sinigang", ratings: "4.8", cuisine: "Filipino", foodType: "Soup", mainIngredient: "Pork" },
    { id: 3, recipeName: "Kare-Kare", ratings: "4.9", cuisine: "Filipino", foodType: "Viand", mainIngredient: "Beef" },
    { id: 4, recipeName: "Pancit Canton", ratings: "4.7", cuisine: "Filipino", foodType: "Noodles", mainIngredient: "Egg Noodles" },
    { id: 5, recipeName: "Lechon", ratings: "5", cuisine: "Filipino", foodType: "Viand", mainIngredient: "Pork" }
];

app.get('/recipe', (req, res) => {
    res.status(200).send({
        recipeName: 'Adobo',
        ratings: '5',
        cuisine: 'Filipino',
        foodType: 'Viand',
        mainIngredient: 'chicken'
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/recipe/:id', (req, res) =>{
    const { id } = req.params;
    const { recipeName } = req.body;
    const { ratings } = req.body;
    const { cuisine } = req.body;
    const { foodType } = req.body;
    const { mainIngredient } = req.body;

    if (!recipeName){
        res.status(418).send({ message: 'We need A Recipe Name!'})
    }

    res.send({
        Recipe: `You inserted: Name as ${recipeName} with the ratings of ${ratings} with a ${cuisine} cuisine with food type as ${foodType} that is made with ${mainIngredient}`
    })

});

app.put('/recipe/:id', (req, res) => {
    const { id } = req.params;
    const { recipeName } = req.body;
    const { ratings } = req.body;
    const { cuisine } = req.body;
    const { foodType } = req.body;
    const { mainIngredient } = req.body;

    let recipe = recipes.find(r => r.id === parseInt(id));

    if (!recipe) {
        res.status(404).send({ message: 'Recipe not found!' });
        return;
    }

    if (recipeName) recipe.recipeName = recipeName;
    if (ratings) recipe.ratings = ratings;
    if (cuisine) recipe.cuisine = cuisine;
    if (foodType) recipe.foodType = foodType;
    if (mainIngredient) recipe.mainIngredient = mainIngredient;

    res.send({
        message: 'Recipe updated successfully!',
        Recipe: recipe
    });
});

app.delete('/recipe/:id', (req, res) => {
    const { id } = req.params;

    const index = recipes.findIndex(r => r.id === parseInt(id));

    if (index === -1) {
        res.status(404).send({ message: 'Recipe not found!' });
        return;
    }

    const deletedRecipe = recipes.splice(index, 1);
    res.send({
        message: 'Recipe deleted successfully!',
        DeletedRecipe: deletedRecipe[0]
    });
});

