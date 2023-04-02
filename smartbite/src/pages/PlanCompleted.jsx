import { useLocation } from "react-router-dom"
import CardRecipe from "../components/CardRecipe"
import { fetchData, fetchImg } from "../api/ApiCall"
import { useState } from "react"
import recipeList from "../store/recipes"
import ModalListIngredients from "../components/ModalListIngredients"
import image from "../img/background.png"; 
import { useEffect } from "react"

export default function PlanCompleted() {

    const location = useLocation()
    const {data} = location.state
    const isOpenModalPrice = useState(false);

    const [comidas, setComidas] = useState([])
    const [compras,setCompras]=useState([])
    const[gotPlans,isGotPlans]=useState(false)
    const [change,isChange]=useState(true)
    useEffect(() => {
        if(!gotPlans)
            getMealPlan('mani','vegan')
        
    }, [],compras);

    useEffect(()=>{
        if (comidas)
            comidas.forEach(comida => {
            let customFood=photoPrompt.replace('[food]',comida.nombre)
            // fetchImg(customFood).then(
            //     data => {
            //         comida.url=data.data[0].url
            //         console.log(comida.url)
            //     })
        });
    },[change])
      
    const photoPrompt=`Genera una foto realista de un plato de [food],buena iluminacion,jugoso`
    const mealPlanPrompt=`Generar planes de cenas deliciosos y bajos en calorias para personas con sobrepeso que quieren reducir peso.\n\n    \n  Generar un plan de cenas para 7 días, incluyendo una variedad de comidas deliciosas, jugosas y bajas en calorías. Evitar sugerir comidas que el usuario no ha disfrutado en el pasado. El plan de comidas debe ser diverso, incluir múltiples grupos alimentarios y proporcionar al usuario una dieta equilibrada.\n  \n  Si alguna de las comidas es seca, como una ensalada, arroz o quinoa se incluirá en el nombre de la comida una salsa o aderezo delicioso.\n  \n  La respuesta solo sera un objeto json  con dos objetos dentro, uno llamado comida que contiene una lista de comidas, cada una con un atributo \"nombre\", un atributo \"tiempo\" que indica el tiempo aproximado que tomara preparar la comida en minutos , un atributo "dia" que indica para que dia de la semana esta pensado ese plato, del 1 al 7 y un atributo url vacio. El otro objeto se llamara compras y tendra un arreglo con ingredientes necesarios para las comidas sugeridas. Cada ingrediente tendra un atributo llamado "nombre" otro llamado "unidad" con gramos,mililitros,unidades,etc y otro atributo llamado cantidad`
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
            const array=(JSON.parse(jsonStr));
            setComidas(array.comida)
            setCompras(array.compras)
            console.log(array.compras)
            isChange(!change)
            isGotPlans(true)
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
            const obj=JSON.parse(jsonStr)
            setComidas(obj.comida)
        })
    }

    // function removeRecipe(removedRecipe) {
    //     setRecipes({recipes: recipes.filter(function(reciepe) { 
    //         return reciepe !== removedRecipe
    //     })});
    // }


    // function alterRecipe(removedRecipe,index){
        
    //     removeRecipe(removedRecipe)
    //     const newRecipe = modifyMealPlan(data,index,recipes)
    //     console.log( "Nueva receta: ")
    //     console.log(newRecipe)
    //     setRecipes(previousState => ({
    //         recipes: [...previousState.recipes, newRecipe]
    //     }))
    // }
         
    return (
        <div style={{
            backgroundImage:`url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flex: "1",
            overflowY: "auto"
        }}>
            <div className="d-flex justify-content-end mx-2">
                {comidas && comidas.length>0 &&(
                <button type="button" className="btn button-primary"
                        onClick={() => {isOpenModalPrice[1](true)}}>
                    Generar lista de ingredientes 
                </button>)}
            </div>
            <div className="m-5 d-flex flex-wrap justify-content-center">
                
                {comidas && comidas.length>0 &&(
                comidas.map((recipe) => (
                    <CardRecipe recipe={recipe} key={recipe.dia} />
                )))}
                {comidas && comidas.length>0 &&(
                    <ModalListIngredients isOpen={isOpenModalPrice} compras={compras}/>
                )}
            </div>
            
        </div>
        
    )

}