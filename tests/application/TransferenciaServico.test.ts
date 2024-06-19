import { TransferenciaServico } from "../../src/application/TransferenciaServico";
import { TransferenciaDTO } from "../../src/application/dto/TransferenciaDTO";
import { Conta } from "../../src/model/Conta";
import { Repositorio } from "../../src/model/contract/Repositorio";
import { MemoriaContaRepositorio } from "../fake/MemoriaContaRepositorio";

describe("Transferência Serviço", () => {
    test("transferir valor com sucesso", async () => {
        const repositorio: Repositorio<string, Conta> = new MemoriaContaRepositorio();
        const contaOrigem: Conta = new Conta("123456", 5000.00);
        const contaDestino: Conta = new Conta("654321", 5000.00);
        repositorio.adicionar(contaOrigem);
        repositorio.adicionar(contaDestino);

        const transferenciaServico: TransferenciaServico = new TransferenciaServico(repositorio);
        const dto: TransferenciaDTO = new TransferenciaDTO("123456", "654321", 100.0);

        const recibo: string = await transferenciaServico.transferir(dto);

        const contaOrigemRepositorio = await repositorio.buscar("123456");
        const contaDestinoRepositorio = await repositorio.buscar("654321");

        expect(contaOrigemRepositorio!.saldo).toBe(4900.0);
        expect(contaDestinoRepositorio!.saldo).toBe(5100.0);
        expect(recibo.length).toBe(6);
    });

    test("conta de origem não encontrada", async () => {
        const repositorio: Repositorio<string, Conta> = new MemoriaContaRepositorio();
        const contaOrigem: Conta = new Conta("123456", 5000.00);
        const contaDestino: Conta = new Conta("654321", 5000.00);
        repositorio.adicionar(contaOrigem);
        repositorio.adicionar(contaDestino);

        const transferenciaServico: TransferenciaServico = new TransferenciaServico(repositorio);
        const dto: TransferenciaDTO = new TransferenciaDTO("111111", "654321", 100.0);

        await expect(transferenciaServico.transferir(dto)).rejects.toEqual(Error("conta de origem não encontrada"));
    });
});