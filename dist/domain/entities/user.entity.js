"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(id, fk_profile, document, email, password, first_name, last_name, avatar) {
        this.id = id;
        this.fk_profile = fk_profile;
        this.document = document;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.avatar = avatar;
    }
}
exports.UserEntity = UserEntity;
/*
public id: string,
public fk_profile: string,
public document: string,
public email: string,
public password: string,
public first_name: string,
public last_name: string,
public avatar: string
public logins: string,
public last_login: string,
public is_active: string,
public created_by: string,
public updated_by: string,
public deleted_by: string,
public is_cashier: boolean,
public is_superviser: boolean

 */
