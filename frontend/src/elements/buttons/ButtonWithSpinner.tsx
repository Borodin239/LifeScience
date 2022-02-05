import Button from "@material-ui/core/Button";
import React from "react";
import {Box, CircularProgress} from "@material-ui/core";

const ButtonWithSpinner: React.FC<{
    text: string,
    isLoading: boolean, classes: any, handleClick: (event: React.FormEvent) => void
}> = ({text, isLoading, classes, handleClick}) => {
    return (
        <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button disabled={isLoading} variant='contained' className={classes.submit}
                    onClick={(e) => handleClick(e)}>{text}</Button>
            {isLoading && <CircularProgress size={24} style={{position: 'absolute'}}/>}
        </Box>
    )
}

export default React.memo(ButtonWithSpinner);