import express, { Express, Request, Response } from "express";
import { CreateUserUseCase } from "../../application/usecases/user/create-user-usecase";
import { DeleteUserUseCase } from "../../application/usecases/user/delete-user-usecase";
import { FindOneUserUseCase } from "../../application/usecases/user/findone-user-usecase";
import { ListUserUseCase } from "../../application/usecases/user/list-user-usecase";
import { UpdateUserRoleUseCase } from "../../application/usecases/user/update-user-role-usecase";

export default function userRouter(
  listUsers: ListUserUseCase,
  createUser: CreateUserUseCase,
  findOne: FindOneUserUseCase,
  updateUserRole: UpdateUserRoleUseCase,
  deleteOne: DeleteUserUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const users = await listUsers.execute();
      res.status(200).json({ message: "success", data: users });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const user = await createUser.execute(req.body);
      res.statusCode = 201;
      res.json({ message: "user has been created", data: user });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error saving data" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await findOne.execute(Number(id));
      res.status(200).json({
        message: "Succes",
        data: user,
      });
    } catch (err) {
      res.status(500).send({ message: "Error" });
    }
  });

  router.patch("/:id/role", async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const user = await updateUserRole.execute(Number(id), body.role);
      res.status(200).json({ message: "User role updated", data: user });
    } catch (err) {
      res.status(500).send({ message: "Error" });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteOne.execute(Number(id));
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      res.status(500).send({ message: "Error" });
    }
  });

  return router;
}
