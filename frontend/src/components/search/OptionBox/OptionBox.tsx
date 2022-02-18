import {Box} from "@material-ui/core";
import uiConstants from "../../../infrastructure/ui/themes/uiConstants";
import Typography from "@material-ui/core/Typography";
import {useOptionBoxStyles} from "./useOptionBoxStyles";

type OptionBoxProps = {
    label: string,
    icon: JSX.Element
}

const OptionBox = ({label, icon}: OptionBoxProps) => {
    const classes = useOptionBoxStyles()

    return (
        <Box className={classes.container}>
            <Box className={classes.icon}>
                {icon}
            </Box>
            <Box>
                <Typography style={{
                    verticalAlign: "middle",
                    color: uiConstants.darkBlue,
                    textTransform: 'uppercase'
                }}>
                    {label}
                </Typography>
            </Box>
        </Box>
    )
}
export default OptionBox