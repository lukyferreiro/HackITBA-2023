import ModalRecipe from "./ModalRecipe";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { fetchData } from "../api/ApiCall";

export default function CardRecipe(props) {
    const [ingredientes,setIngredientes]=useState([])
    const [receta,setReceta]=useState([])
    const [gotReceta,setGotReceta]=useState(false)
    const recetaPrompt=`Generar una receta detallada y una lista de ingredientes para una comida específica.

    Ingresa el nombre de la comida: [nombre de la comida] 
    
    Devuelve un objeto JSON que contenga:
    - Un arreglo de strings "receta" que contenga las instrucciones detalladas para cocinar la comida paso a paso, excluyendo cualquier instrucción relacionada con precalentar el horno. En las instrucciónes relacionadas con hornear, incluir la temperatura necesaria.
    - Un arreglo "ingredientes" que contenga los ingredientes necesarios para la receta con estos atributos:
       - "nombre": nombre del ingrediente
       - "unidad": unidad de medida del ingrediente (unidades, gramos, mililitros)
       - "cantidad": cantidad de unidades de medida necesarios para la receta`
    useEffect(()=>{
        
        if(!gotReceta)
            getReceta(props.recipe.nombre)
    },[],[receta],[ingredientes])
    const getReceta=(nombre)=>{
        console.log("GETTING RECETA")
        let customReceta=recetaPrompt.replace('[nombre de la comida]',nombre)
        fetchData(customReceta)
        .then(data=>{
            const message=data.choices[0].message.content
            const start = message.indexOf('{');
            const end = message.lastIndexOf('}');

            // Extract the substring between these positions
            const jsonStr = message.substring(start, end + 1);
            
            // Parse the JSON string into an object
            const array=JSON.parse(jsonStr)
            

            setIngredientes(array.ingredientes)
            setReceta(array.receta)
            setGotReceta(true)
            console.log(array.ingredientes)
            console.log(array.receta)
        })
    }
    const isOpenModal = useState(false);

    return (
        <>
            <div className="card card-receipe mx-3 my-2 p-0">
                <div className="card-link h-100 d-flex flex-column">
                    <div>
                        <button className="cross-btn" onClick={() => props.alterRecipeFun(props.dia,props.comidas,"","")}>
                            <FontAwesomeIcon icon={faTimes} className="cross-icon" />
                        </button>
                        <img className={`card-img-top container-fluid p-0 mw-100`} 
                            alt={`Imagen ${props.recipe.nombre}`}src={props.recipe.url}/>

                        <div className="card-body container-fluid p-2">
                            <div className="title-link" onClick={() => {isOpenModal[1](true)}}>
                                <h5 className="card-title container-fluid p-0 text-center">
                                    {props.recipe.nombre}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalRecipe isOpen={isOpenModal} recipe={props.recipe} ingredientes={ingredientes} pasos={receta} />
        </>
    );
}