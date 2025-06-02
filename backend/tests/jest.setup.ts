import supertest from "supertest";
import {app} from "../src/server/AppServer"

export const serverTest = supertest(app);
