import Modal from "react-modal";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchData } from "../api/ApiCall";

export default function ModalRecipe(props) {
    
    return (
        <Modal appElement={document.getElementById('root')} style={{overlay: {zIndex: 100}}}
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
                                {props.ingredientes&&
                                (props.ingredientes.map((ingrediente) => (
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
                                {props.pasos &&(
                                props.pasos.map((paso) => (
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