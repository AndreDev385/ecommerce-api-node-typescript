import { SequelizeUserDataSource } from "../../../../src/adapters/data-source/sequelize/sequelize-user-data-source";
import { SequelizeWrapper } from "../../../../src/adapters/data-source/sequelize/user-sequelize-wrapper";

describe("Sequelize DataSource", () => {
  let mockDatabase: SequelizeWrapper;

  beforeAll(async () => {
    mockDatabase = {
      findAll: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      updateRole: jest.fn(),
      deleteOne: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("findAll", async () => {
    const ds = new SequelizeUserDataSource(mockDatabase);
    jest.spyOn(mockDatabase, "findAll").mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          name: "andre",
          email: "andre@izarra.com",
          role: "admin",
        },
      ])
    );

    const result = await ds.findAll();
    expect(mockDatabase.findAll).toHaveBeenCalledWith({
      where: { isActive: true },
    });
    expect(result).toStrictEqual([
      {
        id: 1,
        name: "andre",
        email: "andre@izarra.com",
        role: "admin",
        phoneNumber: undefined,
      },
    ]);
  });

  test("create", async () => {
    const ds = new SequelizeUserDataSource(mockDatabase);
    jest.spyOn(mockDatabase, "create").mockImplementation(() =>
      Promise.resolve({
        id: 1,
        name: "Andre",
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
      email: "andre@izarra.com",
      role: "seller",
      phoneNumber: "",
    });
  });
});
