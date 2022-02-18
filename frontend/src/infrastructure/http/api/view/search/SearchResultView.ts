import {CategorySearchResultView} from "./CategorySearchResultView/CategorySearchResultView";
import {ApproachSearchResultView} from "./ApproachSearchResultView/ApproachSearchResultView";
import {ProtocolSearchResultView} from "./ProtocolSearchResultView/ProtocolSearchResultView";

export type SearchResultView = CategorySearchResultView | ApproachSearchResultView | ProtocolSearchResultView

export type SearchSuggestResultView = {
    "publicApproachId": number,
    "name": string,
    "typeName": string
}