import validateWithPattern from "../../infrastructure/ui/utils/validation/validateWithPattern";
import {RegexpPatternVariants} from "../../infrastructure/ui/utils/validation/regexpPatternsInfo";
import {ValidationError} from "../../infrastructure/common/exceptions/ValidationError";

describe('Pattern validation', () => {
    // it('No variant no throw', () => {
    //     expect(() =>
    //         validateWithPattern("email", "@@@", RegexpPatternVariants.CATEGORY_APPROACH_PROTOCOL_NAME)
    //     ).not.toThrowError();
    // });

    it('Correct validation error', () => {
        expect(() =>
            validateWithPattern([{fieldName: "email", fieldValue: "@@@", patternVariant: RegexpPatternVariants.EMAIL}])
        ).toThrowError(new ValidationError('Field email must be valid'));
    });
    it('Correct validation pass', () => {
        expect(() =>
            validateWithPattern([{fieldName: "email", fieldValue: "khabib@gmail.com", patternVariant: RegexpPatternVariants.EMAIL}])
        ).not.toThrowError();
    });
});
