import { nanoid } from "nanoid";
import urlRepository from "../repositories/url.repository.js";
import ApiError from "../utils/ApiError.js";
import urlCache from "../cache/url.cache.js";

class UrlService {
async create(
  userId,
  originalUrl,
  customAlias = "",
  expiresAt = null
) {
  let shortCode;

  // User provided a custom alias
  if (customAlias) {
    const exists =
      await urlRepository.findByShortCode(customAlias);

    if (exists) {
      throw new ApiError(
        409,
        "Custom alias already exists"
      );
    }

    shortCode = customAlias;
  } else {
    // Generate a random shortcode
    while (true) {
      shortCode = nanoid(7);

      const exists =
        await urlRepository.findByShortCode(shortCode);

      if (!exists) break;
    }
  }

  const url = await urlRepository.create({
    userId,
    originalUrl,
    shortCode,
    expiresAt: expiresAt || null,
  });

  return {
    ...url,
    shortUrl: `${process.env.BASE_URL}/${shortCode}`,
  };
}

  async redirect(shortCode) {
  // 1️⃣ Check Redis first
  const cachedUrl = await urlCache.get(shortCode);

  if (cachedUrl) {
    console.log("🟢 Cache HIT");

    const url =
      await urlRepository.findByShortCode(shortCode);

    if (url) {
      await urlRepository.incrementClicks(url.id);
    }

    return cachedUrl;
  }

  console.log("🟡 Cache MISS");

  // 2️⃣ Not in Redis → Query PostgreSQL
  const url =
    await urlRepository.findByShortCode(shortCode);

  if (!url) {
    throw new ApiError(
      404,
      "Short URL not found"
    );
  }

  if (
    url.expiresAt &&
    url.expiresAt < new Date()
  ) {
    throw new ApiError(
      410,
      "URL has expired"
    );
  }

  // 3️⃣ Save in Redis
  await urlCache.set(
    shortCode,
    url.originalUrl
  );

  // 4️⃣ Increment clicks
  await urlRepository.incrementClicks(url.id);

  return url.originalUrl;
}

  // ✅ Backend Pagination
  async getMyUrls(
    userId,
    page = 1,
    limit = 5,
    search = ""
  ) {
    return await urlRepository.findByUserIdPaginated(
      userId,
      page,
      limit,
      search
    );
  }

  async getUrlById(id, userId) {
    const url =
      await urlRepository.findById(id, userId);

    if (!url) {
      throw new ApiError(
        404,
        "URL not found"
      );
    }

    return url;
  }

  async update(
  id,
  userId,
  originalUrl,
  customAlias = ""
) {
  // Find existing URL
  const existingUrl =
    await urlRepository.findById(id, userId);

  if (!existingUrl) {
    throw new ApiError(
      404,
      "URL not found"
    );
  }

  let shortCode = existingUrl.shortCode;

  // User wants to change alias
  if (
    customAlias &&
    customAlias !== existingUrl.shortCode
  ) {
    const aliasExists =
      await urlRepository.findByShortCode(
        customAlias
      );

    if (aliasExists) {
      throw new ApiError(
        409,
        "Custom alias already exists"
      );
    }

    shortCode = customAlias;
  }

  const updatedUrl =
  await urlRepository.update(
    id,
    userId,
    {
      originalUrl,
      shortCode,
    }
  );

// Remove old cache
await urlCache.delete(existingUrl.shortCode);

// If alias changed, remove the new alias too
if (shortCode !== existingUrl.shortCode) {
  await urlCache.delete(shortCode);
}

return updatedUrl;
}

async delete(id, userId) {
  const deletedUrl =
    await urlRepository.delete(id, userId);

  if (!deletedUrl) {
    throw new ApiError(
      404,
      "URL not found"
    );
  }

  // Remove from Redis cache
  await urlCache.delete(deletedUrl.shortCode);

  return deletedUrl;
}
async getStats(userId) {
  return await urlRepository.getStats(userId);
}
}

export default new UrlService();