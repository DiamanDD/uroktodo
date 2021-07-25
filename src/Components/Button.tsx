import React, {FC} from "react";
;

type PropsType= {
    onClick: () => void
}


export const Button:FC<PropsType> = ({onClick}) => {


    return (
        <button onClick={onClick} >х</button>
    )
}