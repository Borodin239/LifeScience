import {SectionTitleView} from "../section/SectionTitleView";
import {CoAuthorView} from "../authors/CoAuthorView";


export type ProtocolView = {
    id: string,
    name: string,
    approach: {
        name: string,
        id: string,
    },
    sections: SectionTitleView[],
    coAuthors: CoAuthorView[],
}