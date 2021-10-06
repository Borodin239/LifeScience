import React from "react";
import {useDescriptionBlockStyles} from "./useDescriptionBlockStyles";

type DescriptionProps = {
    message: string,
    type?: 'info' | 'warning' | 'smallInfo'
}

const getClassName = (classes: any, type?: 'info' | 'warning' | 'smallInfo') => {
    switch (type) {
        case 'smallInfo':
            return classes.smallInfo
        case 'warning':
            return classes.warning
        default:
            return classes.info
    }
}

const DescriptionBlock: React.FC<DescriptionProps> = (props) => {
    const classes = useDescriptionBlockStyles()
    return (
        <div className={getClassName(classes, props.type)}>
            {props.message}
        </div>
    );
};

export default React.memo(DescriptionBlock);
