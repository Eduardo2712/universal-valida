export const validateEmail = (email: string): boolean => {
    try {
        new URL(`mailto:${email}`);

        return true;
    } catch {
        return false;
    }
};

export const validateCPF = (cpf: string): boolean => {
    if (!cpf) {
        return false;
    }

    const digits = cpf.replaceAll(/\D/g, "");

    if (digits.length !== 11) {
        return false;
    }

    if ([...digits].every((d) => d === digits[0])) {
        return false;
    }

    const calcDigit = (base: string, factor: number): number => {
        let sum = 0;

        for (const digit of base) {
            sum += Number(digit) * factor--;
        }

        const result = (sum * 10) % 11;

        return result === 10 ? 0 : result;
    };

    const digit1 = calcDigit(digits.slice(0, 9), 10);
    const digit2 = calcDigit(digits.slice(0, 10), 11);

    return digit1 === Number(digits[9]) && digit2 === Number(digits[10]);
};

export const validateCNPJ = (cnpj: string): boolean => {
    if (!cnpj) {
        return false;
    }

    const digits = cnpj.replaceAll(/\D/g, "");

    if (digits.length !== 14) {
        return false;
    }

    if ([...digits].every((d) => d === digits[0])) {
        return false;
    }

    const calcDigit = (base: string, weights: number[]): number => {
        let sum = 0;

        for (let i = 0; i < weights.length; i++) {
            sum += Number(base[i]) * weights[i];
        }

        const remainder = sum % 11;

        return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calcDigit(digits.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    const digit2 = calcDigit(digits.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    return digit1 === Number(digits[12]) && digit2 === Number(digits[13]);
};

export const validateDate = (dateString: string): boolean => {
    const date = new Date(dateString);

    return !Number.isNaN(date.getTime());
};

export const validateBirthDate = (dateString: string, minAge = 0): boolean => {
    if (!validateDate(dateString)) {
        return false;
    }

    const birthDate = new Date(dateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= minAge;
};

export const validateFullName = (fullName: string): boolean => {
    if (!fullName || typeof fullName !== "string") {
        return false;
    }

    const names = fullName.trim().split(/\s+/);

    return names.length >= 2 && names.every((name) => name.length >= 2);
};

export const validateUrl = (urlString: string): boolean => {
    try {
        new URL(urlString);

        return true;
    } catch {
        return false;
    }
};

export const validateCEP = (cep: string): boolean => {
    const digits = cep
        .split("")
        .filter((char) => char >= "0" && char <= "9")
        .join("");

    return digits.length === 8;
};
