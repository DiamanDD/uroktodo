import React, {ChangeEvent} from "react";
import {ButtonComponent} from "../ButtonComponent";
import {INputElement} from "../INputElement/INputElement";
import {PropsType} from "../../App"
import {EditebleSpan} from "../EditebleSpan/EditebleSpan";
import style from "./Todolist.module.css"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


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
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12}>

                <h3><EditebleSpan title={title} setNewTitle={setNewTitleTask} label={props.lable}/></h3>
            </Grid>
            <Grid item>
                <div>
                    <INputElement onClickHandler={addInputItem} />
                </div>
            </Grid>
            <Grid item>
                <div>
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
                            return (
                                <div key={t.id} className={style.taskItems}>
                                    <Grid container xs={12} className={style.taskItems} justifyContent="center">
                                        <Grid container item alignItems="center" className={style.element} xs={2}
                                              justifyContent="center">
                                            <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                                        </Grid>
                                        <Grid container justifyContent="center" alignItems="center" item
                                              className={style.element} xs={8}>
                                            <EditebleSpan title={t.title} setNewTitle={setNewTitleTask}
                                                          label={t.lable}/>
                                        </Grid>
                                        <Grid container justifyContent="center" alignItems="center" item xs={2}
                                              className={style.element}>
                                            <ButtonComponent onClick={onClickHandler}/>
                                        </Grid>
                                    </Grid>
                                </div>
                            )
                        })
                    }
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
                                variant={props.fielter === "All" ? "contained" : "outlined"}
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
}
