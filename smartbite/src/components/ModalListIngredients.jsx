import Modal from "react-modal";
import React from "react";
import { useEffect } from "react";


export default function ModalListIngredients(props) {
        useEffect(()=>{
        console.log("COMRPAS")
        console.log(props.compras)
        },[])
    return (
        <Modal style={{overlay: {zIndex: 100}}}
               className="modal-pop-up"
               isOpen={props.isOpen[0]}
               contentLabel="PopUpListRecipes"
               onRequestClose={() => {
                    props.isOpen[1](false);
               }}
        >
            <div className="container-fluid p-0 my-auto h-auto w-100 d-flex justify-content-center align-items-center">
                <div className="row w-100 h-100 p-2 m-0 align-items-center justify-content-center">
                    <div className="col-12">
                        <h5 className="text-center subtitle">
                            Ingredientes - cantidad - unidad
                        </h5>
                        <div className=" d-flex justify-content-center">
                            <ul className="d-flex flex-column justify-content-right">
                                {props.compras !==undefined &&
                                (props.compras.map((ingrediente) => (
                                    <li style={{fontSize: "large"}}>
                                        {ingrediente.cantidad} - {ingrediente.unidad} de {ingrediente.nombre}
                                    </li>
                                )))}
                            </ul>
                        </div>
                    </div>
                        
                </div>
            </div>
        </Modal>
    );
} 