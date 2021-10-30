import {SectionTitleView} from "../section/SectionTitleView";
import {CoAuthorView} from "../authors/CoAuthorView";


export type DraftProtocolView = {
    id: string,
    name: string,
    approach: {
        name: string,
        id: string,
    },
    sections: SectionTitleView[],
    participants: CoAuthorView[],
}