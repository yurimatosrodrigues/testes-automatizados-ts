import { NumeroConta } from "../../src/model/NumeroConta";

describe("Número Conta", () => {
    test("número conta com seis dígitos", async () => {
        const numeroConta: NumeroConta = new NumeroConta("123456");
        expect(numeroConta.numero).toBe("123456");
        expect(numeroConta.numero.length).toBe(6);
    });

    test("número conta com cinco dígitos", async () => {
        expect(() => {new NumeroConta("12345")}).toThrow('número de conta inválido') ;
    });

    test("número conta com sete dígitos", async () => {
        expect(() => {new NumeroConta("1234567")}).toThrow('número de conta inválido') ;
    });

    test("número conta com valor que não seja dígitos", async () => {
        expect(() => {new NumeroConta("abc123")}).toThrow('número de conta inválido') ;
    })
})