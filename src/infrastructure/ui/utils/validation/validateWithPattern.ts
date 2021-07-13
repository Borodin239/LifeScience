import regexpPatternsInfo, {RegexpPatternVariants} from "./regexpPatternsInfo";
import {ValidationError} from "../../../common/exceptions/ValidationError";

const validateWithPattern = (fieldName: string, fieldValue: string, patternVariant: RegexpPatternVariants) => {
    let regexpPatternInfo = regexpPatternsInfo.get(patternVariant);

    if (regexpPatternInfo && !(regexpPatternsInfo.get(patternVariant)?.pattern.test(fieldValue))) {
        throw new ValidationError(`Field ${fieldName} must be ${regexpPatternInfo.description}`);
    }
}

export default validateWithPattern;
