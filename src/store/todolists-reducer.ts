import {stateAffairType, TodoListType} from "../App";
import {v1} from "uuid";

export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const ADD_NEW_TODOLIST = "ADD_NEW_TODOLIST"
const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"


type todolostActionType =
    removeTodoListAT |
    addNewTodolistAT |
    changeTodolistFilterAT |
    changeTodolistTitleAT

export type removeTodoListAT = ReturnType<typeof removeTodoListAC>
export type addNewTodolistAT = ReturnType<typeof addNewTodolistAC>
type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>


export const removeTodoListAC = (TodolistId: string) => ({
    type: REMOVE_TODOLIST,
    TodolistId: TodolistId
} as const)
export const addNewTodolistAC = (title: string) => ({
    type: ADD_NEW_TODOLIST,
    title: title,
    id: v1()
} as const)
export const changeTodolistFilterAC = (newFilterValue: stateAffairType, TodolistId: string) => ({
    type: CHANGE_TODOLIST_FILTER,
    TodolistId: TodolistId,
    newFilterValue: newFilterValue

} as const)
export const changeTodolistTitleAC = (newTitle: string, TodolistId: string) => ({
    type: CHANGE_TODOLIST_TITLE,
    TodolistId: TodolistId,
    newTitle: newTitle

} as const)


export const TodolistID_1 = v1()
export const TodolistID_2 = v1()
const InitialState: Array<TodoListType> = [
    {id: TodolistID_1, title: "Todo 1", filter: "All", lable: "todo"},
    {id: TodolistID_2, title: "Todo 2", filter: "All", lable: "todo"}
]


export const todolistReducer = (stateTodolist: TodoListType[] = InitialState, action: todolostActionType): TodoListType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return stateTodolist.filter((s => (s.id !== action.TodolistId)))
        case ADD_NEW_TODOLIST:

            const newTodoList: TodoListType = {
                id: action.id,
                title: action.title,
                filter: "All",
                lable: "todo"

            }
            return [...stateTodolist, newTodoList]
        case CHANGE_TODOLIST_FILTER:

            return stateTodolist.map(tl => tl.id === action.TodolistId ? {...tl, filter: action.newFilterValue} : tl)
        case CHANGE_TODOLIST_TITLE: {
            let stateCopy = [...stateTodolist]

            return stateCopy.map(tl => (tl.id === action.TodolistId ? {...tl, title: action.newTitle} : tl))
        }
        default:
            return stateTodolist
    }

}

