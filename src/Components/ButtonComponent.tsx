import React, {FC} from "react";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type PropsType = {
    onClick: () => void
}


export const ButtonComponent: FC<PropsType> = ({onClick}) => {


    return (
        <IconButton onClick={onClick} aria-label="delete" color="primary">
            <Delete/>
        </IconButton>

    )
}