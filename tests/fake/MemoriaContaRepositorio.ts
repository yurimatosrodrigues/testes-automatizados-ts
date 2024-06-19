import { Conta } from "../../src/model/Conta";
import { Repositorio } from "../../src/model/contract/Repositorio";

export class MemoriaContaRepositorio implements Repositorio<string, Conta>{
    private _dicionario: Map<string, Conta>;

    public constructor(){
        this._dicionario = new Map<string, Conta>();
    }

    public buscar(campo: string): Promise<Conta | undefined> {
        const promise = new Promise<Conta | undefined>((resolve, reject) => {
            resolve(this._dicionario.get(campo));
        });
        
        return promise;
    }

    public adicionar(entidade: Conta): void {
        this._dicionario.set(entidade.numero, entidade);
    }

}