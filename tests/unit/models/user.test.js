import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import { User } from "../../../models/user.js";

describe('user.generateAuthToken', () => {
    it('should contains a valid JWT', () => {
        const payload = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        expect(decoded).toMatchObject(payload);
    })
})