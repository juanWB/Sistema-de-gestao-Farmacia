import { Knex } from "./database/knex";
import { app } from "./server/AppServer";

const PORT = process.env.PORT || 3000;

const startServer = () => {
    app.listen(PORT, () => {
        console.log('Rodando na porta ' + PORT);
    })
}

if(process.env.IS_LOCALHOST !== 'true'){
    Knex.migrate.latest().then(() => {
        Knex.seed.run().then(() => {
                startServer();
        }).catch(console.log);
    }).catch(console.log);
}else{
    startServer();
}
