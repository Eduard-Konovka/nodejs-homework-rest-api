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
const login = require("../controllers/users/login");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

describe("test login function", () => {
  const user = {
    _id: "6206c09f98cf6c5422faf57f",
    email: "good-email@gmail.com",
    password: "$2a$10$mL4687XTtz7ZM7B7JUix9u5cqx3jrNkK36247lfsOb34Fj.KeTbIG",
    subscription: "starter",
    avatarURL:
      "https://www.gravatar.com/avatar/3d6131413283e654a7401aa32da93dc8",
  };

  const mockReq = {
    body: {
      email: "good-email@gmail.com",
      password: "good0Pasword",
    },
  };

  const mockRes = {
    status: function (data = 200) {
      return data;
    },
    json: function (data) {
      return data;
    },
  };

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });

  const result = {
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  };

  test("1. Нормальный возврат", async () => {
    jest.spyOn(User, "findOne").mockImplementation(async () => user);

    let returnId = "";
    let returnToken = "";
    jest
      .spyOn(User, "findByIdAndUpdate")
      .mockImplementation(async (id, { token }) => {
        returnId = id;
        returnToken = token;
      });

    let returnJson = {};
    jest
      .spyOn(mockRes, "json")
      .mockImplementation(async (json) => (returnJson = json));

    jest.spyOn(console, "log").mockImplementation(jest.fn());

    await login(mockReq, mockRes);

    expect(returnId).toEqual(user._id);
    expect(returnToken).toEqual(token);
    expect(returnJson).toEqual(result);
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

    jest.spyOn(User, "findOne").mockImplementation(async () => user);

    await expect(login(badPassword, mockRes)).rejects.toThrow(
      `Password ${badPassword.body.password} is wrong!`
    );
  });
});
