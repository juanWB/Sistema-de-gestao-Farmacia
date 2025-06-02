import { app } from "./server/AppServer";

app.listen(process.env.PORT || 3000, () => {
    console.log('Rodando na porta ' + process.env.PORT);
})