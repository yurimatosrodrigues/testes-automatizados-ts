import { Conta } from "../Conta";

export class TransferenciaValor {
    public transferir(contaOrigem: Conta, contaDestino: Conta, valor: number): void{
        contaOrigem.sacar(valor);
        contaDestino.depositar(valor);
    }
}