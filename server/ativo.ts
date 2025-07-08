export class Ativo {
  private _nome: string;
	private _valor: number;
	private _data: Date;

	constructor(nome: string, valor: number, data: Date) {

    if (!nome || nome.trim() === "") {
      throw new Error("Nome do ativo não pode ser vazio.")
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
