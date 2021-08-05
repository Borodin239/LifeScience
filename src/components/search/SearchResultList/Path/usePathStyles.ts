import {makeStyles} from "@material-ui/core/styles";

export const usePathStyles = makeStyles((theme) => ({
    unit: {
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    }

}), {index: 1});