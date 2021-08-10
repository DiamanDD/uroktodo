import React, {useState} from "react";
import {v1} from "uuid";
import "./App.css";
import {Todolist} from "./Components/Todolist/Todolist";
import {INputElement} from "./Components/INputElement/INputElement";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
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
}
export type TodoListType = {
    id: string
    title: string
    filter: stateAffairType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const TodolistID_1 = v1()
    const TodolistID_2 = v1()
    const [todoList, setTodolist] = useState<Array<TodoListType>>(
        [
            {id: TodolistID_1, title: "Todo 1", filter: "All"},
            {id: TodolistID_2, title: "Todo 2", filter: "All"}
        ]
    )
    const [tasks, setTasks] = useState<TaskStateType>(
        {
            [TodolistID_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
            [TodolistID_2]: [
                {id: v1(), title: "HTML&CSS111", isDone: true},
                {id: v1(), title: "ReactJS111", isDone: false}
            ],
        }
    )
    const addNewTask = (inputState: string, TodolistId: string) => {
        const newTask = {
            id: v1(),
            title: inputState,
            isDone: false
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
            return tasks[todoList.id].filter((t) => (t.isDone))

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
            filter: "All"

        }

        setTodolist([...todoList, newTodoList])
        setTasks({...tasks, [newTodolistId]: []})

    }


    let Todolist1 = todoList.map(tl => {
        return (
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
            />
        )
    })


    return (
        <div className="App">
            <INputElement onClickHandler={addNewTodolist}/>
            {Todolist1}

        </div>
    );
}

export default App;
