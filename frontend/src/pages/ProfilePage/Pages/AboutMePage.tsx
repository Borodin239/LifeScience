import {Box, Divider, List, ListItem, Typography} from "@material-ui/core";
import UserInfoTitle from "../../../components/profile/UserInfoTitle/UserInfoTitle";
import UserInfoText from "../../../components/profile/UserInfoText/UserInfoText";
import { UserInfoView } from "../../../infrastructure/http/api/view/social/user/UserInfoView";
import { ClassNameMap } from "@material-ui/styles";

// TODO :: возможность редактирования
export const AboutMePage = (userInfo: UserInfoView | null, classes: ClassNameMap<"button" | "titleContainer" | "infoListContainer" | "divider" | "infoRow" | "protocolsPanel" | "protocolsTitle" | "protocolTitle">) => {
    return (
        <Box>
            <Box className={classes.titleContainer}>
                <Typography variant={'h5'}>
                    About me
                </Typography>
                <Divider className={classes.divider} style={{width: '20%'}}/>
            </Box>
            <Box style={{marginLeft: "10px"}}>
                <Box className={classes.infoListContainer}>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'First name:'}/>
                        <UserInfoText text={userInfo?.personalData.firstName}/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Last name:'}/>
                        <UserInfoText text={userInfo?.personalData.lastName}/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Email:'}/>
                        <UserInfoText text={userInfo?.email}/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Roles:'}/>
                        <UserInfoText text={userInfo ? userInfo.roles.join(', ') : ''}/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Place of current employment:'}/>
                        <UserInfoText text="abs"/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Country:'}/>
                        <UserInfoText text="abs"/>
                    </Box>
                </Box>

                {/*<Box className={classes.protocolsPanel}>*/}
                    {/*<Box>*/}
                    {/*    <Typography className={classes.protocolsTitle}>*/}
                    {/*        My draft protocols:*/}
                    {/*    </Typography>*/}
                    {/*</Box>*/}
                    {/*<Box style={{marginLeft: "5px"}}>*/}
                    {/*    <List>*/}
                    {/*        {*/}
                    {/*            protocols.map((protocol, index) => (*/}
                    {/*                <ListItem key={index}>*/}
                    {/*                    <Typography onClick={handleDraftProtocolClick(protocol.id)}*/}
                    {/*                                className={classes.protocolTitle}>*/}
                    {/*                        {protocol.name}*/}
                    {/*                    </Typography>*/}
                    {/*                </ListItem>*/}
                    {/*            ))*/}
                    {/*        }*/}
                    {/*    </List>*/}
                    {/*</Box>*/}
                {/*</Box>*/}
            </Box>
        </Box>
    )
}