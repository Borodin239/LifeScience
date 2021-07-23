import React, {useCallback, useEffect, useState} from "react";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";
import {useHistory, useParams} from "react-router-dom";
import {Box, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CatalogNodeList, {CatalogNode} from "../../components/categories/CatalogNodeList";
import SubjectIcon from "@material-ui/icons/Subject";
import {FolderOutlined} from "@material-ui/icons";
import AdminSettings from "../../components/categories/admin/AdminSettings/AdminSettings";
import {developmentLog} from "../../infrastructure/common/developmentLog";
import {useAppDispatch} from "../../redux/hooks";
import {getCategoryInfoThunk, getCategoryRootThunk} from "../../redux/categories/thunkActions";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {CategoryRootView} from "../../infrastructure/http/api/view/category/CategoryRootView";
import {ApproachView} from "../../infrastructure/http/api/view/approach/ApproachView";
import {pathMove, pathSwitch, ROOT_NAVIGATION_UNIT} from "../../redux/navigation/slice";
import {getRedirectionRoute, NavigationUnit} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import {CategoryView} from "../../infrastructure/http/api/view/category/CategoryView";
import {CategoryInfoView} from "../../infrastructure/http/api/view/category/CategoryInfoView";

const useStyles = makeStyles((theme) => ({
    upperBar: {
        margin: theme.spacing(3, 0, 2),
        width: '100%',
        display: "flex",
        justifyContent: 'space-between',
    },
}), {index: 1});

const CategoryPage = () => {
    const classes = useStyles();

    const params = useParams<{ categoryId: string }>();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const [isPending, setIsPending] = useState(false);

    const [categoryCatalog, setCategoryCatalog] = useState<CatalogNode[]>([]);
    const [approachCatalog, setApproachCatalog] = useState<CatalogNode[]>([]);

    const createCatalogNode = useCallback((type: "category" | "approach", view: ApproachView | CategoryView): CatalogNode => {
        const redirectionRoute = getRedirectionRoute("category", view.id);

        return {
            name: view.name,
            handleClick: () => {
                dispatch(pathMove({name: view.name, route: redirectionRoute, type: type} as NavigationUnit));
                history.push(redirectionRoute);
            }
        } as CatalogNode;
    }, [dispatch, history]);

    const processRoot = useCallback(() => {
        setIsPending(true);

        dispatch(getCategoryRootThunk())
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then((payload: CategoryRootView) => {
                setIsPending(false);
                dispatch(pathSwitch(ROOT_NAVIGATION_UNIT));
                setCategoryCatalog(payload.map(categoryView => createCatalogNode("category", categoryView)));
                setApproachCatalog([]);
            })
            .catch(thunkError => {
                setIsPending(false);
                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }, [createCatalogNode, dispatch, history]);

    const processCategoryWithId = useCallback((categoryId) => {
        setIsPending(true);

        dispatch(getCategoryInfoThunk(categoryId))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then((payload: CategoryInfoView) => {
                setIsPending(false);
                dispatch(pathSwitch({
                    name: payload.name,
                    type: "category",
                    route: getRedirectionRoute("category", categoryId)
                }));

                setCategoryCatalog(payload.subCategories.map(categoryView => createCatalogNode("category", categoryView)));
                setApproachCatalog(payload.approaches.map(approachView => createCatalogNode("approach", approachView)));
            })
            .catch(thunkError => {
                setIsPending(false);
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 404) {
                    history.push(ROOT_NAVIGATION_UNIT.route);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            });
    }, [createCatalogNode, dispatch, history]);

    useEffect(() => {
        developmentLog(`targetPlotsParams: ${JSON.stringify(params)}`);

        let id = parseInt(params.categoryId);

        if (Number.isNaN(id)) {
            processRoot();
        } else {
            processCategoryWithId(id);
        }
    }, [params, processCategoryWithId, processRoot]);

    return (
        <Box>
            <Box className={classes.upperBar}>
                <GlobalUserLocation/>
                <AdminSettings/> {/*todo only visible to admins*/}
            </Box>
            {
                isPending ?
                    <CircularProgress color="primary" /> :
                    <>
                        <CatalogNodeList list={categoryCatalog} icon={<FolderOutlined/>} type={"Categories"}/>
                        <CatalogNodeList type={"Methods"} icon={<SubjectIcon/>} list={approachCatalog}/>
                    </>
            }
        </Box>
    )
}

export default CategoryPage
