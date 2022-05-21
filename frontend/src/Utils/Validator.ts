import { ValidationFun } from "./TextInputValidation";

export class Validator {
    private rules: ValidationFun[];
    private source: () => string;

    constructor(rules?: ValidationFun[]) {
        this.rules = rules;
    }

    injectSource(source: () => string) {
        this.source = source;
    }

    validate(): string | null {
        if (this.rules)
            for (const rule of this.rules) {
                const val = rule(this.source());
                if (val != null)
                    return val;
            }
        return null;
    }

    isValid(): boolean {
        return this.validate() == null;
    }
}
