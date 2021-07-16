import {makeStyles} from "@material-ui/core/styles";

export const useWelcomePanelStyles = makeStyles((theme) => ({
    mainContainer: {
        width: '100%',
        background: 'linear-gradient(270deg, rgba(0,0,255,.8), rgba(0,0,255,0)),' +
            '            linear-gradient(90deg, rgba(42, 116, 245, 0.8), rgba(0,0,255,0))',
        height: '500px',

    }

}));