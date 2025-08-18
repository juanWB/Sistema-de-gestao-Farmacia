import z from "zod";

export const formValidationEntradaSchema = z.object({
        produto_id: z.coerce.number({
            required_error: 'Campo obrigatório.',
            invalid_type_error: 'Campo obrigatório'
        }).positive('O id precisar ser maior do que 0.').int('O id precisar ser um inteiro.'),
        quantidade: z.coerce.number({
                required_error: 'Campo obrigatório.',
                invalid_type_error: 'Campo obrigatório'
            })
            .nonnegative('O campo quantidade não pode ser menor que 0')
            .int('O campo quantidade precisar ser um inteiro.'),
        entrada_data:z.string({
                required_error: 'Campo obrigatório.',
                invalid_type_error: 'Campo obrigatório'
            }), 
});

export type TEntradaEstoqueProps = z.infer<typeof formValidationEntradaSchema>;