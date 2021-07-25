import React, {useState,ChangeEvent,KeyboardEvent} from "react";


type InputPropsType= {
    onclickHHH: (inputState:string) => void
}

export const  Input=(props:InputPropsType)=>{
  const [inputState, setInputState]=useState("")

const onClickOnInput=(event:ChangeEvent<HTMLInputElement>)=>{
      setInputState(event.currentTarget.value)
}
const onKeyPressOnInput=(e:KeyboardEvent<HTMLInputElement>)=>{
   if(e.key==="Enter"){
       addInputButtonCkick()
   }
}

const addInputButtonCkick=()=>{
    props.onclickHHH(inputState)
    setInputState("")
}
    return(
        <>
            <input  onKeyPress={onKeyPressOnInput} onChange={onClickOnInput} value={inputState}></input>
            <button onClick={addInputButtonCkick}>+</button>
        </>

    )
}
