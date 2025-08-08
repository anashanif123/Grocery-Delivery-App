import "dotenv/config";
import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";
import { Admin } from "../models/index.js";


export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD


const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions"
});
sessionStore.on("error", (error) => {
    console.log("Session Store error");
})

export const authenticate = async (email, password) => {
    // if (email && password) {
    //     if (email == "anashanif629@gmail.com" && password == "12345678") {
    //         return Promise.resolve({ email: email, password: password })
    //     } else {
    //         return null
    //     }
    // }

    if (email && password) {
        const user = await Admin.findOne({ email });
        if (!user) {
            return null
        }
        if (user.password === password) {
            return Promise.resolve({ email: email, password: password });
        } else {
            return null
        }
    }

    return null
}