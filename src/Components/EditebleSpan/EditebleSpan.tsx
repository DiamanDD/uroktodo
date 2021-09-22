import {TextField} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";

type EditebleSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
    label: string
}

export const EditebleSpan = React.memo((props: EditebleSpanPropsType) => {
    console.log("EditebleSpan")
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }
    const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField id="standard-basic" label={props.label === "todo" ? "измените лист" : "измените задачу"}
                         value={title}
                         onBlur={offEditMode}
                         autoFocus={true}
                         onChange={onChangeNewTitle}/>

            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})