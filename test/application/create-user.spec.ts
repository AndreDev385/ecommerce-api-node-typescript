import { CreateUser, ReadUser, User } from "../../src/domain/entity/user";
import { CreateUserImpl } from "../../src/application/impl/user/create-user";
import { UserRepository } from "../../src/domain/repository/interface/user-repository";

describe("List user usecase", () => {
  class MockUserRepository implements UserRepository {
    create(user: CreateUser): Promise<ReadUser> {
      throw new Error("Method not implemented");
    }

    findAll(): Promise<ReadUser[]> {
      throw new Error("Method not implemented");
    }

    findOne(id: number): Promise<ReadUser> {
      throw new Error("Method not implemented");
    }

    deleteOne(id: number): Promise<void> {
      throw new Error("Method not implemented");
    }

    updateRole(id: number, role: string): Promise<ReadUser> {
      throw new Error("Method not implemented");
    }
  }

  let mockUserRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserRepository = new MockUserRepository();
  });

  test("should retunr data", async () => {
    const InputData = {
      name: "andre",
      email: "andre@izarra.com",
      password: "123456",
      role: "admin",
      phoneNumber: "04241589764",
    };

    jest.spyOn(mockUserRepository, "create").mockImplementation(() =>
      Promise.resolve({
        id: 1,
        name: "andre",
        email: "andre@izarra.com",
        role: "admin",
        phoneNumber: "04241589764",
      })
    );
    const listUser = new CreateUserImpl(mockUserRepository);
    const result = await listUser.execute(InputData);
    expect(result).toStrictEqual({
      id: 1,
      name: "andre",
      email: "andre@izarra.com",
      role: "admin",
      phoneNumber: "04241589764",
    });
  });
});
