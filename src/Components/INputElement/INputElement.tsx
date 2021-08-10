import React, {useState, ChangeEvent, KeyboardEvent} from "react";


type InputPropsType = {
    onClickHandler: (inputState: string) => void
}

export const INputElement = (props: InputPropsType) => {
    const [inputState, setInputState] = useState("")
    const [error, seterorr] = useState("")
    const onClickOnInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputState(event.currentTarget.value)
    }
    const onKeyPressOnInput = (e: KeyboardEvent<HTMLInputElement>) => {
        seterorr("")
        if (e.key === "Enter") {
            addInputButtonCkick()
        }
    }
    const addInputButtonCkick = () => {
        if (inputState.trim() === "") {
            seterorr("Ошибка")
            return
        }
        props.onClickHandler(inputState)
        setInputState("")
    }
    return (
        <>
            <input
                className={error ? "error" : ""}
                onKeyPress={onKeyPressOnInput}
                onChange={onClickOnInput}
                value={inputState}/>
            <button onClick={addInputButtonCkick}>+</button>
            <div className={error ? "error-message" : ""}>{error}</div>
        </>

    )
}
