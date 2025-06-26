import supertest from "supertest";
import {app} from "../src/server/AppServer"
import { Knex } from "../src/database/knex";


beforeAll(async()=>{
    await Knex.migrate.latest();
    await Knex.seed.run();
})

afterAll(async()=>{
    await Knex.destroy();
})


export const serverTest = supertest(app);
