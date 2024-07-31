import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthController {
  // Inyeccion de dependencias
  constructor(private readonly authRepository: AuthRepository) {}

  // login User
  loginUser = (req: Request, res: Response) => {
    res.json("login user controller");
  };

  // register User
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });
    this.authRepository
      .register(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error));

    // res.json(registerUserDto);
  };
}
