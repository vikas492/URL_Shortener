import authService from "../services/auth.service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
  try {
    const data = await authService.login(req.body);

 res.cookie("refreshToken", data.refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

return res.status(200).json({
  success: true,
  message: "Login successful",
  data: {
    accessToken: data.accessToken,
    user: data.user,
  },
});
  } catch (error) {
    next(error);
  }
}
async me(req, res, next) {
  try {
    const user = await authService.getCurrentUser(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
 async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

      const data = await authService.refresh(refreshToken);

      return res.status(200).json({
        success: true,
        message: "Access token refreshed successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    await authService.logout(refreshToken);

    res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}
}

export default new AuthController();