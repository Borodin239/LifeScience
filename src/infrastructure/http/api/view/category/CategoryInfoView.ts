import {ApproachView} from "../approach/ApproachView";
import {CategoryView} from "./CategoryView";

export type CategoryInfoView = {
    name: string,
    aliases: string,
    creationDate: string,
    subCategories: CategoryView[],
    approaches: ApproachView[]
};
