import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IProduto } from "../../models";

export const GetSaidaProvider = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IProduto[] | Error> => {
  try {
    const result = await Knex(ETableNames.saidaEstoque)
      .select("*")
      .where("id", id)
      .orWhere("saida_data", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.saidaEstoque)
        .select("*")
        .where("id", id).first;

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (err) {
    console.log(err);
    return new Error("Error ao buscar saidas do estoque");
  }
};
