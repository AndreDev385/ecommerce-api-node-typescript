import { UserDataSource } from "../../../src/adapters/data-source/user-data-source";
import { CreateUser, ReadUser, User } from "../../../src/domain/entity/user";
import { UserRepository } from "../../../src/domain/repository/interface/user-repository";
import { UserRepositoryImpl } from "../../../src/adapters/repository/user-repository";

class MockUserDataSource implements UserDataSource {
  create(user: CreateUser): Promise<ReadUser> {
    throw new Error("Method not implemented");
  }

  findAll(): Promise<ReadUser[]> {
    throw new Error("Method not implemented");
  }
  findOne(id: number): Promise<ReadUser> {
    throw new Error("Method not implemented");
  }
  updateRole(id: number, role: string): Promise<ReadUser> {
    throw new Error("Method not implemented");
  }
  deleteOne(id: number): Promise<void> {
    throw new Error("Method not implemented");
  }
}

describe("Test User Repository", () => {
  let mockUserDataSource: UserDataSource;
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserDataSource = new MockUserDataSource();
    userRepository = new UserRepositoryImpl(mockUserDataSource);
  });

  describe("get all users", () => {
    test("should return data", async () => {
      const ExpectedData = [
        {
          id: 1,
          name: "Andre",
          email: "andre@izarra.com",
          role: "admin",
          phoneNumber: "04244567891",
        },
      ];

      jest
        .spyOn(mockUserDataSource, "findAll")
        .mockImplementation(() => Promise.resolve(ExpectedData));
      const result = await userRepository.findAll();
      expect(result).toStrictEqual(ExpectedData);
    });
  });

  describe("create new user", () => {
    test("should return true", async () => {
      const InputData = {
        name: "Andre",
        email: "andre@izarra.com",
        password: "123456",
        role: "admin",
        phoneNumber: "04244567891",
      };
      jest.spyOn(mockUserDataSource, "create").mockImplementation(() =>
        Promise.resolve({
          id: 1,
          name: "Andre",
          email: "andre@izarra.com",
          role: "admin",
          phoneNumber: "04244567891",
        })
      );
      const result = await userRepository.create(InputData);
      expect(result).toStrictEqual({
        id: 1,
        name: "Andre",
        email: "andre@izarra.com",
        role: "admin",
        phoneNumber: "04244567891",
      });
    });
  });
});
