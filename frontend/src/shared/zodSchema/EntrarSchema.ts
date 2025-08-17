import z from "zod";

export const EntrarSchema = z.object({
    email: z
        .string({
            required_error: "Campo obrigatório",
        })
        .email("Informe um e-mail válido")
        .trim(),
    senha: z
        .string({
            required_error: "Campo obrigatório",
        })
        .nonempty("Campo obrigatório"),
});