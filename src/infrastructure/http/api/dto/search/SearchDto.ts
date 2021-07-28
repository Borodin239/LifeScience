import {SearchType} from "../../../../../redux/search/slice";

export type SearchDto = {
    text: string,
    includeTypes?: SearchType[],
    size?: number,
    from?: number
}