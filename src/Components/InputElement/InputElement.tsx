import {TextField} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type InputPropsType = {
    onClickHandler: (inputState: string) => void
}
export const InputElement = React.memo((props: InputPropsType) => {
    console.log("InputElement")
    const [inputState, setInputState] = useState("")
    const [error, setError] = useState("")
    const onClickOnInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputState(event.currentTarget.value)
    }
    const onKeyPressOnInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== "") {
            setError("")
        }

        if (e.key === "Enter") {
            addInputButtonClick()
        }
    }
    const addInputButtonClick = () => {
        if (inputState.trim() === "") {
            setError("Ошибка")
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
                helperText={error}
                error={Boolean(error)}

            />
            <AddCircleOutlineIcon onClick={addInputButtonClick} color="primary"/>


        </>

    )
})
