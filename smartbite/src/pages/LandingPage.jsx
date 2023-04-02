import {Link} from 'react-router-dom'
import { useState } from "react";
import ModalFastRecipes from "../components/ModalFastRecipes";

export default function LandingPage() {

<<<<<<< HEAD
    const isOpenModal = useState(false);
=======
    
>>>>>>> 17bd26f775c8237a2dbc26b7b6685b674434fbb8

    return (
        <div className="m-5 d-flex justify-content-around align-items-stretch">
            <div className="m-5 p-5 d-flex flex-column justify-content-center text-center" style={{flex: "1"}}>
                <div className="d-flex justify-content-center align-content-center">
                    <h2 style={{fontWeight: "600", textDecoration: "underline"}}>
                        Crea un plan alimenticio adaptado a vos
                    </h2>
                </div>
                <div>
                    Responde un simple cuestionario y nosotros generamos un plan para tus tiempos, gustos y necesidades. Podes pedir un plan de 7 dias, 15 dias o un mes
                </div>
                <div className="mt-5 d-flex justify-content-center">
                    <Link to="/plan">
                        <button type="button" className="btn button-primary">
                            Crear plan
                        </button>
                    </Link>
                </div>
            </div>

            <div className="m-5 p-5 d-flex flex-column justify-content-center text-center" style={{flex: "1"}}>
                <div className="d-flex justify-content-center align-content-center">
                    <h2 style={{fontWeight: "600", textDecoration: "underline"}}>
                        Crea una receta con lo que tenes en la heladera
                    </h2>
                </div>
                <div>
                    Sabemos que a veces pensar una comida con los elementos disponibles puede ser complicado. Por eso si nos detallas que tenes en la heladera generamos una receta para vos, se acabo la perdida de tiempo
                </div>
                <div className="mt-5 d-flex justify-content-center">
                    <button type="button" className="btn button-primary"
                            onClick={() => {isOpenModal[1](true)}}>
                        Obtener receta
                    </button>
                </div>
            </div>

            <ModalFastRecipes isOpen={isOpenModal}/>

        </div>
    )

}