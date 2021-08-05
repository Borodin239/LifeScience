export enum SearchType {
    CATEGORY = "CATEGORY", APPROACH = "APPROACH", PROTOCOL = "PROTOCOL"
}

export type SearchDto = {
    text: string,
    includeTypes?: SearchType[],
    size?: number,
    from?: number
}
