import React, {useEffect} from "react";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import {useAppSelector} from "../../redux/hooks";
import {developmentLog} from "../../infrastructure/common/developmentLog";

// @ts-ignore
export const HandledErrorBoundary = ({children}) => {
    const errorOccurred = useAppSelector((state) => state.errorReducer.errorOccurred);

    useEffect(() => {
        if (errorOccurred) {
            developmentLog(`error handler activated. error message: ${errorOccurred.message}`);
        }
    }, [errorOccurred])

    return errorOccurred ?
        <ErrorPage
            errorCode={errorOccurred.code}
            message={errorOccurred.message} /> :
        children;
};

export default HandledErrorBoundary;
