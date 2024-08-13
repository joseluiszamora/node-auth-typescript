"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const config_1 = require("../../config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthMiddleware {
}
exports.AuthMiddleware = AuthMiddleware;
_a = AuthMiddleware;
AuthMiddleware.validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.header("Authorization");
    if (!authorization)
        return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
        return res.status(401).json({ error: "Invalid Bearer token" });
    const token = authorization.split(" ").at(1) || "";
    try {
        // todo:
        const payload = yield config_1.JwtAdapter.validateToken(token);
        if (!payload)
            return res.status(401).json({ error: "Invalid token" });
        const user = yield prisma.user.findUnique({
            where: { id: Number(payload.id) },
        });
        if (!user)
            return res
                .status(401)
                .json({ error: "Invalid token - user not found" });
        req.body.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});