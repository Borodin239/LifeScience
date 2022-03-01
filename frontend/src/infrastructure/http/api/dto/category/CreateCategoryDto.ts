import { AliasDto } from "../aliases/AliasDto";

export type CreateCategoryDto = {
    name: string,
    aliases: AliasDto[],
    initialParentId: string
}