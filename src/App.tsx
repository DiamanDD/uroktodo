import React from "react";
import {v1} from "uuid";
import "./App.module.css";
import {Todolist} from "./Components/Todolist/Todolist";
import {INputElement} from "./Components/INputElement/INputElement";
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


export type PropsType = {
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
    const dispatch = useDispatch()
    const todoList = useSelector<AppStateType, Array<TodoListType>>(state => state.todolistReducer)
    const tasks = useSelector<AppStateType, TaskStateType>(state => state.tasksReduser)

    const changeTodoListTitle = (newTitle: string, TodolistId: string) => {
        dispatch(changeTodolistTitleAC(newTitle, TodolistId))

    }
    const changeTodoListFilter = (newFilterValue: stateAffairType, TodolistId: string) => {
        dispatch(changeTodolistFilterAC(newFilterValue, TodolistId))
    }
    const removeTodolist = (TodolistId: string) => {
        dispatch(removeTodoListAC(TodolistId))

    }
    const addNewTodolist = (newTitle: string) => {

        dispatch(addNewTodolistAC(newTitle))

    }
    const getTasksForTodolist = (todoList: TodoListType) => {

        if (todoList.filter === "Completed") {
            return tasks[todoList.id].filter((t) => (t.isDone))

        } else if (todoList.filter === "Active") {
            return tasks[todoList.id].filter((t) => (!t.isDone))

        } else {
            return tasks[todoList.id]
        }
    }


    const removeTascks = (id: string, TodolistId: string) => {
        dispatch(removeTascksAC(id, TodolistId))

    }
    const addNewTask = (newTitle: string, TodolistId: string) => {
        dispatch(addNewTaskAC(newTitle, TodolistId))
    }
    const changeStyatusTask = (taskid: string, isDone: boolean, TodolistId: string) => {

        dispatch(changeStyatusTaskAC(taskid, isDone, TodolistId))
    }
    const changeTaskTitle = (taskid: string, newTitle: string, TodolistId: string) => {
        dispatch(changeTaskTitleAC(taskid, newTitle, TodolistId))

    }

    const filterTasck = (TodolistId: string) => {

        dispatch(filterTasksAC(TodolistId))

    }


    let Todolist1 = todoList.map(tl => {
        return (


            <Grid item key={tl.id}>
                <Paper elevation={3} className={style.todolist}>
                    <Todolist

                        id={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodolist(tl)}
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
                        <INputElement onClickHandler={addNewTodolist}/>
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
