import React, {useState,ChangeEvent,KeyboardEvent} from "react";
import {log} from "util";


type InputPropsType= {
    onclickHHH: (inputState:string) => void
}

export const  Input=(props:InputPropsType)=>{
  const [inputState, setInputState]=useState("")
    const[error,seterorr]=useState("")

const onClickOnInput=(event:ChangeEvent<HTMLInputElement>)=>{
      setInputState(event.currentTarget.value)
}
const onKeyPressOnInput=(e:KeyboardEvent<HTMLInputElement>)=>{
    seterorr("")
   if(e.key==="Enter"){
       addInputButtonCkick()
   }
}

const addInputButtonCkick=()=>{
    if(inputState.trim()=="") {
        seterorr("Ошибка")

        return
    }

    props.onclickHHH(inputState)
    setInputState("")
}
    return(
        <>
            <input  className={error ? "error": ""} onKeyPress={onKeyPressOnInput} onChange={onClickOnInput} value={inputState}></input>
            <button onClick={addInputButtonCkick}>+</button>
            <div className={error ? "error-message": ""}>{error}</div>
        </>

    )
}
