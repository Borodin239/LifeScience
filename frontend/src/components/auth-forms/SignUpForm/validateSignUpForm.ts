import validateWithPattern from "../../../infrastructure/ui/utils/validation/validateWithPattern";
import {RegexpPatternVariants} from "../../../infrastructure/ui/utils/validation/regexpPatternsInfo";
import {ValidationError} from "../../../infrastructure/common/exceptions/ValidationError";

const validateSignUpForm = (
    email: string,
    password: string,
    repeat: string) => {
    validateWithPattern([
        {fieldName: 'email', fieldValue: email, patternVariant: RegexpPatternVariants.EMAIL},
        {fieldName: 'password', fieldValue: password, patternVariant: RegexpPatternVariants.PASSWORD}
    ]);

    if (password !== repeat)
        throw new ValidationError('Passwords don\'t match');
}

export default validateSignUpForm;
