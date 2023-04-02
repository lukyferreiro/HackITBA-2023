import { useLocation } from "react-router-dom"
import CardRecipe from "../components/CardRecipe"
import { fetchData, fetchImg } from "../api/ApiCall"
import { useState } from "react"
import recipeList from "../store/recipes"
import ModalListIngredients from "../components/ModalListIngredients"
import image from "../img/background.png"; 
import { useEffect } from "react"
import misConst from "../store/data";

export default function PlanCompleted() {

    const location = useLocation()
    const {data} = location.state
    const isOpenModalPrice = useState(false);

    const [comidas, setComidas] = useState([])
    const [compras,setCompras]=useState([])
    const[gotPlans,isGotPlans]=useState(false)
    const [change,isChange]=useState(true)
    useEffect(() => {
        if(!gotPlans)
            getMealPlan('','')
        
    }, [],compras);

    useEffect(()=>{
        if (comidas)
            comidas.forEach(comida => {
            let customFood=photoPrompt.replace('[food]',comida.nombre)
              fetchImg(customFood).then(
                  data => {
                      comida.url=data.data[0].url
                  
                  })
        });
    },[change])
      
    const photoPrompt=`Genera una foto realista de un plato de [food],buena iluminacion,jugoso`
    const mealPlanPrompt=`Generar planes de cenas deliciosos y bajos en calorias para personas con sobrepeso que quieren reducir peso.\n\n    \n  Generar un plan de cenas para 3 días, incluyendo una variedad de comidas deliciosas, jugosas y bajas en calorías. Evitar sugerir comidas que el usuario no ha disfrutado en el pasado o que contengan los siguientes ingredientes:[no ingredientes]. El plan de comidas debe ser diverso, incluir múltiples grupos alimentarios y proporcionar al usuario una dieta equilibrada [estilo de vida].\n  \n  Si alguna de las comidas es seca, como una ensalada, arroz o quinoa se incluirá en el nombre de la comida una salsa o aderezo delicioso.\n  \n  La respuesta solo sera un objeto json  con dos objetos dentro, un arreglo llamado comida que contiene una lista de comidas, 3 en total, cada una con un atributo \"nombre\", un atributo \"tiempo\" que indica el tiempo aproximado que tomara preparar la comida en minutos , un atributo 'dia' que indica para que dia de la semana esta pensado ese plato, del 1 al 3 y un atributo url vacio. El otro objeto se llamara compras y tendra un arreglo con ingredientes necesarios para las comidas sugeridas. Cada ingrediente tendra un atributo llamado 'nombre' otro llamado 'unidad' con gramos,mililitros,unidades,etc y otro atributo llamado cantidad y que no se escriba nada hasta que se termine de mandar los JSON`
    const modifyPlanPrompt=`Modificar plan de comidas:  Plan de comidas actual:[plande comida].Dia: [dia].La nueva comida sera distinta a las otras comidas en el plan.Teniendo en cuenta que la nueva comida no puede contener:[no ingredientes] [estilo de vida].El resultado se devolvera como un objeto JSON que contiene la nueva comida con un atributo 'nombre', un atributo 'tiempo' que indica el tiempo aproximado que tomara preparar la comida en minutos, un atributo 'dia' que sera igual al del objeto remplazado y un objeto url vacio. Se devolvera unicamente la nueva comida y no el plan entero y que no se escriba nada hasta que se termine de mandar los JSON`
    const getMealPlan=(preferences,lifestyle)=>{
        var customMealPlan=mealPlanPrompt.replace('[no ingredientes]',preferences)
        if(lifestyle!=="")
        customMealPlan=mealPlanPrompt.replace('[estilo de vida]','y '+lifestyle)
        fetchData(customMealPlan)
        .then(data=>{
            const message=data.choices[0].message.content
            const start = message.indexOf('{');
            const end = message.lastIndexOf('}');

            // Extract the substring between these positions
            const jsonStr = message.substring(start, end + 1);

            // Parse the JSON string into an object
            const array=(JSON.parse(jsonStr));
            setComidas(array.comida)
            setCompras(array.compras)
            isChange(!change)
            isGotPlans(true)
            console.log(array)
        })
        
    }
    
    const modifyMealPlan=(day,currentPlan,preferences,lifestyle)=>{
        var customMealPlan=modifyPlanPrompt.replace('[dia]',day)
        customMealPlan=customMealPlan.replace('[plan de comida]',JSON.stringify(currentPlan))
        customMealPlan=customMealPlan.replace('[no ingredientes]',preferences)
        customMealPlan=customMealPlan.replace('[estilo de vida]',lifestyle===""?"":"y debe ser "+lifestyle)
        fetchData(customMealPlan)
        .then(data=>{
            const message=data.choices[0].message.content
            const start = message.indexOf('{');
            const end = message.lastIndexOf('}');

            // Extract the substring between these positions
            const jsonStr = message.substring(start, end + 1);

            // Parse the JSON string into an object
            const obj=JSON.parse(jsonStr)
            console.log(obj)
            let comidasCopy=JSON.parse(JSON.stringify(comidas))
            comidasCopy[day-1]=obj

            const newPhoto=photoPrompt.replace('[food]',obj.nombre)
            fetchImg(newPhoto).then(
                 data => {
                     comidasCopy[day-1].url=data.data[0].url
                    setComidas(comidasCopy)
                  
            })
        })
    }
         
    return (
        <div style={{
            backgroundImage:`url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flex: "1",
            overflowY: "auto"
        }}>
            <div className="d-flex justify-content-end p-4">
                <button type="button" className="btn button-primary"
                        onClick={() => {isOpenModalPrice[1](true)}}>
                    Generar lista de ingredientes 
                </button>
            </div>
            <div className="m-5 d-flex flex-wrap justify-content-center">
                
                {
                comidas.map((recipe,index) => (
                    <div className="d-flex justify content-center">
                        <h2 className="text-center">
                            {misConst.days_equiv[index].day}
                        </h2> 
                        <CardRecipe recipe={recipe} key={recipe.dia} />
                    </div>
                    
                ))}
                
                    <ModalListIngredients isOpen={isOpenModalPrice} compras={compras}/>
                
            </div>
            
        </div>
        
    )

}