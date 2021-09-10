import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolists-reducer";
import {tasksReduser} from "./tasks-reduser";

const rootReducer=combineReducers({
    todolistReducer,
    tasksReduser
})
export type AppStateType=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer)