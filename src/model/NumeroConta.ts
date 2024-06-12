import { NegocioErro } from "./error/NegocioError";

export class NumeroConta {
    private _numero: string;

    public constructor(numero: string){
        this.validar(numero);
        if(numero.length < 6 || numero.length > 6){
            throw new NegocioErro('número de conta inválido');
        }
        this._numero = numero;
    }

    private validar(numero: string): void{
        if(!this.temSeisDigitos(numero)){
            throw new NegocioErro('número de conta inválido');
        }
    }

    private temSeisDigitos(numero: string): boolean{
        const regexp: RegExp = /^\d{6}$/;
        return regexp.test(numero);
    }

    public get numero(): string{
        return this._numero;
    }
}