import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../infrastructure/ui/themes/uiConstants";

export const useAppStyles = makeStyles((theme) => ({
    fixedWidth: {
        // width: uiConstants.width,
        // backgroundOrigin: 'border-box',
        // padding: '20px',
        // margin: "auto",
        background: 'white',
        display: 'flex',
        flexDirection: "column",
        flexGrow: 1,
        zIndex: 10
    },
    main: {
        background: 'linear-gradient(180deg, #120D43 30.17%, rgba(18, 13, 67, 0.93) 50.88%, #173488 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'flex-start'
    }

}), {index: 1});