"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const domain_1 = require("../../domain");
class UserMapper {
    static userEntityFromObject(object) {
        const { id, fk_profile, document, email, first_name, last_name, password, avatar, } = object;
        if (!id)
            throw domain_1.CustomError.badRequest("Missing id");
        if (!document)
            throw domain_1.CustomError.badRequest("Missing document");
        if (!email)
            throw domain_1.CustomError.badRequest("Missing email");
        if (!password)
            throw domain_1.CustomError.badRequest("Missing password");
        if (!first_name)
            throw domain_1.CustomError.badRequest("Missing first name");
        if (!last_name)
            throw domain_1.CustomError.badRequest("Missing last name");
        // if (!avatar) throw CustomError.badRequest("Missing avatar");
        return new domain_1.UserEntity(id, fk_profile, document, email, password, first_name, last_name, avatar);
    }
}
exports.UserMapper = UserMapper;
