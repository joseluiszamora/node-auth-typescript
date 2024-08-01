import jwt from "jsonwebtoken";

export class JwtAdapter {
  static async generateToken(payload: Object, duration: "2h") {
    return new Promise((resolve) => {
      // todo: generacion del SEED
      jwt.sign(payload, "JWT_SEED", { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token!);
      });
    });
  }
}
