import { SequelizeWrapper } from "../../../src/adapters/repository/sequilize/db-sequelize-wrapper";
import { SequilizeUserRepository } from "../../../src/adapters/repository/sequilize/user-repository";

describe("Test User Repository", () => {
  let mockDatabase: SequelizeWrapper;

  beforeAll(async () => {
    mockDatabase = {
      findAll: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return data", async () => {
    const db = new SequilizeUserRepository(mockDatabase);
    jest.spyOn(mockDatabase, "findAll").mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          name: "andre",
          email: "andre@izarra.com",
          password: "123456",
          role: "admin",
          phoneNumber: "",
        },
      ])
    );
    const result = await db.findAll();
    expect(result).toStrictEqual([
      {
        id: 1,
        name: "andre",
        email: "andre@izarra.com",
        password: "123456",
        role: "admin",
        phoneNumber: "",
      },
    ]);
  });

  test("create", async () => {
    const ds = new SequilizeUserRepository(mockDatabase);
    jest.spyOn(mockDatabase, "create").mockImplementation(() =>
      Promise.resolve({
        id: 1,
        name: "Andre",
        password: "123456",
        email: "andre@izarra.com",
        role: "seller",
        phoneNumber: "",
      })
    );
    const result = await ds.create({
      name: "Andre",
      email: "andre@izarra.com",
      password: "123456",
      role: "admin",
    });

    expect(mockDatabase.create).toHaveBeenCalledWith({
      name: "Andre",
      password: "123456",
      email: "andre@izarra.com",
      role: "admin",
    });
    expect(result).toStrictEqual({
      id: 1,
      name: "Andre",
      password: "123456",
      email: "andre@izarra.com",
      role: "seller",
      phoneNumber: "",
    });
  });

  test("update", async () => {
    const db = new SequilizeUserRepository(mockDatabase);
    jest.spyOn(mockDatabase, "update").mockImplementation(() =>
      Promise.resolve({
        id: 1,
        name: "Andre",
        password: "123456",
        email: "andre@izarra.com",
        role: "seller",
        phoneNumber: "",
      })
    );
    const result = db.updateRole(1, "admin")
    expect(mockDatabase.update).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({
        id: 1,
        name: "Andre",
        password: "123456",
        email: "andre@izarra.com",
        role: "admin",
        phoneNumber: "",
      })
  });
});
