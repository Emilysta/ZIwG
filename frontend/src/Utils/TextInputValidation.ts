export interface ValidationFun {
    (value: string): string | null
}

export const isRequired: ValidationFun = (value) =>
    value.length <= 0 ? 'This field is required' : null

export const containLower: ValidationFun = (value) =>
    value.match(/[a-z]/g) ? null : "Password must contain at least one lower case letter"

export const containUpper: ValidationFun = (value) =>
    value.match(/[A-Z]/g) ? null : "Password must contain at least one upper case letter"

export const containNumber: ValidationFun = (value) =>
    value.match(/[1234567890]/g) ? null : "Password must contain at least one number"

export const containSymbol: ValidationFun = (value) =>
    value.match(/[#?!@$%^&*-]/g) ? null : "Password must contain at least one symbol"

export const passwordLength: ValidationFun = (value) =>
    value.length > 8 ? null : "Password must contain at least 8 symbols"

export const validLogin: ValidationFun = (value) =>
    value.length < 5 ? 'Too short' : null

export const validEmail: ValidationFun = (value) =>
    value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/) ? null : "Wrong email"

export const passwordValidate = [isRequired,containLower, containUpper, containNumber, containSymbol, passwordLength]
