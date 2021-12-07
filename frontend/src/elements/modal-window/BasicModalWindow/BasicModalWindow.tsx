import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {useBasicModalWindowStyles} from "./useBasicModalWindowStyles";


type BasicModalWindowProps = {
    active: boolean,
    setActive: (arg0: boolean) => void,
    children: any
}

const BasicModalWindow: React.FC<BasicModalWindowProps> = (props) => {
    const {active, setActive, children} = props
    const classes = useBasicModalWindowStyles();

    return (
        <div className={active ? classes.modal__active : classes.modal}>
            <div className={active ? classes.modal__content__active : classes.modal__content}>
                {
                    children
                }
            </div>
        </div>
    )
}
export default BasicModalWindow