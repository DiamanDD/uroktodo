import React, {useState} from "react";
import { v1 } from "uuid";
import "./App.css";
import {stateAffairType, Todolist} from "./Todolist";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTascks: (id: string) => void
    filterTasck: () => void
    stateHandler: (name:string) => void
    addInputValue: (inputState: string) => void


}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    const addInputValue=(inputState:string)=>{
        let newTask={id: v1(), title: inputState, isDone: false}
        tasks=[newTask,...tasks]
        setTasks(tasks)

    }

    const [filterState, setFilterState] = useState("All")

    let newTasks = tasks
    if (filterState === "Completed") {
        newTasks = tasks.filter((t) => (t.isDone === true))

    }
    if (filterState === "Active") {
        newTasks = tasks.filter((t) => (t.isDone !== true))

    }
    const stateHandler = (name:string ) => {
        setFilterState(name)
    }

    const removeTascks = (id: string) => {
        console.log(id)
        let fielterRemoveTasck = tasks.filter((s => (s.id != id)))
        setTasks(fielterRemoveTasck)
    }

    const filterTasck = () => {
        let fielterHandler = tasks.filter((t) => (t.isDone === true))

        setTasks(fielterHandler)
    }
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={newTasks}
                      removeTascks={removeTascks}
                      filterTasck={filterTasck}
                      stateHandler={stateHandler}
                      addInputValue={addInputValue}
            />
        </div>
    );
}
export default App;
