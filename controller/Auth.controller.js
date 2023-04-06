import jwt from "jsonwebtoken";

// middleware
import catchAsync from "../middleware/catchAsync.js";
import {
  CheckEmailandPasswordService,
  LougoutService,
} from "../service/Auth.Service.js";
import clearCookie from "../utils/clearCookie.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";

// Signin Controller - check user if it is in db and creates access and refreshToken
export const Signin = catchAsync(async (request, response, next) => {
  const { body, cookies } = request;

  const foundUser = await CheckEmailandPasswordService(body);

  // checks if there is a jwt cookie that was also sent by the client.

  if (cookies.jwt) {
    foundUser.refreshToken = foundUser.refreshToken.filter(
      (token) => token !== cookies.jwt
    );
    foundUser.save();
    clearCookie(request, response);
  }

  // create accessToken
  const accessToken = jwt.sign(
    { email: foundUser.email },
    process.env.JWT_ACCESSTOKEN_SECRET,
    {
      expiresIn: 1000,
    }
  );

  // create refreshToken
  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.JWT_REFRESHTOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  // save the refreshToken in the database
  const newRefreshTokenArray = [...foundUser.refreshToken, refreshToken];
  foundUser.refreshToken = newRefreshTokenArray;
  foundUser.save();

  // saving refresh token as a httponlycookie
  response.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: request.secure || request.headers["x-forwarded-proto"] === "https",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return response.status(HttpSuccessCode.Accepted).json({
    status: "success",
    data: {
      email: foundUser.email,
      roles: foundUser.role,
      accessToken,
    },
  });
});

// Logout Controller - clears the cookie and logs out the user
export const Logout = catchAsync(async (request, response) => {
  const { cookies } = request;

  // if no jwt just send response with logged out message
  if (!cookies.jwt) {
    return response
      .status(HttpSuccessCode.Accepted)
      .send("Successfully Logged out");
  }

  // find the user with the jwt in the database

  const foundUser = await LougoutService(cookies.jwt, request, response);

  // remove the refreshtoken that matches the jwt

  foundUser.refreshToken = foundUser.refreshToken.filter(
    (token) => token !== cookies.jwt
  );
  foundUser.save();

  // clear cookie
  clearCookie(request, response);

  return response
    .status(HttpSuccessCode.Accepted)
    .send("Successfully Logged out");
});
