import React from "react";
import styles from './DescriptionBlock.module.css';
import cn from 'classnames';

type DescriptionProps = {
    message: string,
    type?: 'info' | 'warning' | 'smallInfo'
}

const getClassName = (type?: 'info' | 'warning' | 'smallInfo') => {
    switch (type) {
        case 'smallInfo':
            return cn(styles.description, styles.smallInfo);
        case 'warning':
            return cn(styles.description, styles.warning);
        default:
            return cn(styles.description, styles.info);
    }
}

const DescriptionBlock: React.FC<DescriptionProps> = (props) => {
    return (
        <div className={getClassName(props.type)}>
            {props.message}
        </div>
    );
};

export default React.memo(DescriptionBlock);
