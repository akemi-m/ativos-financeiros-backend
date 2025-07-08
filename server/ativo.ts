export class Ativo {
  private _nome: string;
	private _valor: number;
	private _data: Date;

	constructor(nome: string, valor: number, data: Date) {

    if (!nome || nome.trim() === "") {
      throw new Error("Nome do ativo não pode ser vazio.")
    }

    if (nome.length !== 5) {
      throw new Error("Nome deve ter exatamente 5 caracteres.");
    }

    for (let i = 0; i < 4; i++) {
      const letra = nome.charAt(i);
      if (letra < "A" || letra > "Z") {
        throw new Error("Os 4 primeiros caracteres do nome devem ser caracteres com letras maiúsculas.");
      }
    }

    const ultimoNumero = nome.charAt(4);
    if (ultimoNumero < "0" || ultimoNumero > "9") {
      throw new Error("O último caractere do nome deve ser um número.");
    }

    if (typeof valor !== "number" || isNaN(valor) || valor <= 0) {
      throw new Error("Valor do ativo deve ser um número positivo.");
    }

    const dataConvertida = new Date(data);
    if (isNaN(dataConvertida.getTime())) {
      throw new Error("Data inválida.")
    }

		this._nome = nome;
		this._valor = valor;
		this._data = data;
	}

  get nome(): string {
    const nomeBackup = this._nome;
    return nomeBackup;
  }

  get valor(): number {
    const valorBackup = this._valor;
		return valorBackup;
	}

  get data(): Date {
		return new Date(this._data.getTime());
	}

}
