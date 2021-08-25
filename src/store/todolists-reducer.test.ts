import {v1} from "uuid";
import {
    addNewTodolistAC,
    removeTodoListAC,
    changeTodolistFilterAC,
    todolistReducer,
    changeTodolistTitleAC
} from "./todolists-reducer";
import {stateAffairType, TodoListType} from "../App";


test("deletion of the to-do list must be correct", () => {
    const TodolistID_1:string = v1()
    const TodolistID_2:string = v1()
    const TodolistID_3:string = v1()
    const Todolist: TodoListType[] = [
        {id: TodolistID_1, title: "Todo 1", filter: "All", lable: "todo"},
        {id: TodolistID_2, title: "Todo 2", filter: "All", lable: "todo2"},
        {id: TodolistID_3, title: "Todo 2", filter: "All", lable: "todo3"}
    ]

    const newTodolists:TodoListType[] = todolistReducer(Todolist, removeTodoListAC(TodolistID_2))

    expect(newTodolists.length).toBe(2)
    expect(newTodolists[1].id).toBe(TodolistID_3)
})
test("to-do list should be added", () => {
    const newTitle:string  = "Новый лист"
    const TodolistID_1:string  = v1()
    const TodolistID_2:string = v1()
    const TodolistID_3:string  = v1()
    const Todolist: TodoListType[] = [
        {id: TodolistID_1, title: "Todo 1", filter: "All", lable: "todo"},
        {id: TodolistID_2, title: "Todo 2", filter: "All", lable: "todo2"},
        {id: TodolistID_3, title: "Todo 2", filter: "All", lable: "todo3"}
    ]

    const newTodolists: TodoListType[]= todolistReducer(Todolist, addNewTodolistAC(newTitle))

    expect(newTodolists.length).toBe(4)
    expect(newTodolists[3].title).toBe("Новый лист")
})
test("to-do list filter should toggle", () => {
    const changeFilter: stateAffairType = "All"
    const TodolistID_1:string  = v1()
    const TodolistID_2:string  = v1()
    const TodolistID_3:string  = v1()
    const Todolist: TodoListType[] = [
        {id: TodolistID_1, title: "Todo 1", filter: "Completed", lable: "todo"},
        {id: TodolistID_2, title: "Todo 2", filter: "Active", lable: "todo2"},
        {id: TodolistID_3, title: "Todo 2", filter: "Completed", lable: "todo3"}
    ]

    const newTodolists: TodoListType[] = todolistReducer(Todolist, changeTodolistFilterAC(changeFilter, TodolistID_2))

    expect(newTodolists[0].filter).toBe("Completed")
    expect(newTodolists[1].filter).toBe("All")
    expect(newTodolists[2].filter).toBe("Completed")
})
test("to-do list title should toggle", () => {
    const newTitle:string  = "new"
    const TodolistID_1:string  = v1()
    const TodolistID_2:string  = v1()
    const TodolistID_3:string  = v1()
    const Todolist: TodoListType[] = [
        {id: TodolistID_1, title: "Todo 1", filter: "Completed", lable: "todo"},
        {id: TodolistID_2, title: "Todo 2", filter: "Active", lable: "todo2"},
        {id: TodolistID_3, title: "Todo 2", filter: "Completed", lable: "todo3"}
    ]

    const newTodolists: TodoListType[] = todolistReducer(Todolist, changeTodolistTitleAC(newTitle, TodolistID_2))

    expect(newTodolists[0].title).toBe("Todo 1")
    expect(newTodolists[1].title).toBe(newTitle)
    expect(newTodolists[2].title).toBe("Todo 2")
    expect(newTodolists.length).toBe(3)
})