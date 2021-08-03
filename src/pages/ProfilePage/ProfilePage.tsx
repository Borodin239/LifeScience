import {Box, Typography} from "@material-ui/core";
import {useProfilePageStyles} from "./useProfilePageStyles";


const ProfilePage = () => {

    const classes = useProfilePageStyles()

    return (
        <Box>
            <Box className={classes.titleContainer}>
                <Typography variant={'h5'}>
                    My profile
                </Typography>
            </Box>
            <Box>

            </Box>
        </Box>
    )
}

export default ProfilePage
