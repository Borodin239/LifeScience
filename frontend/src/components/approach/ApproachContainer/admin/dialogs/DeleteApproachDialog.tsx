import React, {useState} from "react";
import {useAppDispatch} from "../../../../../redux/hooks";
import {useHistory} from "react-router-dom";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import handleErrors from "../../../../categories/handleErrors";
import DeleteDialog from "../../../../admin/dialogs/DeleteDialog";
import {deletePublicApproach} from "../../../../../redux/publicApproach/thunkActions";
import appRoutesNames from "../../../../../infrastructure/common/appRoutesNames";

const DeleteApproachDialog: React.FC<{
    id: number, onClose: () => void,
    isOpen: boolean, name: string,
}> = ({
          id,
          onClose,
          isOpen,
          name
      }) => {

    const dispatch = useAppDispatch()
    const history = useHistory()
    const [alertText, setAlertText] = useState<string | null>(null)

    const handleDeleteButton = () => {
        dispatch(deletePublicApproach(id.toString()))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => history.push(appRoutesNames.HOME))
            .then(() => onClose())
            .then(() => setAlertText(null))
            .catch(thunkError => {
                handleErrors(thunkError, history, dispatch, setAlertText)
            })
    }

    return (
        <DeleteDialog id={id} onClose={onClose} isOpen={isOpen} name={name} handleDeleteButton={handleDeleteButton}
                      type={'approach'} alertText={alertText} setAlertText={setAlertText}/>
    )
}
export default DeleteApproachDialog