import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import {Button} from "./Components/Button";
import {Input} from "./Components/Input";
import {PropsType} from "./App"


export function Todolist(props: PropsType) {
    let {title, tasks, addInputValue, removeTascks, stateHandler} = props
    const onClickStateAll = () => {
        stateHandler("All")
    }
    const onClickStateActive = () => {
        stateHandler("Active")
    }
    const onClickStateCompleted = () => {
        stateHandler("Completed")
    }

    return <div>


        <h3>{title}</h3>
        <div>
            <Input onclickHHH={addInputValue}/>

        </div>
        <ul>
            {

                tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.setchangeStyatus(t.id, e.currentTarget.checked)
                    }

                    const onClickHandler = () => {

                        removeTascks(t.id)
                    }
                    return (<li key={t.id}>
                        <Button onClick={onClickHandler}/>
                        <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>

                    </li>)
                })
            }
        </ul>
        <div>

            <button className={props.fielter=="All" ? "active-filter":""} onClick={onClickStateAll}>
                All
            </button>
            <button className={props.fielter=="Active" ? "active-filter":""}onClick={onClickStateActive}>
                Active
            </button>
            <button className={props.fielter=="Completed" ? "active-filter":""}onClick={onClickStateCompleted}>
                Completed
            </button>
        </div>
    </div>
}
