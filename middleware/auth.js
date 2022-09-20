import JWT from "jsonwebtoken";
import config from "config";

export function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denined. No token provided.');
    try {
        const decoded = JWT.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (error) {
       return res.send(401).send('Access denined.');
    }
}