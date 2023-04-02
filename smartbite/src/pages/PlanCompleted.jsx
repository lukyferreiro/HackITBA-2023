import { useLocation } from "react-router-dom"
import CardRecipe from "../components/CardRecipe"
import { fetchData, fetchImg } from "../api/ApiCall"
import { useState } from "react"
import recipeList from "../store/recipes"
import ModalListIngredients from "../components/ModalListIngredients"
import image from "../img/background.png"; 

export default function PlanCompleted() {

    const location = useLocation()
    const {data} = location.state
    const isOpenModalPrice = useState(false);

    //const recipeList = getRecipe(data)
    const [comidas, setComidas] = useState({})
    const photoPrompt=`Genera una foto realista de un plato de [food],buena iluminacion,jugoso`
    const mealPlanPrompt=`Generar planes de cenas deliciosos y bajos en calorias para personas [vegetarian] con sobrepeso que quieren reducir peso, basados en sus preferencias.\n\n  Preferencias del usuario:\n\n  - Desagrados: [desagrados]\n  - Comidas previamente desaprobadas:\n  \n  Generar un plan de cenas para 7 días, incluyendo una variedad de comidas deliciosas, jugosas y bajas en calorías. Evitar sugerir comidas que el usuario no ha disfrutado en el pasado. El plan de comidas debe ser diverso, incluir múltiples grupos alimentarios y proporcionar al usuario una dieta equilibrada.\n  \n  Si alguna de las comidas es seca, como una ensalada, arroz o quinoa se incluirá en el nombre de la comida una salsa o aderezo delicioso.\n  \n  El resultado se devolverá como un objeto JSON llamado comida que contiene una lista de comidas, cada una con un atributo \"nombre\" y un atributo \"tiempo\" que indica el tiempo aproximado que tomara preparar la comida en minutos.`
    const modifyPlanPrompt=`Modificar plan de comidas:

    Plan de comidas actual:[plan de comidas]
    
    Dia: [dia]
    
    Preferencias  para la comida a reemplazar:
    
    Desagrados: [desagrados]
    La nueva comida se generara basada en las preferencias y alergias ingresadas y sera distinta a las otras comidas en el plan, y reemplazara la comida anterior en el plan de comidas. El resultado se devolvera como un objeto JSON que contiene una lista de comidas, cada una con un atributo "nombre" y un atributo "tiempo" que indica el tiempo aproximado que tomara preparar la comida en minutos.`
    const vegyPrompt=`vegetarianas y`
    const getMealPlan=(preferences,vegy)=>{
        var customMealPlan=mealPlanPrompt.replace('[desagrados]',preferences)
        customMealPlan=mealPlanPrompt.replace('[vegetarian]',vegy+' y')
        fetchData(customMealPlan)
        .then(data=>{
            const message=data.choices[0].message.content
            const start = message.indexOf('{');
            const end = message.lastIndexOf('}');

            // Extract the substring between these positions
            const jsonStr = message.substring(start, end + 1);

            // Parse the JSON string into an object
            setComidas(JSON.parse(jsonStr));
        })
        
    }
    function getImage(food){
        const customFood=photoPrompt.replace('[food]',food)
        fetchImg(customFood)
        .then(data=>{
            return data.data[0].url})
        
    }
    const modifyMealPlan=(preferences,day,currentPlan)=>{
        var customMealPlan=mealPlanPrompt.replace('[desagrados]',preferences)
        customMealPlan=mealPlanPrompt.replace('[dia]',day)
        customMealPlan=mealPlanPrompt.replace('[plan de comidas]',currentPlan)
        fetchData(customMealPlan)
        .then(data=>{
            const message=data.choices[0].message.content
            const start = message.indexOf('{');
            const end = message.lastIndexOf('}');

            // Extract the substring between these positions
            const jsonStr = message.substring(start, end + 1);

            // Parse the JSON string into an object
            setComidas(JSON.parse(jsonStr));
        })
    }

    const [recipes, setRecipes] = useState(recipeList);

    function removeRecipe(removedRecipe) {
        setRecipes({recipes: recipes.filter(function(reciepe) { 
            return reciepe !== removedRecipe
        })});
    }


    function alterRecipe(removedRecipe,index){
        
        removeRecipe(removedRecipe)
        const newRecipe = modifyMealPlan(data,index,recipes)
        console.log( "Nueva receta: ")
        console.log(newRecipe)
        setRecipes(previousState => ({
            recipes: [...previousState.recipes, newRecipe]
        }))
    }
         
    return (
        <div style={{
            backgroundImage:`url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
        }}>
            <div className="d-flex justify-content-end mx-2">
                <button type="button" className="btn button-primary"
                        onClick={() => {isOpenModalPrice[1](true)}}>
                    Generar lista de ingredientes 
                </button>
            </div>
            <div className="m-5 d-flex flex-wrap justify-content-center">
                {recipeList.map((recipe,index) => (
                    <CardRecipe recipe={recipe} alterRecipeFun={() => alterRecipe(recipe, index)}/>
                ))}
            </div>
            <ModalListIngredients isOpen={isOpenModalPrice} compras={/*TODO *//}/>
        </div>
        
    )

}