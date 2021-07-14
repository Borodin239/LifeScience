export type RegexpValidationPattern = {
    pattern: RegExp,
    // field fieldName must [description]
    description: string
}

export enum RegexpPatternVariants {
    EMAIL,
    PASSWORD,
    PERSONAL_NAME,
    CATEGORY_APPROACH_PROTOCOL_NAME
}

const regexpPatternsInfo = new Map<RegexpPatternVariants, RegexpValidationPattern>([
    [RegexpPatternVariants.EMAIL, {
        pattern: new RegExp('^[\\w!#$%&\'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&\'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$'),
        description: 'be valid'
    }],
    [RegexpPatternVariants.PASSWORD, {
        pattern: new RegExp('^[a-zA-Z0-9.\\-\\/+=@_]{5,30}$'),
        description: 'have 5-30 symbols and consist of latin letters, digits and special symbols (-, +, =, @, _)'
    }],
    [RegexpPatternVariants.PERSONAL_NAME, {
        pattern: new RegExp('^[a-zA-Z]{2,30}$'),
        description: 'have 2-30 symbols and consist of latin letters'
    }],
    [RegexpPatternVariants.CATEGORY_APPROACH_PROTOCOL_NAME, {
        pattern: new RegExp('\\S.{1,58}\\S'),
        description: 'have 1-58 symbols and not start or end with a whitespace'
    }]
]);

export default regexpPatternsInfo;
