import {AliasDto} from "../aliases/AliasDto";

export type UpdateCategoryDto = {
    name: string,
    aliases: AliasDto[],
    parentsToAdd: [number] | [],
    parentsToDelete: [number] | []
}