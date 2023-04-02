import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

export default function CardRecipeInfo(props) {

    return (
        <>
            <div className="card card-receipe-info mx-3 my-2 p-0">
                <div className="card-link h-100 d-flex flex-column">
                    <div>
                        <img className={`card-img-top-info container-fluid p-0 mw-100`} 
                            alt={`Imagen ${props.recipe[1]}`}src={props.recipe[2]}/>

                        <div className="card-body container-fluid p-2">
                            <div className="text-center">
                                <h5 className="card-title container-fluid p-0" style={{fontSize: "x-large", fontWeight: "600"}} >
                                    {props.recipe[1]}
                                </h5>
                            </div>

                            <div className="text-center">
                                <h5 className="text-center" style={{fontSize: "larger", textDecoration:"underline"}}>
                                    Pasos
                                </h5>
                                <div className=" d-flex justify-content-center">
                                    <ul className="d-flex flex-column justify-content-start">
                                        {props.recipe &&(
                                        props.recipe[0].map((paso) => (
                                            <li className='text-start' style={{fontSize: "small"}}>
                                                {paso}
                                            </li>)
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}