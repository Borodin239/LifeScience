import React, {useMemo} from "react";
import {useHistory} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {hideError} from "../../redux/error/slice"

import styles from "./ErrorPage.module.css";
import {httpErrorCodesInfo} from "../../infrastructure/http/httpErrorCodesInfo";
import DescriptionBlock from "../../elements/temporary/DescriptionBlock/DescriptionBlock";
import {Button} from "@material-ui/core";

const ErrorPage: React.FC<{ errorCode?: string, message?: string }> = (props) => {
    const history = useHistory();

    const subtitle: string = useMemo(() => {
        if (props.message) {
            return props.message;
        }
        if (props.errorCode && httpErrorCodesInfo.has(props.errorCode)) {
            return httpErrorCodesInfo.get(props.errorCode) as string;
        }
        return 'Unknown internal error';
    }, [props.errorCode, props.message]);

    const dispatch = useAppDispatch();


    return (
        <div className={styles.ErrorPage}>
            <DescriptionBlock type="info" message={props.errorCode || "Something went wrong"}/>
            <DescriptionBlock type="warning" message={subtitle}/>
            <Button onClick={() => {
                dispatch(hideError());
                history.push("/");
            }}>To Home Page</Button>
        </div>
    );
}

export default React.memo(ErrorPage);
