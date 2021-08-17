import { TextField } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import React, {useState, ChangeEvent, KeyboardEvent} from "react";



type InputPropsType = {
    onClickHandler: (inputState: string) => void
}

export const INputElement = (props: InputPropsType) => {
    const [inputState, setInputState] = useState("")
    const [errorN, setErrorN] = useState("")
    const onClickOnInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputState(event.currentTarget.value)
    }
    const onKeyPressOnInput = (e: KeyboardEvent<HTMLInputElement>) => {
        setErrorN("")
        if (e.key === "Enter") {
            addInputButtonCkick()
        }
    }
    const addInputButtonCkick = () => {
        if (inputState.trim() === "") {
            setErrorN("Ошибка")
            return
        }
        props.onClickHandler(inputState)
        setInputState("")
    }
    return (
        <>
            <TextField

                    id="standard-basic"
                       label={inputState}

                       onKeyPress={onKeyPressOnInput}
                       onChange={onClickOnInput}
                       value={inputState}
                       helperText={errorN}
                        error={errorN ? true : false}

            />
           <AddCircleOutlineIcon onClick={addInputButtonCkick} color="primary"/>


        </>

    )
}
