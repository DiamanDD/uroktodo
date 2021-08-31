import {v1} from "uuid";

import {addNewTaskAC, changeStyatusTaskAC, changeTaskTitleAC, removeTascksAC, tasksReduser} from "./tasks-reduser";
import {TaskStateType} from "../App";
import {addNewTodolistAC} from "./todolists-reducer";


test ("task should be remnoved",()=>{
    const TodolistID_1 = v1()
    const TodolistID_2 = v1()

    const tasks={
            [TodolistID_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true, lable: "task"},
                {id: v1(), title: "ReactJS", isDone: false, lable: "task"}
            ],
            [TodolistID_2]: [
                {id: v1(), title: "HTML&CSS111", isDone: true, lable: "task"},
                {id: v1(), title: "ReactJS111", isDone: false, lable: "task"}
            ],
        }


   const endState=tasksReduser(tasks,removeTascksAC(tasks[TodolistID_2][1].id,TodolistID_2))

    expect(endState[TodolistID_2].length).toBe(1)

})
test ("task should be added",()=>{
    const TodolistID_1 = v1()
    const TodolistID_2 = v1()

    const tasks={
            [TodolistID_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true, lable: "task"},
                {id: v1(), title: "ReactJS", isDone: false, lable: "task"}
            ],
            [TodolistID_2]: [
                {id: v1(), title: "HTML&CSS111", isDone: true, lable: "task"},
                {id: v1(), title: "ReactJS111", isDone: false, lable: "task"}
            ],
        }


   const endState=tasksReduser(tasks,addNewTaskAC("newTAsk",TodolistID_2))

    expect(endState[TodolistID_2].length).toBe(3)
    expect(endState[TodolistID_2][0].title).toBe("newTAsk")

})
test ("task status should be shange",()=>{
    const TodolistID_1 = v1()
    const TodolistID_2 = v1()

    const tasks={
            [TodolistID_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true, lable: "task"},
                {id: v1(), title: "ReactJS", isDone: false, lable: "task"}
            ],
            [TodolistID_2]: [
                {id: v1(), title: "HTML&CSS111", isDone: true, lable: "task"},
                {id: v1(), title: "ReactJS111", isDone: false, lable: "task"}
            ],
        }


   const endState=tasksReduser(tasks,changeStyatusTaskAC(tasks[TodolistID_1][0].id,false,TodolistID_1))

    expect(endState[TodolistID_1].length).toBe(2)
    expect(tasks[TodolistID_1][0].isDone).toBe(false)
    expect(endState[TodolistID_1][0].isDone).toBe(false)


})
test ("task title should be shange",()=>{
    const TodolistID_1 = v1()
    const TodolistID_2 = v1()

    const tasks:TaskStateType={
            [TodolistID_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true, lable: "task"},
                {id: v1(), title: "ReactJS", isDone: false, lable: "task"}
            ],
            [TodolistID_2]: [
                {id: v1(), title: "HTML&CSS111", isDone: true, lable: "task"},
                {id: v1(), title: "ReactJS111", isDone: false, lable: "task"}
            ],
        }


   const endState=tasksReduser(tasks,changeTaskTitleAC(tasks[TodolistID_1][0].id,"Morkva",TodolistID_1))

    expect(endState[TodolistID_1].length).toBe(2)

    expect(endState[TodolistID_1][0].title).toBe("Morkva")
    expect(endState[TodolistID_1].length).toBe(2)
    expect(endState[TodolistID_2].length).toBe(2)



})
test('new array should be added when new todolist is added', () => {
    const TodolistID_1 = v1()
    const TodolistID_2 = v1()
    const startState: TaskStateType = {
        [TodolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true, lable: "task"},
            {id: v1(), title: "ReactJS", isDone: false, lable: "task"}
        ],
        [TodolistID_2]: [
            {id: v1(), title: "HTML&CSS111", isDone: true, lable: "task"},
            {id: v1(), title: "ReactJS111", isDone: false, lable: "task"}
        ],
    };

    const action = addNewTodolistAC("new todolist");

    const endState = tasksReduser(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != TodolistID_1 && k != TodolistID_2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
