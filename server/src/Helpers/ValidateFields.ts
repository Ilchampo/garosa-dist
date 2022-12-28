import validator from 'validator';

const PASSWORD_LENGTH = 8;

export const IsAlpha = (value: any): boolean => {
    if (value) {
        const trimmed = value.trim();
        const words = trimmed.split(' ');
        let isValid = true;
        for (let i = 0; i < words.length; i++) {
            isValid = isValid && validator.isAlpha(words[i]);
        }
        return isValid;
    }
    return false;
};

export const IsAlphanumeric = (value: any): boolean => {
    if (value) {
        const trimmed = value.trim();
        const words = trimmed.split(' ');
        let isValid = true;
        for (let i = 0; i < words.length; i++) {
            isValid = isValid && validator.isAlphanumeric(words[i]);
        }
        return isValid;
    }
    return false;
};

export const IsNumeric = (value: any): boolean => {
    if (value) {
        if (typeof value === 'number') {
            return true;
        }
        return validator.isNumeric(value);
    }
    return false;
};

export const IsDecimal = (value: any): boolean => {
    if (value) {
        if (typeof value === 'number') {
            return true;
        }
        return validator.isDecimal(value);
    }
    return false;
};

export const IsPassword = (value: any): boolean => {
    if (typeof value === 'string') {
        return value.trim().length >= PASSWORD_LENGTH;
    }
    return false;
};

export const IsEmail = (value: any): boolean => {
    if (value) {
        const trimmed = value.trim();
        return validator.isEmail(trimmed);
    }
    return false;
};

export const IsBetweenDates = (value: any, startDate: Date, endDate: Date): boolean => {
    return value ? new Date(`${value}-01-01`) < endDate && new Date(`${value}-01-01`) > startDate : false;
};
