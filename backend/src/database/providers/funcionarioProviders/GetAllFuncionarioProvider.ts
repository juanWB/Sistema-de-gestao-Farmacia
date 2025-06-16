import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models";

export const GetFuncionarioProvider = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IFuncionario[] | Error> => {
  try {
    const result = await Knex(ETableNames.funcionario)
      .select("*")
      .where("id", id)
      .orWhere("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.funcionario)
        .select("*")
        .where("id", id).first;

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (err) {
    console.log(err);
    return new Error("Error ao buscar funcionarios");
  }
};
