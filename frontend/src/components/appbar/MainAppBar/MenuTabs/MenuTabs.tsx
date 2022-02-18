import {Link} from "react-router-dom";
import appRoutesNames from "../../../../infrastructure/common/appRoutesNames";
import useMenuTabsStyles from "./useMenuTabsStyles";

export const MenuTabs = () => {

    const classes = useMenuTabsStyles()

    const voidTab = {name: '', link: ''}
    const tabs = [{name: 'METHODS', link: `${appRoutesNames.CATEGORIES}/`},
        voidTab, voidTab, voidTab, voidTab]

    return (
        <div className={classes.main}>
            {tabs.map((t, index) => <Link to={t.link} className={classes.tab} key={index}>{t.name}</Link>)}
        </div>
    )
}