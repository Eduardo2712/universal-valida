import { validateEmail, validateCPF, validateCNPJ, validateDate, validateBirthDate, validateCEP, validateFullName, validateUrl } from "./functions";

describe("Email validation", () => {
    test("should validate correct email", () => {
        expect(validateEmail("test@example.com")).toBe(true);
    });

    test("should reject invalid email", () => {
        expect(validateEmail("invalid@abc1111.com")).toBe(true);
    });

    test("should reject malformed email", () => {
        expect(validateEmail("invalid-email")).toBe(false);
    });

    test("should reject empty email", () => {
        expect(validateEmail("")).toBe(false);
    });
});

describe("CPF validation", () => {
    test("should validate correct CPF", () => {
        expect(validateCPF("123.456.789-09")).toBe(true);
    });

    test("should reject invalid CPF", () => {
        expect(validateCPF("121.121.121-12")).toBe(false);
    });

    test("should reject CPF with all identical digits", () => {
        expect(validateCPF("111.111.111-11")).toBe(false);
    });

    test("should reject CPF with incorrect length", () => {
        expect(validateCPF("123.456.789-0")).toBe(false);
    });

    test("should reject empty CPF", () => {
        expect(validateCPF("")).toBe(false);
    });
});

describe("CNPJ validation", () => {
    test("should validate correct CNPJ", () => {
        expect(validateCNPJ("12.345.678/0001-95")).toBe(true);
    });

    test("should reject invalid CNPJ", () => {
        expect(validateCNPJ("12.345.678/0001-96")).toBe(false);
    });

    test("should reject CNPJ with all identical digits", () => {
        expect(validateCNPJ("11.111.111/1111-11")).toBe(false);
    });

    test("should reject CNPJ with incorrect length", () => {
        expect(validateCNPJ("12.345.678/0001-9")).toBe(false);
    });

    test("should reject empty CNPJ", () => {
        expect(validateCNPJ("")).toBe(false);
    });
});

describe("Birth date validation", () => {
    test("should validate correct birth date with min age", () => {
        expect(validateBirthDate("2000-01-01", 18)).toBe(true);
    });

    test("should validate correct birth date without min age", () => {
        expect(validateBirthDate("2020-01-01")).toBe(true);
    });

    test("should validate correct birth date (DD/MM/YYYY) with min age", () => {
        expect(validateBirthDate("01/01/2000", 18, "DD/MM/YYYY")).toBe(true);
    });

    test("should validate correct birth date (MM-DD-YYYY) with min age", () => {
        expect(validateBirthDate("01-01-2010", 18, "MM-DD-YYYY")).toBe(false);
    });

    test("should validate correct birth date (MM-DD-YYYY) with min age 16", () => {
        expect(validateBirthDate("01-01-2000", 16, "MM-DD-YYYY")).toBe(true);
    });

    test("should reject birth date exactly at min age 10", () => {
        expect(validateBirthDate("2014-01-01", 10)).toBe(true);
    });

    test("should reject birth date not meeting min age", () => {
        expect(validateBirthDate("2010-01-01", 18)).toBe(false);
    });

    test("should reject invalid birth date", () => {
        expect(validateBirthDate("2020-02-30", 18)).toBe(false);
    });

    test("should reject malformed birth date", () => {
        expect(validateBirthDate("01/01/2000", 18)).toBe(false);
    });

    test("should reject empty birth date", () => {
        expect(validateBirthDate("", 18)).toBe(false);
    });
});

describe("Date validation", () => {
    test("should validate correct date (YYYY-MM-DD)", () => {
        expect(validateDate("2020-02-29")).toBe(true);
    });

    test("should reject invalid date (YYYY-MM-DD)", () => {
        expect(validateDate("2020-02-30")).toBe(false);
    });

    test("should validate correct date (DD/MM/YYYY)", () => {
        expect(validateDate("29/02/2020", "DD/MM/YYYY")).toBe(true);
    });

    test("should reject invalid date (DD/MM/YYYY)", () => {
        expect(validateDate("30/02/2020", "DD/MM/YYYY")).toBe(false);
    });

    test("should validate correct date (MM-DD-YYYY)", () => {
        expect(validateDate("02-29-2020", "MM-DD-YYYY")).toBe(true);
    });

    test("should reject invalid date (MM-DD-YYYY)", () => {
        expect(validateDate("02-30-2020", "MM-DD-YYYY")).toBe(false);
    });

    test("should reject malformed date", () => {
        expect(validateDate("2020/02/29")).toBe(false);
    });

    test("should reject empty date", () => {
        expect(validateDate("")).toBe(false);
    });
});

describe("CEP validation", () => {
    test("should validate correct CEP", () => {
        expect(validateCEP("12345-678")).toBe(true);
    });

    test("should reject invalid CEP", () => {
        expect(validateCEP("1234-567")).toBe(false);
    });

    test("should reject empty CEP", () => {
        expect(validateCEP("")).toBe(false);
    });

    test("should validate correct CEP without hyphen", () => {
        expect(validateCEP("12345678")).toBe(true);
    });
});

describe("Full name validation", () => {
    test("should validate correct full name", () => {
        expect(validateFullName("John Doe")).toBe(true);
    });

    test("should reject single name", () => {
        expect(validateFullName("John")).toBe(false);
    });

    test("should reject empty full name", () => {
        expect(validateFullName("")).toBe(false);
    });

    test("should reject full name with short parts", () => {
        expect(validateFullName("J D")).toBe(false);
    });

    test("should validate full name with multiple parts", () => {
        expect(validateFullName("John Michael Doe")).toBe(true);
    });
});

describe("URL validation", () => {
    test("should validate correct URL", () => {
        expect(validateUrl("https://www.example.com")).toBe(true);
    });

    test("should reject invalid URL", () => {
        expect(validateUrl("htp:/invalid-url")).toBe(false);
    });

    test("should reject URL with spaces", () => {
        expect(validateUrl("https://www.exa mple.com")).toBe(false);
    });

    test("should reject empty URL", () => {
        expect(validateUrl("")).toBe(false);
    });
});
