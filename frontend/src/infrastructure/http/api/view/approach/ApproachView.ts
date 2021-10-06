import {SectionTitleView} from "../section/SectionTitleView";
import {CategoryView} from "../category/CategoryView";
import {CoAuthorView} from "../authors/CoAuthorView";
import {ProtocolTitleView} from "../protocol/ProtocolTitleView";

export type ApproachView = {
    id: number,
    name: string,
    sections: SectionTitleView[],
    categories: CategoryView[],
    coAuthors: CoAuthorView[],
    protocols: ProtocolTitleView[],
}