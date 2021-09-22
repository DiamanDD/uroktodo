import {TaskType} from "../../App";
import React, {ChangeEvent, useCallback} from "react";
import style from "./Todolist.module.css";
import Grid from "@material-ui/core/Grid";
import {EditebleSpan} from "../EditebleSpan/EditebleSpan";
import {ButtonComponent} from "../ButtonComponent";

type TasksType = {
    setchangeStyatus: (taskid: string, isDone: boolean, TodolistId: string) => void
    setNewTitleTaskprops: (taskid: string, newTitle: string, TodolistId: string) => void
    removeTascks: (id: string, TodolistId: string) => void
    id: string
    tasks: TaskType
}
export const Tasks = React.memo((props: TasksType) => {
    const {tasks, setNewTitleTaskprops, removeTascks, id, setchangeStyatus} = props
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setchangeStyatus(tasks.id, e.currentTarget.checked, id)
    }
    const setNewTitleTask = useCallback((newTitle: string) => {
        setNewTitleTaskprops(tasks.id, newTitle, id)
    }, [setNewTitleTaskprops, tasks.id, id])
    const onClickHandler = () => {
        removeTascks(tasks.id, id)
    }
    return (
        <div key={id} className={style.taskItems}>
            <Grid container className={style.taskItems} justifyContent="center">
                <Grid container item alignItems="center" className={style.element} xs={2}
                      justifyContent="center">
                    <input onChange={onChangeHandler} type="checkbox" checked={tasks.isDone}/>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" item
                      className={style.element} xs={8}>
                    <EditebleSpan title={tasks.title} setNewTitle={setNewTitleTask}
                                  label={tasks.lable}/>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" item xs={2}
                      className={style.element}>
                    <ButtonComponent onClick={onClickHandler}/>
                </Grid>
            </Grid>
        </div>
    )
})