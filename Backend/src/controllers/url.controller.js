import urlService from "../services/url.service.js";

class UrlController {
  async create(req, res, next) {
    try {
      const url = await urlService.create(
  req.user.userId,
  req.body.originalUrl,
  req.body.customAlias,
  req.body.expiresAt
);

      return res.status(201).json({
        success: true,
        message: "Short URL created successfully",
        data: url,
      });
    } catch (error) {
      next(error);
    }
  }

  async redirect(req, res, next) {
    try {
      const url = await urlService.redirect(
        req.params.shortCode
      );

      return res.redirect(url);
    } catch (error) {
      next(error);
    }
  }

  // ✅ Backend Pagination
  async getMyUrls(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const search = req.query.search || "";

      const result = await urlService.getMyUrls(
        req.user.userId,
        page,
        limit,
        search
      );

      return res.status(200).json({
        success: true,
        data: result.urls,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUrlById(req, res, next) {
    try {
      const url = await urlService.getUrlById(
        req.params.id,
        req.user.userId
      );

      return res.status(200).json({
        success: true,
        data: url,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
     const url =
  await urlService.update(
    req.params.id,
    req.user.userId,
    req.body.originalUrl,
    req.body.customAlias
  );

      return res.status(200).json({
        success: true,
        message: "URL updated successfully",
        data: url,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await urlService.delete(
        req.params.id,
        req.user.userId
      );

      return res.status(200).json({
        success: true,
        message: "URL deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async getStats(req, res, next) {
  try {
    const stats = await urlService.getStats(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
}
}

export default new UrlController();