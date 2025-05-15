import { z } from "zod"
import { validation } from "../../service/middleware/Validation"


interface IParamProps {
    id?: number
}

interface IBodyProps {
    nome: string
    cnpj: string
    telefone: string
    endereco: string
}

export const updateFornecedorValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(z.object({
        id: z.coerce.number({
            invalid_type_error: "O id precisar ser um número."
        }).positive('Deve ser maior que 0.').optional()
    })),
    body: getSchema<IBodyProps>(z.object({
        nome: z.string({
            required_error: "Campo obrigatório.",
            invalid_type_error: "Campo obrigatório",
          })
          .nonempty("Campo obrigatório")
          .min(3, "O nome precisa ter 3 no mínimo caracteres")
          .max(100, "O nome não pode ultrapassar 100 caracteres.")
          .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Apenas letras e espaços são permitidos")
          .trim(),
        cnpj: z.string({
            required_error: "Campo obrigatório.",
            invalid_type_error: "Campo obrigatório",
          })
          .nonempty("Campo obrigatório")
          .transform(val => val.replace(/\D/g, ''))
          .refine(val => val.length === 14, {
              message: "CNPJ precisa ter exatamente 14 dígitos"
          }),
       telefone: z.string({
           required_error: "Campo obrigatório.",
            invalid_type_error: "Campo obrigatório",
          })
          .nonempty("Campo obrigatório")
          .min(10, 'Precisa ter ao menos 10 digitos.')
          .max(15, 'Precisa ter no.maxcdn 15 digitos.'),
      endereco: z.string({
           required_error: "Campo obrigatório.",
            invalid_type_error: "Campo obrigatório",
          })
          .nonempty("Campo obrigatório")
    }))
}))