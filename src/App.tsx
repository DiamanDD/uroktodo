import React, {useState} from "react";
import {v1} from "uuid";
import "./App.module.css";
import {Todolist} from "./Components/Todolist/Todolist";
import {INputElement} from "./Components/INputElement/INputElement";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import style from "./App.module.css"
import { Menu } from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    lable:string
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
    lable:string

}
export type TodoListType = {
    id: string
    title: string
    filter: stateAffairType
    lable:string
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const TodolistID_1 = v1()
    const TodolistID_2 = v1()
    const [todoList, setTodolist] = useState<Array<TodoListType>>(
        [
            {id: TodolistID_1, title: "Todo 1", filter: "All", lable:"todo"},
            {id: TodolistID_2, title: "Todo 2", filter: "All",lable:"todo"}
        ]
    )
    const [tasks, setTasks] = useState<TaskStateType>(
        {
            [TodolistID_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true,lable:"task"},
                {id: v1(), title: "ReactJS", isDone: false,lable:"task"}
            ],
            [TodolistID_2]: [
                {id: v1(), title: "HTML&CSS111", isDone: true,lable:"task"},
                {id: v1(), title: "ReactJS111", isDone: false,lable:"task"}
            ],
        }
    )
    const addNewTask = (inputState: string, TodolistId: string) => {
        const newTask = {
            id: v1(),
            title: inputState,
            isDone: false,
            lable:"task"
        }
        tasks[TodolistId] = [newTask, ...tasks[TodolistId]]
        setTasks({...tasks})


    }
    const changeStyatus = (taskid: string, isDone: boolean, TodolistId: string) => {
        const newtask = tasks[TodolistId].find(t => t.id === taskid)
        if (newtask) {
            newtask.isDone = isDone
            setTasks({...tasks})
        }

    }
    const changeTaskTitle = (taskid: string, newTitle: string, TodolistId: string) => {

        let newtask = tasks[TodolistId].find(t => t.id === taskid)
        if (newtask) {
            newtask.title = newTitle
            setTasks({...tasks})
        }

    }
    const changeTodoListTitle = (newTitle: string, TodolistId: string) => {

        setTodolist(todoList.map(tl => tl.id === TodolistId ? {...tl, title: newTitle} : tl))


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


    const changeTodoListFilter = (newFilterValue: stateAffairType, TodolistId: string) => {
        setTodolist(todoList.map(tl => tl.id === TodolistId ? {...tl, filter: newFilterValue} : tl))
        console.log(todoList)

    }

    const removeTascks = (id: string, TodolistId: string) => {

        tasks[TodolistId] = tasks[TodolistId].filter((s => (s.id !== id)))
        setTasks({...tasks})
    }

    const filterTasck = (TodolistId: string) => {
        tasks[TodolistId] = tasks[TodolistId].filter((t) => (t.isDone))

        setTasks({...tasks})
    }

    const addNewTodolist = (newTitle: string) => {
        const newTodolistId = v1()
        const newTodoList: TodoListType = {
            id: newTodolistId,
            title: newTitle,
            filter: "All",
            lable:"todo"

        }

        setTodolist([...todoList, newTodoList])
        setTasks({...tasks, [newTodolistId]: []})

    }


    let Todolist1 = todoList.map(tl => {
        return (


            <Grid item xs  >
                <Paper  elevation={3} className={style.todolist}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodolist(tl)}
                        removeTascks={removeTascks}
                        filterTasck={filterTasck}

                        stateHandler={changeTodoListFilter}
                        addInputValue={addNewTask}
                        setchangeStyatus={changeStyatus}
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
        <div >
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed className={style.app} >
            <Grid container spacing={10} key={v1()}>
                <Grid item={true}>
                    <INputElement  onClickHandler={addNewTodolist}/>
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
