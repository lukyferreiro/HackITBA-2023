

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <div className="footer container-fluid p-0 mt-auto d-flex justify-content-center align-items-center font-weight-bold">
           SmartBite Copyright © {year} - Todos los derechos reservados
        </div>
    );
}