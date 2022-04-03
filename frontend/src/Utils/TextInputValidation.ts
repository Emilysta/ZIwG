export class Validator {
    private rules: ValidationFun[];
    private source: () => string;

    constructor(...rules: ValidationFun[]) {
        this.rules = rules;
    }

    injectSource(source: () => string) {
        this.source = source;
    }

    validate(): string | null {
        if (this.rules)
            for (const rule of this.rules) {
                const val = rule(this.source())
                if (val != null)
                    return val
            }
        return null
    }

    isValid(): boolean {
        return this.validate() == null
    }
}

export interface ValidationFun {
    (value: string): string | null
}

export const containLower: ValidationFun = (value) =>
    value.match(/[a-z]/g) ? null : "Password must contain at lest one lower case letter"

export const containUpper: ValidationFun = (value) =>
    value.match(/[A-Z]/g) ? null : "Password must contain at lest one upper case letter"

export const containNumber: ValidationFun = (value) =>
    value.match(/[1234567890]/g) ? null : "Password must contain at lest one number"

export const containSymbol: ValidationFun = (value) =>
    value.match(/[#?!@$%^&*-]/g) ? null : "Password must contain at lest one symbol"

export const passwordLength: ValidationFun = (value) =>
    value.length > 8 ? null : "Password must contain at least 8 symbols"

export const validLogin: ValidationFun = (value) =>
    value.length < 5 ? 'Too short' : null

export const validEmail: ValidationFun = (value) =>
    value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/) ? null : "Wrong email"

export const passwordValidate = [containLower, containUpper, containNumber, containSymbol, passwordLength]
