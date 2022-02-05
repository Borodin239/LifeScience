import React, {useState} from "react";
import {CategoryDialogProps} from "../CreateCategory/CreateCategoryDialog";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {deleteCategory} from "../../../../../redux/categories/thunkActions";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import {useHistory} from "react-router-dom";
import apiConstants from "../../../../../infrastructure/http/api/apiConstants";
import {pathMove} from "../../../../../redux/navigation/slice";
import {getRedirectionRoute} from "../../../../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import handleErrors from "../../../handleErrors";
import DeleteDialog from "../../../../admin/dialogs/DeleteDialog";

const DeleteCategoryDialog: React.FC<CategoryDialogProps> = ({
                                                                 categoryId,
                                                                 onClose,
                                                                 isOpen,
                                                                 categoryName
                                                             }) => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const [alertText, setAlertText] = useState<string | null>(null)
    const parentId = useAppSelector(state => state.navigationReducer.path).map(i => i.route.split("/").pop()).reverse()[1]
    const parentName = useAppSelector(state => state.navigationReducer.path).map(i => i.name).reverse()[1]

    const handleDeleteButton = () => {
        dispatch(deleteCategory(categoryId.toString()))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => dispatch(pathMove({
                    name: parentName,
                    route: getRedirectionRoute({type: 'category', categoryId: parentId!}),
                    type: 'category'
                }))
            )
            .then(payload => splitThunkPayload(payload))
            .then(() => history.replace(`${apiConstants.routes.categories.INITIAL}/${parentId}`))
            .then(() => onClose())
            .then(() => setAlertText(null))
            .catch(thunkError => {
                handleErrors(thunkError, history, dispatch, setAlertText)
            })
    }

    return (
        <DeleteDialog id={categoryId} onClose={onClose} isOpen={isOpen} name={categoryName}
                      handleDeleteButton={handleDeleteButton}
                      type={'category'} alertText={alertText} setAlertText={setAlertText}/>
    )
}
export default DeleteCategoryDialog
