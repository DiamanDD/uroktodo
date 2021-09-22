import React, {useCallback} from "react";
import {stateAffairType, TaskType} from "../../App"
import {EditebleSpan} from "../EditebleSpan/EditebleSpan";
import style from "./Todolist.module.css"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Tasks} from "./Tasks";
import {InputElement} from "../InputElement/InputElement";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTascks: (id: string, TodolistId: string) => void
    filterTasck: (TodolistId: string) => void
    stateHandler: (name: stateAffairType, TodolistId: string) => void
    addInputValue: (inputState: string, TodolistId: string) => void
    setchangeStyatus: (taskid: string, isDone: boolean, TodolistId: string) => void
    fielter: stateAffairType
    setNewTitleTask: (taskid: string, newTitle: string, TodolistId: string) => void
    setNewTitleTodolist: (newTitle: string, TodolistId: string) => void
    lable: string
    removeTodolist: (id: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log("Todolist")
    let {
        title,
        tasks,
        addInputValue,
        removeTascks,
        stateHandler,
        id,
        removeTodolist,
        setNewTitleTodolist,
        fielter
    } = props
    const onClickStateAll = () => {
        stateHandler("All", id)
    }
    const onClickStateActive = () => {
        stateHandler("Active", id)
    }
    const onClickStateCompleted = () => {
        stateHandler("Completed", id)
    }
    const addInputItem = useCallback((title: string) => {
        addInputValue(title, id)
    }, [addInputValue, id])
    const setNewTitleTask = useCallback((newTitle: string) => {
        setNewTitleTodolist(newTitle, id)
    }, [setNewTitleTodolist, id])
    const onClockRemoveTodolist = useCallback(() => {
        removeTodolist(id)
    }, [removeTodolist, id])
    if (fielter === "Completed") {
        tasks = tasks.filter((t) => (t.isDone))
    } else if (fielter === "Active") {
        tasks = tasks.filter((t) => (!t.isDone))
    }
    return <div>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
                <Grid container className={style.taskItems} justifyContent="center">
                    <Grid item className={style.element} xs={8}>
                        <h3><EditebleSpan title={title} setNewTitle={setNewTitleTask} label={props.lable}/></h3>
                    </Grid>
                    <Grid item className={style.element} xs={2}>
                        <IconButton onClick={onClockRemoveTodolist} aria-label="delete" color="primary">
                            <Delete/>
                        </IconButton>
                    </Grid>
                </Grid>

            </Grid>
            <Grid item>
                <div>
                    <InputElement onClickHandler={addInputItem}/>
                </div>
            </Grid>
            <Grid item>
                <div>
                    {tasks.map(t => <Tasks
                        key={t.id}
                        setchangeStyatus={props.setchangeStyatus}
                        setNewTitleTaskprops={props.setNewTitleTask}
                        removeTascks={removeTascks}
                        id={id}
                        tasks={t}/>)}
                </div>
            </Grid>
            <Grid item xs={12}>
                <div>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justifyContent="center">
                        <Grid item>
                            <Button
                                onClick={onClickStateAll}
                                variant={fielter === "All" ? "contained" : "outlined"}
                                color="primary">
                                All
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={onClickStateActive}
                                variant={props.fielter === "Active" ? "contained" : "outlined"}
                                color="primary">
                                Active
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={onClickStateCompleted}
                                variant={props.fielter === "Completed" ? "contained" : "outlined"}
                                color="primary">
                                Completed
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    </div>
})

