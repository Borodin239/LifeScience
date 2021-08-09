import {makeStyles} from "@material-ui/core/styles";

export const usePathsStyles = makeStyles((theme) => ({

    showPathsText: {
        cursor: "pointer",
        "&:hover": {
            color: theme.palette.common.black
        }
    }
}), {index: 1});