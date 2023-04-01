import {useEffect} from "react"
import { useState } from "react"
import { fetchData } from "../ApiCall"

export default function RecetasRapidas() {
    const [comidas,setComidas]=useState({})
    const fastRecipePrompt=`Generar una receta paso por paso con ingredientes especificos.

    Ingrese una lista de ingredientes: [lista de ingredientes]
    
    Generar una receta deliciosa y baja en calorias que utilice los ingredientes proporcionados. Ignorar ingredientes sin sentido o que no sirven para cocinar o no son comestibles. En la receta, no incluya instrucciones sobre precalentar el horno. En las instrucciones que indiquen hornear algun ingrediente, incluir la temperatura en grados Celsius.
    
    El resultado se devolvera como un objeto JSON que contiene un objeto "receta" con un arreglo de strings con las instrucciones.`

    const getFastRecipe=(ingredientsList)=>{
        const customRecipe=fastRecipePrompt.replace('[lista de ingredientes]',ingredientsList)
        fetchData(customRecipe)
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
    useEffect(() => {
        
    }, [])

    return (
        <div className="m-5 d-flex justify-content-around align-items-stretch">
            
            
        </div>
    )

}