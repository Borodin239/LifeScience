import regexpPatternsInfo, {RegexpPatternVariants} from "./regexpPatternsInfo";
import {ValidationError} from "../../../common/exceptions/ValidationError";

type PatternValidationDescription = {
    fieldName: string,
    fieldValue: string,
    patternVariant: RegexpPatternVariants
}

const validateWithPattern = (descriptions: PatternValidationDescription[]) => {
    descriptions.forEach(({fieldName, fieldValue, patternVariant}) => {
        let regexpPatternInfo = regexpPatternsInfo.get(patternVariant);

        if (regexpPatternInfo && !(regexpPatternsInfo.get(patternVariant)?.pattern.test(fieldValue))) {
            throw new ValidationError(`Field ${fieldName} must ${regexpPatternInfo.description}`);
        }
    });
}

export default validateWithPattern;
