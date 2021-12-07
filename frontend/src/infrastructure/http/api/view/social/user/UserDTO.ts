export type UserDTO = {
    firstName: string,
    lastName: string,
    doctoralDegree: boolean,
    academicDegree: string,
    organisations:
        [
            {
                id: number
            }
        ],
    about: string,
    orcid: string,
    researchId: string
};