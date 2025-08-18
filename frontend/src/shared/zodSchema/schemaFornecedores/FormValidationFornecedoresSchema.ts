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
    cnpj: z.coerce.string({
        required_error: 'Campo obrigatório.',
        invalid_type_error: 'Campo obrigatório',
    })
    .min(14, 'O CNPJ precisa ter no mínimo 14 caracteres.')
    .max(18,  'O CNPJ precisa ter no máximo 18 caracteres.'),
    telefone: z.coerce.string()
    .min(10, 'O telefone precisa ter no mínimo 10 caracteres.')
    .max(15,  'O telefone precisa ter no máximo 15 caracteres.')
    .trim(),
    endereco: z.coerce.string({
        required_error: 'Campo obrigatório.',
        invalid_type_error: 'Campo obrigatório'
    })
    .min(6, 'O endereço precisa ter no mínimo 14 caracteres.')
    .max(250,  'O endereço precisa ter no máximo 18 caracteres.')
    .trim(),
});

export type TFornecedoresProps = z.infer<typeof FormValidationFornecedoresSchema>;