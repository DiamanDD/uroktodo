import React, {ChangeEvent, useState} from "react";

type EditebleSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}


export const EditebleSpan = (props: EditebleSpanPropsType) => {
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
            ? <input value={title}
                     onBlur={offEditMode}
                     autoFocus={true}
                     onChange={onChangeNewTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}