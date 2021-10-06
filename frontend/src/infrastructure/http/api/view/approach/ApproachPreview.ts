import {SectionTitleView} from "../section/SectionTitleView";
import {ProtocolTitleView} from "../protocol/ProtocolTitleView";

export type ApproachPreview = {
    name: string,
    sections: SectionTitleView[],
    protocols: ProtocolTitleView[],
}