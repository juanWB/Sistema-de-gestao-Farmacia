import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFornecedor } from "../../models";

export const GetFornecedorProvider = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IFornecedor[] | Error> => {
  try {
    const result = await Knex(ETableNames.fornecedor)
      .select("*")
      .where("id", id)
      .orWhere("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.fornecedor)
        .select("*")
        .where("id", id).first;

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (err) {
    console.log(err);
    return new Error("Error ao buscar fornecedores");
  }
};
