import { ListUserImpl } from "../../src/application/impl/user/list-user";
import { CreateUser, ReadUser, User } from "../../src/domain/entity/user";
import { UserRepository } from "../../src/domain/repository/interface/user-repository";

describe("List user usecase", () => {
  class MockUserRepository implements UserRepository {
    create(user: CreateUser): Promise<User> {
      throw new Error("Method not implemented");
    }

    findAll(): Promise<User[]> {
      throw new Error("Method not implemented");
    }

    findOne(id: number): Promise<User> {
      throw new Error("Method not implemented");
    }

    updateRole(id: number, role: string): Promise<User> {
      throw new Error("Method not implemented");
    }

    deleteOne(id: number): Promise<void> {
      throw new Error("Method not implemented");
    }

    findByEmail(email: string): Promise<User> {
      throw new Error("Method not implemented");
    }
  }

  let mockUserRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserRepository = new MockUserRepository();
  });

  test("should return data", async () => {
    const ExpectedData = [
      {
        id: 1,
        name: "andre",
        email: "andre@izarra.com",
        password: "123456",
        role: "admin",
        phoneNumber: "04241589764",
      },
    ];

    jest
      .spyOn(mockUserRepository, "findAll")
      .mockImplementation(() => Promise.resolve(ExpectedData));
    const listUser = new ListUserImpl(mockUserRepository);
    const result = await listUser.execute();
    expect(result).toStrictEqual(ExpectedData);
  });
});
