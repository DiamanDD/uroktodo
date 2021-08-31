import {TaskStateType, TodoListType} from "../App";
import {addNewTodolistAC, removeTodoListAC, todolistReducer} from "./todolists-reducer";
import {tasksReduser} from "./tasks-reduser";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: TodoListType[] = [];

    const action = addNewTodolistAC("new todolist");

    const endTasksState = tasksReduser(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});

test('property with todolistId should be deleted', () => {
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

    const action = removeTodoListAC(TodolistID_2);

    const endState = tasksReduser(tasks, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[TodolistID_2]).not.toBeDefined();
});


