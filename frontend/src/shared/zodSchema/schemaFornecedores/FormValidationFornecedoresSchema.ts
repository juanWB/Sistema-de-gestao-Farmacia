import * as z from "zod";

export const FormValidationFornecedoresSchema = z.object({
    nome: z.string({
        required_error: 'Campo obrigatório.',
        invalid_type_error: 'Campo obrigatório'
    }).nonempty("Campo obrigatório")
        .min(3, "O nome precisa ter 3 no mínimo caracteres")
        .max(100, "O nome não pode ultrapassar 100 caracteres.")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Apenas letras e espaços são permitidos")
        .trim(),
    cnpj: z.coerce.number({
        required_error: 'Campo obrigatório.',
        invalid_type_error: 'Campo obrigatório',
    }).positive('O preço precisar ser maior do que 0.'),
    telefone: z.coerce.string(),
    endereco: z.coerce.number({
        required_error: 'Campo obrigatório.',
        invalid_type_error: 'Campo obrigatório'
    }).nonnegative('O campo quantidade não pode ser menor que 0').int('O campo quantidade precisar ser um inteiro.'),
});

export type TFornecedoresProps = z.infer<typeof FormValidationFornecedoresSchema>;