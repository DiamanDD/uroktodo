import React, {ChangeEvent} from "react";
import {Button} from "../Button";
import {INputElement} from "../INputElement/INputElement";
import {PropsType} from "../../App"
import {EditebleSpan} from "../EditebleSpan/EditebleSpan";


export function Todolist(props: PropsType) {
    let {title, tasks, addInputValue, removeTascks, stateHandler, id} = props
    const onClickStateAll = () => {
        stateHandler("All", id)
    }
    const onClickStateActive = () => {
        stateHandler("Active", id)
    }
    const onClickStateCompleted = () => {
        stateHandler("Completed", id)
    }
    const addInputItem = (title: string) => {
        addInputValue(title, id)
    }
    const setNewTitleTask = (newTitle: string) => {
        props.setNewTitleTodolist(newTitle, id)
    }
    return <div>
        <h3><EditebleSpan title={title} setNewTitle={setNewTitleTask}/></h3>
        <div>
            <INputElement onClickHandler={addInputItem}/>
        </div>
        <ul>
            {

                tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.setchangeStyatus(t.id, e.currentTarget.checked, id)
                    }
                    const setNewTitleTask = (newTitle: string) => {
                        props.setNewTitleTask(t.id, newTitle, id)
                    }
                    const onClickHandler = () => {
                        removeTascks(t.id, id)
                    }
                    return (<li key={t.id}>
                        <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                        <EditebleSpan title={t.title} setNewTitle={setNewTitleTask}/>
                        <Button onClick={onClickHandler}/>
                    </li>)
                })
            }
        </ul>
        <div>
            <button className={props.fielter === "All" ? "active-filter" : ""} onClick={onClickStateAll}>
                All
            </button>
            <button className={props.fielter === "Active" ? "active-filter" : ""} onClick={onClickStateActive}>
                Active
            </button>
            <button className={props.fielter === "Completed" ? "active-filter" : ""} onClick={onClickStateCompleted}>
                Completed
            </button>
        </div>
    </div>
}
