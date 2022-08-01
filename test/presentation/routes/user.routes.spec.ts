import request from "supertest";

import UserRouter from "../../../src/presentation/routes/user.routes";
import { server } from "../../../src/presentation/server";
import { CreateUser, ReadUser } from "../../../src/domain/entity/user";

import { CreateUserUseCase } from "../../../src/application/usecases/user/create-user-usecase";
import { ListUserUseCase } from "../../../src/application/usecases/user/list-user-usecase";
import { FindOneUserUseCase } from "../../../src/application/usecases/user/findone-user-usecase";
import { DeleteUserUseCase } from "../../../src/application/usecases/user/delete-user-usecase";
import { UpdateUserRoleUseCase } from "../../../src/application/usecases/user/update-user-role-usecase";

import { UserRepository } from "../../../src/domain/repository/interface/user-repository";

class MockListUserUseCase implements ListUserUseCase {
  execute(): Promise<ReadUser[]> {
    throw new Error("Method not implementd");
  }
}

class MockCreateUserUseCase implements CreateUserUseCase {
  execute(user: CreateUser): Promise<ReadUser> {
    throw new Error("Method not implementd");
  }
}

class MockFindOneUserUseCase implements FindOneUserUseCase {
  execute(id: number): Promise<ReadUser> {
    throw new Error("Method not implementd");
  }
}

class MockUpdateRoleUser implements UpdateUserRoleUseCase {
  execute(id: number, role: string): Promise<ReadUser> {
    throw new Error("Method not implementd");
  }
}

class MockDeleteUser implements DeleteUserUseCase {
  execute(id: number): Promise<void> {
    throw new Error("Method not implementd");
  }
}

describe("Contact Router", () => {
  let mockCreateUser: CreateUserUseCase;
  let mockListUser: ListUserUseCase;
  let mockFindUser: FindOneUserUseCase;
  let mockUpdateRole: UpdateUserRoleUseCase;
  let mockDeleteUser: DeleteUserUseCase;

  beforeAll(() => {
    mockCreateUser = new MockCreateUserUseCase();
    mockListUser = new MockListUserUseCase();
    mockFindUser = new MockFindOneUserUseCase();
    mockUpdateRole = new MockUpdateRoleUser();
    mockDeleteUser = new MockDeleteUser();
    server.use(
      "/users",
      UserRouter(
        mockListUser,
        mockCreateUser,
        mockFindUser,
        mockUpdateRole,
        mockDeleteUser
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    test("should return 200 with data", async () => {
      const ExpectedData = [
        {
          id: 1,
          name: "Andre",
          email: "andre@izarra.com",
          password: "123456",
          role: "admin",
          phoneNumber: "04241859764",
        },
      ];
      jest
        .spyOn(mockListUser, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedData));

      const response = await request(server).get("/users");

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: "success",
        data: ExpectedData,
      });
      expect(mockListUser.execute).toBeCalledTimes(1);
    });

    test("should return 500 on usecase error", async () => {
      jest
        .spyOn(mockListUser, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).get("/users");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Error fetching data" });
    });
  });

  describe("POST /users", () => {
    test("should create an user", async () => {
      const InputData = {
        name: "andre",
        email: "andre@izarra.com",
        password: "123456",
        role: "admin",
        phoneNumber: "04241589764",
      };
      jest.spyOn(mockCreateUser, "execute").mockImplementation(() =>
        Promise.resolve({
          id: 1,
          name: "andre",
          email: "andre@izarra.com",
          role: "admin",
          phoneNumber: "04241589764",
        })
      );
      const response = await request(server).post("/users").send(InputData);
      expect(response.status).toBe(201);
    });

    test("should return an error", async () => {
      const InputData = {
        name: "andre",
        email: "andre@izarra.com",
        password: "123456",
        role: "admin",
        phoneNumber: "04241589764",
      };
      jest
        .spyOn(mockCreateUser, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).post("/users").send(InputData);
      expect(response.status).toBe(500);
    });
  });
});
