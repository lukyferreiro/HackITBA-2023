import {useEffect} from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { fetchData, fetchImg } from "../api/ApiCall"
import CardRecipeInfo from '../components/CardRecipeInfo'
import recipeList from "../store/recipes"
import image from "../img/background.png"; 

export default function RecetasRapidas() {

    const location = useLocation()
    const {data} = location.state

    const [recipe,setRecipe]=useState([])
    const fastRecipePrompt=`Generar instrucciones detalladas para preparar un plato con una lista de ingredientes dada. El plato debe contener con algunos de los ingredientes proporcionados. Las instrucciones deben ser detalladas y fáciles de seguir, y no deben incluir instrucciones sobre precalentar el horno. Si el plato requiere hornear algún ingrediente, incluir la temperatura en grados Celsius.
        La respuesta solo sera un archivo json llamado comida que tendra dentro dos objetos, uno llamado instrucciones que es un array de strings con las instrucciones paso a paso, y el otro llamado nombre con el nombre del plato
    Por favor ingresa una lista de ingredientes separados por comas:[lista de ingredientes]`
    const photoPrompt=`Genera una foto realista de un plato de [food],buena iluminacion,jugoso`

    //TODO hacer que tambien reciba data.cantRecipes
    const previous=[]
    const getFastRecipe = (ingredientsList)=>{
        const customRecipe=fastRecipePrompt.replace('[lista de ingredientes]',ingredientsList)
        fetchData(customRecipe)
        .then(data=>{
            const message=data.choices[0].message.content
            const start = message.indexOf('{');
            const end = message.lastIndexOf('}');

            // Extract the substring between these positions
            const jsonStr = message.substring(start, end + 1);

            // Parse the JSON string into an object
            const array=JSON.parse(jsonStr);
            setRecipe(prevRecipe => [...prevRecipe, array.instrucciones]);
            setRecipe(prevRecipe => [...prevRecipe, array.nombre]);
            const customFood=photoPrompt.replace('[food]',array.nombre)
                fetchImg(customFood)
                .then(data=>{
                    setRecipe(prevRecipe => [...prevRecipe, data.data[0].url])}) 
            console.log(recipe[0])     
        })
    }

   


    useEffect(() => {
        getFastRecipe(data.ingredientes)
        
      
    }, [])

    return (
        <div style={{
            backgroundImage:`url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flex: "1",
            overflowY: "auto"
        }}>
            <div className="m-2 d-flex flex-wrap justify-content-center">
                {recipe.length>0 &&(
                    <CardRecipeInfo recipe={recipe}  />
                )}
            </div>
        </div>
    )

}