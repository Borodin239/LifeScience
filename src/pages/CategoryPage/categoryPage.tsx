import React from "react";
import Location, {LocationUnit} from "../../components/categories/location";
import {useHistory} from "react-router-dom";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CatalogNodeList, {CatalogNode} from "../../components/categories/catalogNodeList";
import SubjectIcon from "@material-ui/icons/Subject";
import {FolderOutlined} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    breadCrumbs: {
        margin: theme.spacing(3, 0, 2)
    }
}));
const handleClick = () => console.log("Breadcrumb clicked")
const firstLocation: LocationUnit = {
    text: "Root",
    handleClick: handleClick,
}
const secondLocation: LocationUnit = {
    text: "Molecules",
    handleClick: handleClick,
}
const thirdLocation: LocationUnit = {
    text: "Quantitative analysis",
    handleClick: handleClick,
}
export const locationList = [firstLocation, secondLocation, thirdLocation]
//for demonstration purposes

const CategoryPage = () => {

    const classes = useStyles()


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
            <Box className={classes.breadCrumbs}>
                <Location locationList={locationList}/>
            </Box>
            <CatalogNodeList list={categoryList} icon={<FolderOutlined/>} type={"Categories"}/>
            <CatalogNodeList type={"Methods"} icon={<SubjectIcon/>} list={methodList}/>
        </Box>

    )
}

export default CategoryPage