
import {stateAffairType, TodoListType} from "../App";
import {v1} from "uuid";
const REMOVE_TODOLIST="REMOVE_TODOLIST"
const ADD_NEW_TODOLIST="ADD_NEW_TODOLIST"
const CHANGE_TODOLIST_FILTER="CHANGE_TODOLIST_FILTER"
const CHANGE_TODOLIST_TITLE="CHANGE_TODOLIST_TITLE"


type todolostActionType =
    removeTodoListAT |
    addNewTodolistAT |
    changeTodolistFilterAT |
    changeTodolistTitleAT

type removeTodoListAT = ReturnType<typeof removeTodoListAC>
type addNewTodolistAT = ReturnType<typeof addNewTodolistAC>
type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>


export const removeTodoListAC = (TodolistId: string) => ({
    type: REMOVE_TODOLIST,
    TodolistId: TodolistId
} as const)
export const addNewTodolistAC = (title: string) => ({
    type: ADD_NEW_TODOLIST,
    title: title
} as const)
export const changeTodolistFilterAC=(newFilterValue:stateAffairType, TodolistId:string)=>({
    type:CHANGE_TODOLIST_FILTER,
    TodolistId:TodolistId,
    newFilterValue:newFilterValue

} as const)
export const changeTodolistTitleAC=(newTitle:string, TodolistId:string)=>({
    type:CHANGE_TODOLIST_TITLE,
    TodolistId:TodolistId,
    newTitle:newTitle

} as const)


export const todolistReducer = (stateTodolist: TodoListType[], action: todolostActionType): TodoListType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return stateTodolist.filter((s => (s.id !== action.TodolistId)))
        case ADD_NEW_TODOLIST:
            const newTodolistId = v1()
            const newTodoList: TodoListType = {
                id: newTodolistId,
                title: action.title,
                filter: "All",
                lable: "todo"

            }
            return [...stateTodolist, newTodoList]
        case CHANGE_TODOLIST_FILTER:
            return stateTodolist.map(tl => tl.id === action.TodolistId ? {...tl, filter: action.newFilterValue} : tl)
        case CHANGE_TODOLIST_TITLE:
            return stateTodolist.map(tl => tl.id === action.TodolistId ? {...tl, title: action.newTitle} : tl)
        default:
            return stateTodolist
    }

}

