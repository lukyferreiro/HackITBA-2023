import React from "react";
import {Link} from 'react-router-dom'
export default function Navbar() {


    return (
        <div className="navbar container-fluid p-0 d-flex flex-column">
            <div className="container-fluid px-2 pt-2 d-flex">
                <Link to="/" className="logo d-flex">
                    <img className="logo-img" src={'./images/Logo.png'} alt="Logo"/>
                    <span className="logo-text align-self-center text-uppercase font-weight-bold">
                        SmartBite
                    </span>
                </Link>
                <div className="container-navbar-buttons d-flex justify-content-between align-items-center">
                    Bienvenido carlos
                </div>
            </div>
        </div>

    )

}