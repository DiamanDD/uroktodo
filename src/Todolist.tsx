import React, {useState} from "react";
import {Button} from "./Components/Button";
import {Input} from "./Components/Input";
import {PropsType} from "./App"




export type stateAffairType={
    name:"All"|"Active"|"Completed"
}

export function Todolist(props: PropsType) {
    let {title,tasks,addInputValue,removeTascks,stateHandler}=props
    return <div>


        <h3>{title}</h3>
        <div>
            <Input onclickHHH={addInputValue}/>

        </div>
        <ul>
            {

                tasks.map(t => <li key={t.id}>
                    <Button onClick={() => removeTascks(t.id)}/>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>

                </li>)
            }
        </ul>
        <div>

            <button onClick={() => stateHandler("All")}>
                All
            </button>
            <button onClick={() => stateHandler("Active")}>
                Active
            </button>
            <button  onClick={() => stateHandler("Completed")}>
                Completed
            </button>
        </div>
    </div>
}
