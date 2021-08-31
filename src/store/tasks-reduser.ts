import {TaskStateType} from "../App";
import {v1} from "uuid";
import { addNewTodolistAT, removeTodoListAT } from "./todolists-reducer";

const REMOVE_TASK = "REMOVE_TASK"
const ADD_NEW_TASK = "ADD_NEW_TASK"
const CHANGE_STATUS_TASK="CHANGE_STATUS_TASK"
const CHANGE_TASKTITLE="CHANGE_TASKTITLE"
const FILTER_TASKS="FILTER_TASKS"

type TaskAT = removeTascksAT | addNewTaskAT |changeStyatusTaskAT |changeTaskTitleAT |filterTasksAT | addNewTodolistAT |removeTodoListAT

type removeTascksAT = ReturnType<typeof removeTascksAC>
type addNewTaskAT = ReturnType<typeof addNewTaskAC>
type changeStyatusTaskAT = ReturnType<typeof changeStyatusTaskAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type filterTasksAT = ReturnType<typeof filterTasksAC>

export const removeTascksAC = (id: string, TodolistId: string) => ({
    type: REMOVE_TASK,
    id: id,
    TodolistId: TodolistId
} as const)
export const addNewTaskAC = (newTitle: string, TodolistId: string) => ({
    type: ADD_NEW_TASK,
    newTitle: newTitle,
    TodolistId: TodolistId
} as const)
export const changeStyatusTaskAC = (taskid: string, isDone: boolean, TodolistId: string) => ({
    type: CHANGE_STATUS_TASK,
    taskid:taskid,
    isDone:isDone,
    TodolistId: TodolistId
} as const)
export const changeTaskTitleAC = (taskid: string, newTitle: string, TodolistId: string) => ({
    type: CHANGE_TASKTITLE,
    taskid:taskid,
    newTitle:newTitle,
    TodolistId: TodolistId
} as const)
export const filterTasksAC = (TodolistId: string) => ({
    type: FILTER_TASKS,
      TodolistId: TodolistId
} as const)


export const tasksReduser = (state: TaskStateType, action: TaskAT): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            const stateCopy = {...state}

            stateCopy[action.TodolistId] = stateCopy[action.TodolistId].filter((s => (s.id !== action.id)))

            return stateCopy
        }
        case "ADD_NEW_TASK":{
            const stateCopy = {...state}

            const newTask = {
                id: v1(),
                title: action.newTitle,
                isDone: false,
                lable: "task"
            }
            stateCopy[action.TodolistId] = [newTask, ...stateCopy[action.TodolistId]]

            return stateCopy
        }
        case "CHANGE_STATUS_TASK":
        {
            const stateCopy = {...state}

            const newtask = stateCopy[action.TodolistId].find(t => t.id === action.taskid)
            if (newtask) {
                newtask.isDone = action.isDone

            }

            return stateCopy
        }
        case "CHANGE_TASKTITLE":{
            const stateCopy = {...state}

            let newtask = stateCopy[action.TodolistId].find(t => t.id === action.taskid)
            if (newtask) {
                newtask.title = action.newTitle

            }

            return stateCopy
        }
        case "ADD_NEW_TODOLIST":
        {
            const stateCopy = {...state}



            return {...stateCopy,[action.id]:[] }
        }
        case "REMOVE_TODOLIST":{
            const stateCopy = {...state}

           delete stateCopy[action.TodolistId]
            return stateCopy
        }


        default:
            return state
    }
}