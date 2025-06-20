import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const Count = async(filter = ''):Promise<number | Error> => {
  try { 
    const [{ count }] = await Knex(ETableNames.saidaEstoque)
        .where('saida_data', 'like', `%${filter}%`)
        .count<[{ count: number }]>('* as count');  

        if(Number.isInteger(Number(count)))return Number(count);


    return new Error("Erro ao consultar a quantidade total de registros");
  } catch (err) {
    console.log(err);
    return new Error("Erro ao consultar a quantidade total de registros");
  }
};
