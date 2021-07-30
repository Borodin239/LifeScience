import React, {useCallback, useEffect, useMemo, useState} from "react";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";
import {useHistory, useParams} from "react-router-dom";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CatalogNodeList, {CatalogNode} from "../../components/categories/CatalogNodeList";
import SubjectIcon from "@material-ui/icons/Subject";
import {FolderOutlined} from "@material-ui/icons";
import CategoryAdminSettings from "../../components/categories/admin/AdminSettings/CategoryAdminSettings";
import {developmentLog} from "../../infrastructure/common/developmentLog";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getCategoryInfoThunk, getCategoryRootThunk} from "../../redux/categories/thunkActions";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {CategoryRootView} from "../../infrastructure/http/api/view/category/CategoryRootView";
import {ApproachView} from "../../infrastructure/http/api/view/approach/ApproachView";
import {pathMove, pathSwitch, ROOT_NAVIGATION_UNIT} from "../../redux/navigation/slice";
import {getRedirectionRoute, NavigationUnit} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import {CategoryView} from "../../infrastructure/http/api/view/category/CategoryView";
import {CategoryInfoView} from "../../infrastructure/http/api/view/category/CategoryInfoView";
import Location from "../../components/navigation/Location";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {sortBy} from "lodash";

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

    const [isLoading, setIsLoading] = useState(true);

    const [categoryCatalog, setCategoryCatalog] = useState<CatalogNode[]>([]);
    const [approachCatalog, setApproachCatalog] = useState<CatalogNode[]>([]);

    const sortedCategoryCatalog = useMemo(() => {
        return sortBy(categoryCatalog, (elem: CatalogNode) => elem.name);
    }, [categoryCatalog]);

    const sortedApproachCatalog = useMemo(() => {
        return sortBy(approachCatalog, (elem: CatalogNode) => elem.name);
    }, [approachCatalog]);

    const userRoles = useAppSelector(state => state.usersReducer.userInfo?.roles);

    const createCatalogNode = useCallback((type: "category" | "approach", view: ApproachView | CategoryView): CatalogNode => {
        const redirectionRoute = type === 'category'
            ? getRedirectionRoute({type: type, categoryId: `${view.id}`})
            : getRedirectionRoute({type: type, approachId: `${view.id}`})

        return {
            name: view.name,
            handleClick: () => {
                dispatch(pathMove({name: view.name, route: redirectionRoute, type: type} as NavigationUnit));
                history.push(redirectionRoute);
            }
        } as CatalogNode;
    }, [dispatch, history]);

    const processRoot = useCallback(() => {
        setIsLoading(true);

        dispatch(getCategoryRootThunk())
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then((payload: CategoryRootView) => {
                dispatch(pathSwitch(ROOT_NAVIGATION_UNIT));
                setCategoryCatalog(payload.map(categoryView => createCatalogNode("category", categoryView)));
                setApproachCatalog([]);
                setIsLoading(false);
            })
            .catch(thunkError => {
                setIsLoading(false);
                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }, [createCatalogNode, dispatch, history]);

    const processCategoryWithId = useCallback((categoryId) => {
        setIsLoading(true);

        dispatch(getCategoryInfoThunk(categoryId))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then((payload: CategoryInfoView) => {
                dispatch(pathSwitch({
                    name: payload.name,
                    type: "category",
                    route: getRedirectionRoute({type: "category", categoryId: `${categoryId}`})
                }));
                setCategoryCatalog(payload.subCategories.map(categoryView => createCatalogNode("category", categoryView)));
                setApproachCatalog(payload.approaches.map(approachView => createCatalogNode("approach", approachView)));
                setIsLoading(false);
            })
            .catch(thunkError => {
                setIsLoading(false);
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
                {isLoading ? <Location locationList={[]}/> : <GlobalUserLocation/>}
                {(userRoles && userRoles.includes("ROLE_ADMIN")) ?
                    <CategoryAdminSettings categoryId={parseInt(params.categoryId)}/> : null}
            </Box>
            {
                isLoading ?
                    <CenteredLoader/> :
                    <>
                        <CatalogNodeList list={sortedCategoryCatalog} icon={<FolderOutlined/>} type={"Categories"}/>
                        <CatalogNodeList list={sortedApproachCatalog} icon={<SubjectIcon/>} type={"Methods"}/>
                    </>
            }
        </Box>
    )
}

export default CategoryPage
