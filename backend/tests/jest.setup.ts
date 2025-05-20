import supertest from "supertest";
import {app} from "../src/server/Server"

export const serverTest = supertest(app);
