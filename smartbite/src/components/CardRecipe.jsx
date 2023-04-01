

export default function CardRecipe(props) {

    return (
        <div className="card card-receipe mx-3 my-2 p-0">
            <div className="card-link h-100 d-flex flex-column">
                <div>
                    <img className={`card-img-top container-fluid p-0 mw-100`} 
                        alt={`Imagen ${props.recipe.nombre}`}src={props.recipe.url}/>

                    <div className="card-body container-fluid p-2">
                        <div className="title-link">
                            <h5 className="receipe card-title container-fluid p-0 text-center">
                                {props.recipe.nombre}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}