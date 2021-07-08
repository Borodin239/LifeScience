import "jest-extended";
import apiConstants from "../../infrastructure/http/api/apiConstants";

describe('ApiError message creating', () => {
    beforeEach(() => {
        jest.mock('../../infrastructure/http/api/apiErrorsInfo', () => ({
                apiErrorsInfo: new Map([
                    [0, {
                        argumentsNumber: 3,
                        messagePattern: "User $0 has no $1 for $2 operation"
                    }]
                ])
            })
        )
    })


    it('Default message on unexpected code', () => {
        const {createApiErrorMessage} = require('../../infrastructure/http/api/utils/apiErrorMessageUtils')

        expect(createApiErrorMessage({
            systemCode: 1,
            arguments: [["masha"], ["apples", "bananas"]]
        })).toBe(apiConstants.DEFAULT_ERROR_MESSAGE);
    });

    it('No throw on unexpected args', () => {
        const {createApiErrorMessage} = require('../../infrastructure/http/api/utils/apiErrorMessageUtils')

        expect(() => createApiErrorMessage({
            systemCode: 0,
            arguments: [["masha"], ["apples", "bananas"]]
        })).not.toThrowError();
    });

    it('Successful substitution', () => {
        const {createApiErrorMessage} = require('../../infrastructure/http/api/utils/apiErrorMessageUtils')

        expect(createApiErrorMessage({
            systemCode: 0,
            arguments: [["masha"], ["apples", "bananas"], ["trading"]]
        })).toBe("User masha has no apples, bananas for trading operation");
    });
})
