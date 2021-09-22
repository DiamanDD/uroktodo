import React, {useCallback} from "react";
import {v1} from "uuid";
import "./App.module.css";
import {Todolist} from "./Components/Todolist/Todolist";
import {InputElement} from "./Components/InputElement/InputElement";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import style from "./App.module.css"
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC
} from "./store/todolists-reducer";
import {
    addNewTaskAC,
    changeStyatusTaskAC,
    changeTaskTitleAC,
    filterTasksAC,
    removeTascksAC
} from "./store/tasks-reduser";
import {AppStateType} from "./store/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    lable: string
}
export type stateAffairType = "All" | "Active" | "Completed"

export type TodoListType = {
    id: string
    title: string
    filter: stateAffairType
    lable: string
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log("App")
    const dispatch = useDispatch()
    const todoList = useSelector<AppStateType, Array<TodoListType>>(state => state.todolistReducer)
    const tasks = useSelector<AppStateType, TaskStateType>(state => state.tasksReduser)
    const changeTodoListTitle = useCallback((newTitle: string, TodolistId: string) => {
        dispatch(changeTodolistTitleAC(newTitle, TodolistId))

    },[dispatch])
    const changeTodoListFilter = useCallback((newFilterValue: stateAffairType, TodolistId: string) => {
        dispatch(changeTodolistFilterAC(newFilterValue, TodolistId))
    },[dispatch])
    const removeTodolist = useCallback((TodolistId: string) => {
        dispatch(removeTodoListAC(TodolistId))

    },[dispatch])
    const addNewTodolist = useCallback((newTitle: string) => {

        dispatch(addNewTodolistAC(newTitle))

    },[dispatch])
    const removeTascks = useCallback((id: string, TodolistId: string) => {
        dispatch(removeTascksAC(id, TodolistId))

    },[dispatch])
    const addNewTask = useCallback((newTitle: string, TodolistId: string) => {
        dispatch(addNewTaskAC(newTitle, TodolistId))
    },[dispatch])
    const changeStyatusTask = useCallback((taskid: string, isDone: boolean, TodolistId: string) => {
        dispatch(changeStyatusTaskAC(taskid, isDone, TodolistId))
    },[dispatch])
    const changeTaskTitle = useCallback((taskid: string, newTitle: string, TodolistId: string) => {
        dispatch(changeTaskTitleAC(taskid, newTitle, TodolistId))

    },[dispatch])
    const filterTasck = useCallback( (TodolistId: string) => {

        dispatch(filterTasksAC(TodolistId))

    },[dispatch])

    let Todolist1 = todoList.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} className={style.todolist}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTascks={removeTascks}
                        filterTasck={filterTasck}
                        removeTodolist={removeTodolist}
                        stateHandler={changeTodoListFilter}
                        addInputValue={addNewTask}
                        setchangeStyatus={changeStyatusTask}
                        fielter={tl.filter}
                        setNewTitleTask={changeTaskTitle}
                        setNewTitleTodolist={changeTodoListTitle}
                        lable={tl.lable}
                    />
                </Paper>


            </Grid>


        )
    })


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed className={style.app}>
                <Grid container spacing={10} key={v1()}>
                    <Grid item={true}>
                        <InputElement onClickHandler={addNewTodolist}/>
                    </Grid>
                </Grid>

                <Grid container spacing={10}>

                    {Todolist1}

                </Grid>
            </Container>
        </div>
    );
}

export default App;
