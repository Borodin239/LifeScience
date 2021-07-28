export type UserInfoView = {
    id: number,
    email: string,
    roles: "ROLE_USER" | "ROLE_ADMIN" | "ROLE_MODERATOR",
    personalData:
        {
            firstName: string,
            lastName: string,
            organisations: OrganisationBaseInfoView[],
            orcid: string,
            doctorialDegree: boolean,
            academicDegree: string,
            favouriteGroup: GroupBaseInfoView,
            "about": string,
            "researchId": string
        }
};

export type GroupBaseInfoView = {
    id: number,
    name: string
};

export type OrganisationBaseInfoView = {
    id: number,
    name: string
};
