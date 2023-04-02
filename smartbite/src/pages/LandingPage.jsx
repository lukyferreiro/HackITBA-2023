import {Link} from 'react-router-dom'
import { useState } from "react";
import ModalFastRecipes from "../components/ModalFastRecipes";
import image from "../img/background.png"; 
import ModalPlan from '../components/ModalPlan';

export default function LandingPage() {

    const isOpenModalPlan = useState(false);
    const isOpenModalFastRecipes = useState(false);

    return (
        <div className="d-flex justify-content-around align-items-stretch" style={{
            backgroundImage:`url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flex: "1",
            overflowY: "auto"
        }}>
            <div className="m-5 p-5 d-flex flex-column justify-content-center text-center" style={{flex: "1"}}>
                <div className="d-flex justify-content-center align-content-center">
                    <h2 style={{fontWeight: "600"}}>
                        Crea un plan alimenticio adaptado a vos
                    </h2>
                </div>
                <div style={{fontSize: "large"}}>
                    Responde un simple cuestionario y nosotros generamos un plan para tus tiempos, gustos y necesidades.
                    Podes pedir un plan de 7 dias, 15 dias o un mes
                </div>
                <div className="mt-5 d-flex justify-content-center">
                    <button type="button" className="btn button-primary"
                        onClick={() => {isOpenModalPlan[1](true)}}>
                        Crear plan
                    </button>
                </div>
            </div>

            <div className="m-5 p-5 d-flex flex-column justify-content-center text-center" style={{flex: "1"}}>
                <div className="d-flex justify-content-center align-content-center">
                    <h2 style={{fontWeight: "600"}}>
                        Crea una receta con lo que tenes en la heladera
                    </h2>
                </div>
                <div style={{fontSize: "large"}}>
                    Sabemos que a veces pensar una comida con los elementos disponibles puede ser complicado.
                    Por eso si nos detallas que tenes en la heladera generamos una receta para vos, se acabo 
                    la perdida de tiempo
                </div>
                <div className="mt-5 d-flex justify-content-center">
                    <button type="button" className="btn button-primary"
                            onClick={() => {isOpenModalFastRecipes[1](true)}}>
                        Obtener receta
                    </button>
                </div>
            </div>

            <ModalPlan isOpen={isOpenModalPlan}/>
            <ModalFastRecipes isOpen={isOpenModalFastRecipes}/>

        </div>
    )

}