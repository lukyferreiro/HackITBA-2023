import { useLocation } from "react-router-dom"
import CardRecipe from "../components/CardRecipe"
import { fetchData } from "../ApiCall"

export default function PlanCompleted() {

    const location = useLocation()
    const {data} = location.state
    //const recipeList = getRecipe(data)

    const mealPlanPrompt=`Generar planes de cenas deliciosos y bajos en calorías para personas con sobrepeso que quieren reducir peso, basados en sus preferencias.\n\n  Preferencias del usuario:\n\n  - Desagrados: [desagrados]\n  - Comidas previamente desaprobadas:\n  \n  Generar un plan de cenas para 7 días, incluyendo una variedad de comidas deliciosas, jugosas y bajas en calorías. Evitar sugerir comidas que el usuario no ha disfrutado en el pasado. El plan de comidas debe ser diverso, incluir múltiples grupos alimentarios y proporcionar al usuario una dieta equilibrada.\n  \n  Si alguna de las comidas es seca, como una ensalada o arroz, se incluirá en el nombre de la comida una salsa o aderezo delicioso.\n  \n  El resultado se devolverá como un objeto JSON llamado comida que contiene una lista de comidas, cada una con un atributo \"nombre\" y un atributo \"tiempo\" que indica el tiempo aproximado que tomará preparar la comida en minutos.`
    const getMealPlan=(preferences)=>{
        const customMealPlan=mealPlanPrompt.replace('[desagrados]',preferences)
        fetchData(customMealPlan)
        
    }

    const recipeList = [ {
            nombre: "Ensalada César con pollo a la parrilla",
            tiempo: 25,
            url: "https://www.clarin.com/img/2022/11/02/1z9K1zAwJ_360x240__1.jpg"
        },
        {
            nombre: "Salmón a la parrilla con verduras asadas",
            tiempo: 30,
            url: "https://www.clarin.com/img/2022/11/02/1z9K1zAwJ_360x240__1.jpg"
        },
        {
            nombre: "Tacos de camarones con salsa de aguacate",
            tiempo: 25,
            url: "https://www.clarin.com/img/2022/11/02/1z9K1zAwJ_360x240__1.jpg"
        },
        {
            nombre: "Chuletas de cerdo a la parrilla con ensalada de col",
            tiempo: 25,
            url: "https://www.clarin.com/img/2022/11/02/1z9K1zAwJ_360x240__1.jpg"
        },
        {
            nombre: "Pollo al curry con arroz integral",
            tiempo: 35,
            url: "https://www.clarin.com/img/2022/11/02/1z9K1zAwJ_360x240__1.jpg"
        },
        {
            nombre: "Sopa de lentejas con vegetales mixtos",
            tiempo: 35,
            url: "https://www.clarin.com/img/2022/11/02/1z9K1zAwJ_360x240__1.jpg"
        },
        {
            nombre: "Ensalada de pollo y aguacate con aderezo de cilantro y lima",
            tiempo: 20,
            url: "https://www.clarin.com/img/2022/11/02/1z9K1zAwJ_360x240__1.jpg"
        }    
    ]
    
            
    return (
        <div>
            <div className="m-5 d-flex flex-wrap justify-content-center">
                {recipeList.map((recipe) => (
                    <CardRecipe recipe={recipe}/>
                ))}
            </div>
        </div>
        
    )

}