import React, {useMemo} from "react";
import {useHistory} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {hideError} from "../../redux/error/slice"

import {httpErrorCodesInfo} from "../../infrastructure/http/httpErrorCodesInfo";
import {Button} from "@material-ui/core";
import {useErrorPageStyles} from "./useErrorPageStyles";
import DescriptionBlock from "../../elements/temporary/DescriptionBlock/DescriptionBlock";

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

    const classes = useErrorPageStyles()
    return (
        <div className={classes.container}>
            <DescriptionBlock type="info" message={props.errorCode || "Something went wrong"}/>
            <DescriptionBlock type="warning" message={subtitle}/>
            <Button className={classes.toHomeButton} onClick={() => {
                dispatch(hideError());
                history.push("/");
            }}>To Home Page</Button>
        </div>
    );
}

export default React.memo(ErrorPage);
