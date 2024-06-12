import { Conta } from "../../src/model/Conta";

describe("Conta", () => {
  test("sacar com sucesso", async () => {
    const conta: Conta = new Conta('123456', 5000.0);
    conta.sacar(200.0);
    expect(conta.saldo).toBe(4800.0);
  });

  test("sacar com valor zerado", () => {
    const conta: Conta = new Conta('123456', 5000.0);
    expect(() => { conta.sacar(0); }).toThrow("valor não pode ser igual ou menor que zero");
  });

  test("sacar com valor negativo", () => {
    const conta: Conta = new Conta('123456', 5000.0);
    expect(() => { conta.sacar(-5); }).toThrow("valor não pode ser igual ou menor que zero");
  });

  test("sacar valor acima do saldo", async () => {
    const conta: Conta = new Conta("123456", 199.0);
    expect(() => { conta.sacar(200.0); }).toThrow("saldo indisponível para operação");
  });

  test("depositar com sucesso", async () => {
    const conta: Conta = new Conta("123456", 5000.0);
    conta.depositar(200.0);
    expect(conta.saldo).toBe(5200.0);
  });

  test("depositar com valor zerado", () => {
    const conta: Conta = new Conta('123456', 5000.0);
    expect(() => { conta.depositar(0); }).toThrow("valor não pode ser igual ou menor que zero");
  });

  test("depositar com valor negativo", () => {
    const conta: Conta = new Conta('123456', 5000.0);
    expect(() => { conta.depositar(-5); }).toThrow("valor não pode ser igual ou menor que zero");
  });

  
});