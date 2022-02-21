import React, {useCallback, useEffect, useMemo, useState} from "react";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";
import {useHistory, useParams} from "react-router-dom";
import {Box} from "@material-ui/core";
import CatalogNodeList, {CatalogNode} from "../../components/categories/CatalogNodeList";
import CategoryAdminSettings from "../../components/categories/admin/AdminSettings/CategoryAdminSettings";
import {developmentLog} from "../../infrastructure/common/developmentLog";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getCategoryInfoThunk, getCategoryPathsThunk, getCategoryRootThunk} from "../../redux/categories/thunkActions";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {CategoryRootView} from "../../infrastructure/http/api/view/category/CategoryRootView";
import {ApproachView} from "../../infrastructure/http/api/view/approach/ApproachView";
import {pathMove, pathSwitch, ROOT_NAVIGATION_UNIT, setPath} from "../../redux/navigation/slice";
import {getRedirectionRoute, NavigationUnit} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import {CategoryView} from "../../infrastructure/http/api/view/category/CategoryView";
import {CategoryInfoView} from "../../infrastructure/http/api/view/category/CategoryInfoView";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {sortBy} from "lodash";
import {useCategoryPageStyles} from "./useCategoryPageStyles";
import Typography from "@material-ui/core/Typography";

const CategoryPage = () => {
    const classes = useCategoryPageStyles()

    const {categoryId} = useParams<{ categoryId: string }>();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const [isCategoryLoading, setIsCategoryLoading] = useState(true);
    const [isLocationLoading, setIsLocationLoading] = useState(true);

    const [categoryName, setCategoryName] = useState<string | null>(null);

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
        setIsCategoryLoading(true);

        dispatch(getCategoryRootThunk())
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then((payload: CategoryRootView) => {
                dispatch(pathSwitch(ROOT_NAVIGATION_UNIT));
                setCategoryCatalog(payload.map(categoryView => createCatalogNode("category", categoryView)));
                setApproachCatalog([]);
                setIsCategoryLoading(false);
            })
            .catch(thunkError => {
                setIsCategoryLoading(false);
                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }, [createCatalogNode, dispatch, history]);

    const path = useAppSelector(state => state.navigationReducer.path);

    const processCategoryWithId = useCallback((categoryId) => {
        setIsCategoryLoading(true);

        dispatch(getCategoryInfoThunk(categoryId))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then((payload: CategoryInfoView) => {
                setCategoryCatalog(payload.subCategories.map(categoryView => createCatalogNode("category", categoryView)));
                setApproachCatalog(payload.approaches.map(approachView => createCatalogNode("approach", approachView)));
                setIsCategoryLoading(false);
                setCategoryName(payload.name);
            })
            .catch(thunkError => {
                setIsCategoryLoading(false);
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 404) {
                    history.push(ROOT_NAVIGATION_UNIT.route);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            });
    }, [createCatalogNode, dispatch, history]);

    const updateCategoryCatalog = (categoryView: CategoryView) => {
        setCategoryCatalog([createCatalogNode("category", categoryView), ...categoryCatalog])
    }

    useEffect(() => {
        developmentLog(`targetPlotsParams: ${JSON.stringify(categoryId)}`);

        let id = parseInt(categoryId);

        if (Number.isNaN(id)) {
            setCategoryName(ROOT_NAVIGATION_UNIT.name)
            processRoot();
        } else {
            processCategoryWithId(id);
        }
    }, [categoryId, processCategoryWithId, processRoot]);

    useEffect(() => {
        if (!categoryName) {
            return
        }
        const unitRoute = getRedirectionRoute({type: "category", categoryId: categoryId});
        if (categoryId && path[path.length - 1]?.route !== unitRoute) {
            setIsLocationLoading(true)
            dispatch(getCategoryPathsThunk({id: categoryId, name: categoryName}))
                .unwrap()
                .then(payload => splitThunkPayload(payload))
                .then(pathPayload => {
                    dispatch(setPath({pathUnits: pathPayload}))
                    setIsLocationLoading(false)
                })
        } else {
            setIsLocationLoading(false)
        }
        // eslint-disable-next-line
    }, [dispatch, categoryName, categoryId]);

    if (isCategoryLoading && isLocationLoading) {
        return <CenteredLoader className={classes.upperLoader}/>;
    }

    return (
        <Box className={classes.main}>
            {
                isLocationLoading
                    ?
                    (
                        <CenteredLoader className={classes.upperLoader}/>
                    )
                    :
                    (
                        <Box className={classes.upperBar}>
                            <GlobalUserLocation/>
                            {(userRoles && userRoles.includes("ROLE_ADMIN")) ?
                                <CategoryAdminSettings categoryId={parseInt(categoryId)}
                                                       categoryName={categoryName!}
                                                       setCategoryName={setCategoryName}
                                                       updateCategoryCatalog={updateCategoryCatalog}
                                                       isVoid={categoryCatalog.length === 0}
                                /> : null}
                        </Box>
                    )
            }
            {
                isCategoryLoading ? <CenteredLoader/> :
                    (
                        <>
                            <CatalogNodeList list={sortedCategoryCatalog}
                                             isRootCategory={categoryName === ROOT_NAVIGATION_UNIT.name}/>

                            {categoryName !== ROOT_NAVIGATION_UNIT.name &&
                                <>
                                    <Typography style={{color: 'white'}}>
                                        METHODS
                                    </Typography>
                                    <CatalogNodeList list={sortedApproachCatalog} isRootCategory={false}/>
                                </>
                            }
                        </>
                    )
            }
        </Box>
    )
}

export default CategoryPage
