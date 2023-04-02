import Modal from "react-modal";
import React from "react";
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';


export default function ModalFastRecipes(props) {

    const navigate = useNavigate()
    const {register, handleSubmit}= useForm({criteriaMode: "all"})
    
    const onSubmit = handleSubmit((data) => {
        props.isOpen[1](false);
        navigate("/recetasRapidas", {state: {data}, replace: true})
    })

    return (
        <Modal style={{overlay: {zIndex: 100}}}
               className="modal-pop-up-fastRecipes"
               isOpen={props.isOpen[0]}
               contentLabel="PopUpFormFastRecipes"
               onRequestClose={() => {
                    props.isOpen[1](false);
               }}
        >
            <div className="container-fluid p-0 my-auto h-auto w-100 d-flex justify-content-center align-items-center">
                <div className="row w-100 h-100 p-2 m-0 align-items-center justify-content-center">
                    <form id="fastRecipesForm" acceptCharset="utf-8"onSubmit={onSubmit} method="post">
                        <div className="col-12">
                            <h2 className="text-center title">
                                Cantidad de recetas a generar
                            </h2>
                            <input type="number" min="0" max="9999999"
                                className="form-control"placeholder="0"
                                {...register("cantRecipes", {required: false})}/>
                        </div>
                        
                        <div className="col-12">
                            <h2 className="text-center title">
                                Ingredientes
                            </h2>
                            <p className="text-center">
                                Ingrese los ingredientes separados por coma, es decir, "huevo,jamon,..."
                            </p>
                            <textarea maxLength={500} className="form-control my-3" style={{maxHeight: "150px"}}
                                  {...register("ingredientes", {required: false})}/>
                        </div>

                        <div className="col-12 my-2 d-flex justify-content-around">
                            <button className="btn btn-submit-form px-3 py-2" id="fastRecipesFormBtn"
                                    form="fastRecipesForm" type="submit">
                                Crear recetas
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
} 