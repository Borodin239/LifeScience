import {makeStyles} from "@material-ui/core/styles";

export const useAppStyles = makeStyles(() => ({
    fixedWidth: {
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
        flexDirection: 'column'
    }

}), {index: 1});