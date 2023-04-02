import ModalRecipe from "./ModalRecipe";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

export default function CardRecipe(props) {

    const isOpenModal = useState(false);

    return (
        <>
            <div className="card card-receipe mx-3 my-2 p-0">
                <div className="card-link h-100 d-flex flex-column">
                    <div>
                        <button className="cross-btn" onClick={() => props.alterRecipeFun(props.recipe,props.recipe.dia)}>
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
            <ModalRecipe isOpen={isOpenModal} recipe={props.recipe}/>
        </>
    );
}