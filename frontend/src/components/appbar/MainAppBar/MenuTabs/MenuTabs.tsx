import {Link} from "react-router-dom";
import appRoutesNames from "../../../../infrastructure/common/appRoutesNames";
import useMenuTabsStyles from "./useMenuTabsStyles";
import {Box} from "@material-ui/core";

export const MenuTabs = () => {

    const classes = useMenuTabsStyles()

    const tabs = [{name: 'methods', link: `${appRoutesNames.CATEGORIES}/`},
        {name: 'models', link: ''}, {name: 'reagents', link: ''},
        {name: 'equipment', link: ''}, {name: 'objects', link: ''}]

    return (
        <Box className={classes.main}>
            {tabs.map((t, index) => <Link to={t.link} className={classes.tab} key={index}>{t.name}</Link>)}
        </Box>
    )
}