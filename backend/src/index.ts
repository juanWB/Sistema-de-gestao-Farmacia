import { Knex } from "./database/knex";
import { app } from "./server/AppServer";

const startServer = () => {app.listen(process.env.PORT || 3000, () => {
    console.log('Rodando na porta ' + process.env.PORT);
})}

if(process.env.IS_LOCALHOST !== 'true'){
    Knex.migrate.latest()
        .then(() => {
            Knex.seed.run().then(() => {
                 startServer();
            }).catch(console.log);
        }).catch(console.log);
}else{
    startServer();
}
