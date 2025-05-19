import supertest from "supertest";
import {app} from "../src/server/Server"

export const jestTest = supertest(app);
