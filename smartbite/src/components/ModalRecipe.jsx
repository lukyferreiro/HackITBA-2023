import Modal from "react-modal";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchData } from "../api/ApiCall";

export default function ModalRecipe(props) {
    const [ingredientes,setIngredientes]=useState([])
    const [receta,setReceta]=useState([])
    const [gotReceta,setGotReceta]=useState([])
    const recetaPrompt=`Generar una receta detallada y una lista de ingredientes para una comida específica.

    Ingresa el nombre de la comida: [nombre de la comida] 
    
    Devuelve un objeto JSON que contenga:
    - Un arreglo de strings "receta" que contenga las instrucciones detalladas para cocinar la comida paso a paso, excluyendo cualquier instrucción relacionada con precalentar el horno. En las instrucciónes relacionadas con hornear, incluir la temperatura necesaria.
    - Un arreglo "ingredientes" que contenga los ingredientes necesarios para la receta, cada uno con los siguientes atributos:
       - "nombre": nombre del ingrediente
       - "unidad": unidad de medida del ingrediente (unidades, gramos, mililitros)
       - "cantidad": cantidad de unidades de medida necesarios para la receta`
    useEffect(()=>{
        if(!gotReceta)
            getReceta(props.recipe.nombre)
    },[])
    const getReceta=(nombre)=>{
        let customReceta=recetaPrompt.replace('[nombre de la comida]',nombre)
        // fetchData(customReceta)
        // .then(data=>{
        //     const message=data.choices[0].message.content
        //     const start = message.indexOf('{');
        //     const end = message.lastIndexOf('}');

        //     // Extract the substring between these positions
        //     const jsonStr = message.substring(start, end + 1);
            
        //     // Parse the JSON string into an object
        //     const array=JSON.parse(jsonStr)
        //     console.log(array)
        //     console.log(ingredientes)
        //     console.log(receta)

        //     setIngredientes(array.ingredientes)
        //     setReceta(array.receta)
        //     setGotReceta(true)
        // })
    }
    return (
        <Modal style={{overlay: {zIndex: 100}}}
               className="modal-pop-up"
               isOpen={props.isOpen[0]}
               contentLabel="PopUpRecipe"
               onRequestClose={() => {
                    props.isOpen[1](false);
               }}
        >
            <div className="container-fluid p-0 my-auto h-auto w-100 d-flex justify-content-center align-items-center">
                <div className="row w-100 h-100 p-2 m-0 align-items-center justify-content-center">
                    <div className="col-12">
                        <img className={`img-modal d-flex justify-self-center container-fluid p-0`} src={props.recipe.url}
                            alt={`Imagen ${props.recipe.nombre}`} />
                    </div>
                    
                    <div className="col-12">
                        <h2 className="text-center title">
                            {props.recipe.nombre}
                        </h2>
                    </div>

                    <div className="col-12 text-center">
                        <span className="subtitle">
                            Tiempo de preparacion: 
                        </span>
                        <span style={{fontSize: "x-large"}}>
                             {props.recipe.tiempo} minutos
                        </span>
                    </div>

                    <div className="col-12">
                        <h5 className="text-center subtitle">
                            Ingredientes
                        </h5>
                        <div className=" d-flex justify-content-center">
                            <ul className="d-flex flex-column justify-content-right">
                                {ingredientes&&
                                (ingredientes.map((ingrediente) => (
                                    <li style={{fontSize: "large"}}>
                                        {ingrediente.nombre} {ingrediente.cantidad} {ingrediente.unidad}
                                    </li>)
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-12">
                        <h5 className="text-center subtitle">
                            Pasos
                        </h5>
                        <div className=" d-flex justify-content-center">
                            <ul className="d-flex flex-column justify-content-right">
                                {receta &&(
                                receta.map((paso) => (
                                    <li style={{fontSize: "large"}}>
                                        {paso}
                                    </li>)
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}