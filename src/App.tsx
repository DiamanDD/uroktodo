import React, {useState} from "react";
import { v1 } from "uuid";
import "./App.css";
import { Todolist} from "./Todolist";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type stateAffairType="All"|"Active"|"Completed"


export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTascks: (id: string) => void
    filterTasck: () => void
    stateHandler: (name:stateAffairType) => void
    addInputValue: (inputState: string) => void
    setchangeStyatus:(taskid:string,isDone:boolean)=>void
    fielter:stateAffairType


}

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    const [filterState, setFilterState] = useState<stateAffairType>("All")


    const addInputValue=(inputState:string)=>{
        let newTask={id: v1(), title: inputState, isDone: false}
        let addtasks=[newTask,...tasks]
        setTasks(addtasks)

    }
    const changeStyatus=(taskid:string,isDone:boolean)=>{

          let newtask=tasks.find(t=>t.id===taskid)
        if (newtask){
            newtask.isDone=isDone
            setTasks([...tasks])
        }

    }


    let newTasks = tasks
    if (filterState === "Completed") {
        newTasks = tasks.filter((t) => (t.isDone === true))

    }
    if (filterState === "Active") {
        newTasks = tasks.filter((t) => (t.isDone !== true))

    }
    const stateHandler = (name:stateAffairType ) => {
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
                      setchangeStyatus={changeStyatus}
                      fielter={filterState}
            />
        </div>
    );
}
export default App;
