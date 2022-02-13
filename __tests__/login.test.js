/* ============================
>>>>>>> ПОЛУЧАЕТ (req): <<<<<<<
-------------------------------
{
  "email": "good-email@gmail.com",
  "password": "good0Pasword"
}
===============================
>>>>>> ВОЗВРАЩАЕТ (res): <<<<<<
-------------------------------
{
  status: "success",
  code: 200,
  data: {
    token: String,
    user: {
      email: String,
      subscription: String,
    },
  },
}
===============================
>>>>> ВОЗМОЖНЫЕ ВАРИАНТЫ: <<<<<
-------------------------------
1. Нормальный возврат.
2. Нет входных данных.
3. Непрвильная почта. 
4. Неправильный пароль.
============================ */

require("dotenv").config();
const jwt = require("jsonwebtoken");
const login = require("../controllers/users/loginMock");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const mockRes = {
  _id: "6206c09f98cf6c5422faf57f",
  email: "good-email@gmail.com",
  password: "$2a$10$mL4687XTtz7ZM7B7JUix9u5cqx3jrNkK36247lfsOb34Fj.KeTbIG",
  subscription: "starter",
  avatarURL: "https://www.gravatar.com/avatar/3d6131413283e654a7401aa32da93dc8",
};

describe("test login function", () => {
  test("1. Нормальный возврат", async () => {
    const mockReq = {
      body: {
        email: "good-email@gmail.com",
        password: "good0Pasword",
      },
    };

    const payload = {
      id: mockRes._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    const response = {
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: mockRes.email,
          subscription: mockRes.subscription,
        },
      },
    };

    jest.spyOn(User, "findOne").mockImplementation(async () => mockRes);
    jest
      .spyOn(User, "findByIdAndUpdate")
      .mockImplementation(async (id, { token }) =>
        console.log(
          "User.findByIdAndUpdate function work: ",
          "\nid ---> ",
          id,
          "\ntoken --->",
          token
        )
      );

    const resalt = await login(mockReq, mockRes);

    expect(resalt).toEqual(response);
  });

  test("2. Нет входных данных", async () => {
    await expect(login()).rejects.toThrow(
      "Cannot read properties of undefined (reading 'body')"
    );
  });

  test("3. Неправильная почта", async () => {
    const badEmail = {
      body: {
        email: "bad-email@gmail.com",
        password: "good0Pasword",
      },
    };

    jest.spyOn(User, "findOne").mockImplementation(async () => null);

    await expect(login(badEmail, mockRes)).rejects.toThrow(
      `Email ${badEmail.body.email} is wrong!`
    );
  });

  test("4. Неправильный пароль", async () => {
    const badPassword = {
      body: {
        email: "good-email@gmail.com",
        password: "bad0Password",
      },
    };

    jest.spyOn(User, "findOne").mockImplementation(async () => mockRes);

    await expect(login(badPassword, mockRes)).rejects.toThrow(
      `Password ${badPassword.body.password} is wrong!`
    );
  });
});
