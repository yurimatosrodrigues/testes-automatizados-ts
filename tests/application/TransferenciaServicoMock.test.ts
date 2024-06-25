import { TransferenciaServico } from "../../src/application/TransferenciaServico";
import { TransferenciaDTO } from "../../src/application/dto/TransferenciaDTO";
import { Conta } from "../../src/model/Conta";
import { Repositorio } from "../../src/model/contract/Repositorio";

describe("Transferencia Servico Mock", () => {
    test("transferir com sucesso", async () => {
        const { repositorio, contaOrigem, contaDestino } = criarMock();

        const transferenciaServico: TransferenciaServico = new TransferenciaServico(repositorio);
        const dto: TransferenciaDTO = new TransferenciaDTO("123456", "654321", 100.0);

        const recibo: string = await transferenciaServico.transferir(dto);

        expect(repositorio.buscar).toHaveBeenCalledWith("123456");
        expect(repositorio.buscar).toHaveBeenCalledWith("654321");
        expect(repositorio.buscar).toHaveBeenCalledTimes(2);
        expect(repositorio.adicionar).toHaveBeenCalledWith(contaOrigem);
        expect(repositorio.adicionar).toHaveBeenCalledWith(contaDestino);
        expect(repositorio.adicionar).toHaveBeenCalledTimes(2);
        const contaOrigemRepositorio = await repositorio.buscar("123456");
        const contaDestinoRepositorio = await repositorio.buscar("654321");

        expect(contaOrigemRepositorio!.saldo).toBe(4900.0);
        expect(contaDestinoRepositorio!.saldo).toBe(5100.0);
        expect(recibo.length).toBe(6);
    });

    test("conta de origem não encontrada", async () => {
        const { repositorio } = criarMock();
    
        const transferenciaServico: TransferenciaServico = new TransferenciaServico(repositorio);
        const dto: TransferenciaDTO = new TransferenciaDTO("111111", "654321", 100.0);
    
        await expect(transferenciaServico.transferir(dto)).rejects.toEqual(Error("conta de origem não encontrada"));
        expect(repositorio.buscar).toHaveBeenCalledWith("111111");
        expect(repositorio.buscar).toHaveBeenCalledWith("654321");
        expect(repositorio.buscar).toHaveBeenCalledTimes(2);
        expect(repositorio.adicionar).not.toHaveBeenCalled();
    });
    
    test("conta de destino não encontrada", async () => {
        const { repositorio } = criarMock();
    
        const transferenciaServico: TransferenciaServico = new TransferenciaServico(repositorio);
        const dto: TransferenciaDTO = new TransferenciaDTO("123456", "222222", 100.0);
    
        await expect(transferenciaServico.transferir(dto)).rejects.toEqual(Error("conta de destino não encontrada"));
        expect(repositorio.buscar).toHaveBeenCalledWith("123456");
        expect(repositorio.buscar).toHaveBeenCalledWith("222222");
        expect(repositorio.buscar).toHaveBeenCalledTimes(2);
        expect(repositorio.adicionar).not.toHaveBeenCalled();
    });
});


function criarMock(){
    const dicionario: Map<string, Conta> = new Map<string, Conta>();
    const contaOrigem: Conta = new Conta("123456", 5000.0);
    const contaDestino: Conta = new Conta("654321", 5000.0);
    dicionario.set(contaOrigem.numero, contaOrigem);
    dicionario.set(contaDestino.numero, contaDestino);

    const repositorio: jest.Mocked<Repositorio<string, Conta>> = {
        adicionar: jest.fn((entidade: Conta) => {
            dicionario.set(entidade.numero, entidade);
        }),
        buscar: jest.fn((numero: string) => {
            const promise = new Promise<Conta | undefined>((resolve, reject) => {
                resolve(dicionario.get(numero));
            });
            return promise;
        })
    };

    return { repositorio, contaOrigem, contaDestino }
}