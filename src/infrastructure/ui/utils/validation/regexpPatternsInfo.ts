export type RegexpValidationPattern = {
    pattern: RegExp,
    // field fieldName must be [description]
    description: string
}

export enum RegexpPatternVariants {
    EMAIL,
    CATEGORY_APPROACH_PROTOCOL_NAME
}

const regexpPatternsInfo = new Map<RegexpPatternVariants, RegexpValidationPattern>([
    [RegexpPatternVariants.EMAIL, {
        pattern: new RegExp('^[\\w!#$%&\'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&\'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$'),
        description: 'valid'
    }],
    // [RegexpPatternVariants.CATEGORY_APPROACH_PROTOCOL_NAME, {
    //     pattern: new RegExp('^[\\w!#$%&\'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&\'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$'),
    //     description: 'not empty'
    // }]
]);

export default regexpPatternsInfo;
