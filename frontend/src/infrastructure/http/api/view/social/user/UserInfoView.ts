export type PersonalData = {
    firstName: string,
    lastName: string,
    organisations: OrganisationBaseInfoView[],
    orcid: string,
    doctorDegree: boolean,
    academicDegree: string,
    favouriteGroup: GroupBaseInfoView,
    "about": string,
    "researchId": string
}

export type UserInfoView = {
    id: string,
    email: string,
    roles: ("ROLE_USER" | "ROLE_ADMIN" | "ROLE_MODERATOR")[],
    personalData: PersonalData
};

export type GroupBaseInfoView = {
    id: number,
    name: string
};

export type OrganisationBaseInfoView = {
    id: number,
    name: string
};
