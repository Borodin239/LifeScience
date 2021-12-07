import {alpha, makeStyles} from "@material-ui/core/styles";

export const useBasicModalWindowStyles = makeStyles((theme) => ({
        modal: {
            position: "fixed",
            //  display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            pointerEvents: "none",
            borderRadius: 12,
        },
        modal__active: {
            position: "fixed",
            // display: "flex",
            alignItems: 'center',
            justifyContent: "center",
            opacity: 1,
            pointerEvents: "all",
            borderRadius: 12,
        },
        modal__content: {
            // display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            height: 400,
            padding: 20,
            borderRadius: 12,
            //   transition: "0.5",
            //   transform: "scale(0.5)"
        },
        modal__content__active: {
            // display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.spacing(100),
            background: 'rgba(0, 0, 255, 1)',
            height: 400,
            padding: 20,
            borderRadius: 60,
            borderColor: theme.palette.primary.dark
        }


    }), {index: 1}
);