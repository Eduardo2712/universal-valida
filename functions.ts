export const validateEmail = (email: string): boolean => {
    if (typeof email !== "string") {
        return false;
    }

    if (email.includes(" ")) {
        return false;
    }

    const parts = email.split("@");

    if (parts.length !== 2) {
        return false;
    }

    const [local, domain] = parts;

    if (!local) {
        return false;
    }

    if (local.startsWith(".") || local.endsWith(".")) {
        return false;
    }

    if (local.includes("..")) {
        return false;
    }

    if (!domain) {
        return false;
    }

    if (!domain.includes(".")) {
        return false;
    }

    if (domain.startsWith(".") || domain.endsWith(".")) {
        return false;
    }

    const domainParts = domain.split(".");

    for (const part of domainParts) {
        if (!part) {
            return false;
        }
    }

    const tld = domainParts[domainParts.length - 1];

    if (tld.length < 2) {
        return false;
    }

    for (const char of email) {
        const code = char.charCodeAt(0);

        if (code < 33 || code > 126) {
            return false;
        }
    }

    return true;
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

const formatDate = (dateString: string, format: DateType): Date | null => {
    let date: null | Date = null;
    let day = null;
    let month = null;
    let year = null;

    if (format === "DD/MM/YYYY") {
        [day, month, year] = dateString.split("/").map(Number);

        if (!day || !month || !year) {
            return null;
        }

        date = new Date(year, month - 1, day);
    } else if (format === "MM-DD-YYYY") {
        [month, day, year] = dateString.split("-").map(Number);

        if (!day || !month || !year) {
            return null;
        }

        date = new Date(year, month - 1, day);
    } else {
        [year, month, day] = dateString.split("-").map(Number);

        if (!day || !month || !year) {
            return null;
        }

        date = new Date(year, month - 1, day);
    }

    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return null;
    }

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date;
};

export const validateDate = (dateString: string, format: DateType = "YYYY-MM-DD"): boolean => {
    let date: null | Date = null;

    date = formatDate(dateString, format);

    return date !== null;
};

export const validateBirthDate = (dateString: string, minAge = 0, format: DateType = "YYYY-MM-DD"): boolean => {
    const validation = validateDate(dateString, format);

    if (!validation) {
        return false;
    }

    const date = formatDate(dateString, format);

    if (!date) {
        return false;
    }

    const birthDate = new Date(date);
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

export const validateUrl = (url: string): boolean => {
    if (typeof url !== "string") {
        return false;
    }

    if (url.includes(" ")) {
        return false;
    }

    const protocols = ["http", "https", "ftp"];
    const protocolSplit = url.split("://");

    if (protocolSplit.length !== 2) {
        return false;
    }

    const [protocol, rest] = protocolSplit;

    if (!protocols.includes(protocol)) {
        return false;
    }

    let hostPort = rest;

    const firstSlash = rest.indexOf("/");

    if (firstSlash !== -1) {
        hostPort = rest.slice(0, firstSlash);
    }

    if (!hostPort) {
        return false;
    }

    let host = hostPort;
    let port = null;

    const portIndex = hostPort.indexOf(":");

    if (portIndex !== -1) {
        host = hostPort.slice(0, portIndex);
        port = hostPort.slice(portIndex + 1);

        if (!port) {
            return false;
        }

        const portNumber = Number(port);

        if (portNumber < 1 || portNumber > 65535) {
            return false;
        }
    }

    if (!isValidHost(host)) {
        return false;
    }

    for (const char of url) {
        const code = char.charCodeAt(0);

        if (code < 33 || code > 126) {
            return false;
        }
    }

    return true;
};

const isValidHost = (host: string): boolean => {
    if (!host) {
        return false;
    }

    if (host === "localhost") {
        return true;
    }

    const ipv4Parts = host.split(".");

    if (ipv4Parts.length === 4) {
        for (const part of ipv4Parts) {
            if (!part) {
                return false;
            }

            const num = Number(part);

            if (num < 0 || num > 255) {
                return false;
            }
        }
        return true;
    }

    const domainParts = host.split(".");

    if (domainParts.length < 2) {
        return false;
    }

    for (const part of domainParts) {
        if (!part) {
            return false;
        }

        if (part.startsWith("-") || part.endsWith("-")) {
            return false;
        }

        for (const char of part) {
            const code = char.charCodeAt(0);
            const isLetter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
            const isNumber = code >= 48 && code <= 57;
            const isHyphen = char === "-";

            if (!isLetter && !isNumber && !isHyphen) {
                return false;
            }
        }
    }

    return true;
};

export const validateCEP = (cep: string): boolean => {
    if (cep === null || cep === undefined) {
        return false;
    }

    let cepString = String(cep);

    let digits = "";

    for (const char of cepString) {
        const code = char.charCodeAt(0);

        if (code >= 48 && code <= 57) {
            digits += char;
        }
    }

    if (digits.length !== 8) {
        return false;
    }

    let allEqual = true;

    for (let i = 1; i < digits.length; i++) {
        if (digits[i] !== digits[0]) {
            allEqual = false;
            break;
        }
    }

    if (allEqual) {
        return false;
    }

    return true;
};
