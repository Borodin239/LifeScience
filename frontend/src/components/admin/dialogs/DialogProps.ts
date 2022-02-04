import {CategoryView} from "../../../infrastructure/http/api/view/category/CategoryView";

export type DialogProps = {
    id: number,
    onClose: () => void,
    isOpen: boolean,
    name?: string,
    setName?: (categoryName: string) => void,
    handleDeleteButton: () => void,
    type: "category" | "approach",
    updateCategoryCatalog?: (categoryCatalog: CategoryView) => void,
    alertText: string | null,
    setAlertText: (alertText: string | null) => void,
}