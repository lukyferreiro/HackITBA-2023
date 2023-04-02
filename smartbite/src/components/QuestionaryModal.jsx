
import {useForm} from "react-hook-form";
import data from '../store/data';
import { useNavigate } from 'react-router-dom';
import CheckboxGroup from './CheckboxGroup';


export default function QuestionaryModal() {
    
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm({criteriaMode: "all"})
    
    const onSubmit = handleSubmit((data) => {
        console.log(data)
        navigate("/completado", {state: {data}, replace: true})
    })

    return (
        <div className="container-fluid mt-auto d-flex flex-column justify-content-center align-items-center font-weight-bold">
            <form id="planForm" acceptCharset="utf-8"
                  onSubmit={onSubmit} method="post">
                {data.map((item) => (
                    <div className="my-3">
                        <h4 className="text-center">
                            {item.question}
                        </h4>

                        <div>
                            {item.free ? 
                                <input type="text" className="form-control"
                                    {...register(item.id, {
                                        required: true,
                                    })}/>
                                :
                                    <select className="form-select" required
                                    {...register(item.id, {required: true})}>
                                        {item.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>                     
                            }
                        </div>
                    </div>
                ))}

                <div className="p-0 mt-3 mb-0 d-flex justify-content-around">
                    <button className="btn btn-submit-form px-3 py-2" id="planFormBtn"
                            form="planForm" type="submit">
                        Obtener plan
                    </button>
                </div>
            </form>

        </div>
    )
}