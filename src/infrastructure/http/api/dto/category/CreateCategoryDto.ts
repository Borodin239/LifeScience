import { AliasDto } from "../aliases/AliasDto";

export type CreateCreationDto = {
    name: string,
    aliases: AliasDto[]
}
