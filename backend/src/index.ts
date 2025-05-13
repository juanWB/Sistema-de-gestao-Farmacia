import { app } from "./server/Server";

app.listen(process.env.PORT || 3000, () => {
    console.log('Rodando na porta ' + process.env.PORT);
})