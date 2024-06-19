import { Conta } from "../model/Conta";
import { Recibo } from "../model/Recibo";
import { Repositorio } from "../model/contract/Repositorio";
import { NegocioErro } from "../model/error/NegocioError";
import { TransferenciaValor } from "../model/service/TransferenciaValor";
import { TransferenciaDTO } from "./dto/TransferenciaDTO";

export class TransferenciaServico {
    private _repositorio: Repositorio<string, Conta>;

    public constructor(repositorio: Repositorio<string, Conta>) {
        this._repositorio = repositorio;
    }

    public async transferir(dto: TransferenciaDTO): Promise<string>{
        const contaOrigem = await this._repositorio.buscar(dto.contaOrigem);
        const contaDestino =  await this._repositorio.buscar(dto.contaDestino);

        if(contaOrigem === undefined){
            throw new NegocioErro("conta de origem não encontrada");
        }

        const transferencia: TransferenciaValor = new TransferenciaValor();
        const recibo: Recibo = transferencia.transferir(contaOrigem!, contaDestino!, dto.valor);

        this._repositorio.adicionar(contaOrigem!);
        this._repositorio.adicionar(contaDestino!);

        return recibo.codigo;
    }
}