import Modal from "react-modal";
import React from "react";
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import misConst from '../store/data';

export default function ModalPlan(props) {

    const navigate = useNavigate()
    const {register, handleSubmit}= useForm({criteriaMode: "all"})
    
    const onSubmit = handleSubmit((data) => {
        props.isOpen[1](false);
        navigate("/plan", {state: {data}, replace: true})
    })

    return (
        <Modal style={{overlay: {zIndex: 100}}}
               className="modal-pop-up-plan"
               isOpen={props.isOpen[0]}
               contentLabel="PopUpFormPlan"
               onRequestClose={() => {
                    props.isOpen[1](false);
               }}
        >
            <div className="w-100 p-2 m-0 align-items-center justify-content-center">
                <form className="d-flex flex-column justify-content-center align-items-center"
                    id="planForm" acceptCharset="utf-8" onSubmit={onSubmit} method="post">
                    {misConst.data.map((item) => (
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
        </Modal>
    );
} 