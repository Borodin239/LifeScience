import React from "react";
import Location, {LocationUnit} from "../../components/categories/location";
import {useHistory} from "react-router-dom";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CatalogNodeList, {CatalogNode} from "../../components/categories/catalogNodeList";
import SubjectIcon from "@material-ui/icons/Subject";
import {FolderOutlined} from "@material-ui/icons";
import AdminSettings from "../../components/categories/admin/AdminSettings/AdminSettings";

const useStyles = makeStyles((theme) => ({
    upperBar: {
        margin: theme.spacing(3, 0, 2),
        width: '100%',
        display: "flex",
        justifyContent: 'space-between',
    },
}), {index: 1});

const CategoryPage = () => {
    const history = useHistory()
    const handleClick = () => history.push("/sign-in")
    const classes = useStyles()
    const firstLocation: LocationUnit = {
        text: "First",
        handleClick: handleClick,
    }
    const secondLocation: LocationUnit = {
        text: "Second",
        handleClick: handleClick,
    }
    const thirdLocation: LocationUnit = {
        text: "Third",
        handleClick: handleClick,
    }
    //for demonstration purposes

    const emptyCallback = () => {
    }
    const categoryList: CatalogNode[] = [
        {
            name: "Proteins",
            handleClick: emptyCallback,
        },
        {
            name: "Lipids",
            handleClick: emptyCallback,
        },
        {
            name: "Amino acids",
            handleClick: emptyCallback,
        }
    ]

    const methodList: CatalogNode[] = [
        {
            name: "Bradford assay",
            handleClick: emptyCallback,
        }
    ]

    return (
        <Box>
            <Box className={classes.upperBar}>
                <Location locationList={[firstLocation, secondLocation, thirdLocation]}/>
                <AdminSettings/> {/*todo only visible to admins*/}
            </Box>
            <CatalogNodeList list={categoryList} icon={<FolderOutlined/>} type={"Categories"}/>
            <CatalogNodeList type={"Methods"} icon={<SubjectIcon/>} list={methodList}/>
        </Box>

    )
}

export default CategoryPage