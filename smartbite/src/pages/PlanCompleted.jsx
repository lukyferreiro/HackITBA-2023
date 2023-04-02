import { useLocation } from "react-router-dom"
import CardRecipe from "../components/CardRecipe"
import { fetchData,fetchImg } from "../ApiCall"
import { useEffect, useState } from "react"

export default function PlanCompleted() {

    const location = useLocation()
    const {data} =location.state
    //const recipeList = getRecipe(data)
    const [comidas, setComidas] = useState([])
    const[gotPlans,isGotPlans]=useState(false)
    const [change,isChange]=useState(true)
    const photoPrompt=`Genera una foto realista de un plato de [food],buena iluminacion,jugoso`
    const mealPlanPrompt=`Generar planes de cenas deliciosos y bajos en calorias para personas con sobrepeso que quieren reducir peso.\n\n  Preferencias del usuario:\n\n  - Desagrados: [desagrados]\n    \n  Generar un plan de cenas para 7 días, incluyendo una variedad de comidas deliciosas, jugosas y bajas en calorías. Evitar sugerir comidas que el usuario no ha disfrutado en el pasado. El plan de comidas debe ser diverso, incluir múltiples grupos alimentarios y proporcionar al usuario una dieta equilibrada.\n  \n  Si alguna de las comidas es seca, como una ensalada, arroz o quinoa se incluirá en el nombre de la comida una salsa o aderezo delicioso.\n  \n  El resultado se devolverá como un objeto JSON llamado comida que contiene una lista de comidas, cada una con un atributo \"nombre\", un atributo \"tiempo\" que indica el tiempo aproximado que tomara preparar la comida en minutos , un atributo "dia" que indica para que dia de la semana esta pensado ese plato, del 1 al 7 y un atributo url vacio.`
    const modifyPlanPrompt=`Modificar plan de comidas:

    Plan de comidas actual:[plan de comidas]
    
    Dia: [dia]
    
    Preferencias  para la comida a reemplazar:
    
    Desagrados: [desagrados]
    La nueva comida se generara basada en las preferencias y alergias ingresadas y sera distinta a las otras comidas en el plan, y reemplazara la comida anterior en el plan de comidas. El resultado se devolvera como un objeto JSON que contiene una lista de comidas, cada una con un atributo "nombre", un atributo "tiempo" que indica el tiempo aproximado que tomara preparar la comida en minutos y un atributo "dia" que indica el numero del dia de la semana en el que se comera el plato ese plato`
    const vegyPrompt=`vegetarianas y`
    const getMealPlan=(preferences,vegy)=>{
        var customMealPlan=mealPlanPrompt.replace('[desagrados]',' ')
        customMealPlan=customMealPlan.replace('[vegetarian]',' ')
        fetchData(customMealPlan)
        .then(data=>{
            const message=data.choices[0].message.content
            const start = message.indexOf('{');
            const end = message.lastIndexOf('}');

            // Extract the substring between these positions
            const jsonStr = message.substring(start, end + 1);

            // Parse the JSON string into an object
            const array=JSON.parse(jsonStr)
            setComidas(array.comida)
            isChange(!change)
            isGotPlans(true)
        })
        .
        catch(e=>{
            console.log(e)
        })
        
    }

    const modifyMealPlan=(preferences,day,currentPlan)=>{
        var customMealPlan=mealPlanPrompt.replace('[desagrados]',preferences)
        customMealPlan=mealPlanPrompt.replace('[dia]',day)
        customMealPlan=mealPlanPrompt.replace('[plan de comidas]',currentPlan)
        fetchData(customMealPlan)
        .then(data=>{
            const message=data.choices[0].message.content
            const start = message.indexOf('{');
            const end = message.lastIndexOf('}');

            // Extract the substring between these positions
            const jsonStr = message.substring(start, end + 1);

            // Parse the JSON string into an object
            const obj=JSON.parse(jsonStr)
            setComidas(obj.comida)
        }).
        catch(e=>{
            console.log(e)
        })
    }
    useEffect(() => {
        if(!gotPlans)
            getMealPlan('mani','vegan')
        
      }, []);

    useEffect(()=>{
        if (comidas)
            comidas.forEach(comida => {
            let customFood=photoPrompt.replace('[food]',comida.nombre)
            // fetchImg(customFood).then(
            //     data => {
            //         comida.url=data.data[0].url
            //         console.log(comida.url)
            //     })
        });
    },[change])
    
    
            
    return (
        <div>
            <div className="m-5 d-flex flex-wrap justify-content-center">
                {comidas.length>0 &&(
                    comidas.map(comida => (
                        <CardRecipe recipe={comida} key={comida.dia} />
                    ))
                )}
                
            </div>
        </div>
        
    )

}