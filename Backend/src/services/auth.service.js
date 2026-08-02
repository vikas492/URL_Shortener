import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";
import ApiError from "../utils/ApiError.js";
import refreshTokenRepository from "../repositories/refreshToken.repository.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt.js";

class AuthService {
  async register(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(
    409,
    "User already exists"
);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
  async login({ email, password }) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);
await refreshTokenRepository.create({
  token: refreshToken,
  userId: user.id,
  expiresAt: new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ),
});

  return {
  accessToken,
  refreshToken,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
};
}
async getCurrentUser(userId) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}
async refresh(refreshToken) {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  const payload = verifyToken(refreshToken);

  const storedToken =
    await refreshTokenRepository.findByToken(refreshToken);

  if (!storedToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user =
    await userRepository.findById(payload.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken =
    generateAccessToken(user);

return {
  accessToken,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
};
}
async logout(refreshToken) {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  await refreshTokenRepository.deleteByToken(refreshToken);

  return {
    message: "Logged out successfully",
  };
}
}

export default new AuthService();