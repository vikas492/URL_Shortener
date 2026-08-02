import { db } from "../db/index.js";
import { urls } from "../db/schema/index.js";
import {
  eq,
  sql,
  desc,
  and,
  or,
  ilike,
  count,
} from "drizzle-orm";

class UrlRepository {
  async create(data) {
    const [url] = await db
      .insert(urls)
      .values(data)
      .returning();

    return url;
  }
  async findByShortCode(shortCode) {
    const result = await db
        .select()
        .from(urls)
        .where(eq(urls.shortCode, shortCode))
        .limit(1);

    return result[0] || null;
}
async incrementClicks(id) {
  await db
    .update(urls)
    .set({
      clicks: sql`${urls.clicks} + 1`,
    })
    .where(eq(urls.id, id));
}
async findByUserId(userId, search = "") {
  const conditions = [eq(urls.userId, userId)];

  if (search) {
    conditions.push(
      ilike(urls.originalUrl, `%${search}%`)
    );
  }

  return await db
    .select()
    .from(urls)
    .where(and(...conditions))
    .orderBy(desc(urls.createdAt));
}
async findById(id, userId) {
  const result = await db
    .select()
    .from(urls)
    .where(
      and(
        eq(urls.id, id),
        eq(urls.userId, userId)
      )
    )
    .limit(1);

  return result[0] || null;
}
async update(id, userId, data) {
  const result = await db
    .update(urls)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(urls.id, id),
        eq(urls.userId, userId)
      )
    )
    .returning();

  return result[0] || null;
}
async delete(id, userId) {
  const result = await db
    .delete(urls)
    .where(
      and(
        eq(urls.id, id),
        eq(urls.userId, userId)
      )
    )
    .returning();

  return result[0] || null;
}
async findByUserIdPaginated(
  userId,
  page = 1,
  limit = 5,
  search = ""
) {
  const offset = (page - 1) * limit;

  const conditions = [eq(urls.userId, userId)];

  if (search) {
    conditions.push(
      or(
        ilike(urls.originalUrl, `%${search}%`),
        ilike(urls.shortCode, `%${search}%`)
      )
    );
  }

  const [urlList, total] = await Promise.all([
    db
      .select()
      .from(urls)
      .where(and(...conditions))
      .orderBy(desc(urls.createdAt))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(urls)
      .where(and(...conditions)),
  ]);

  return {
    urls: urlList,
    total: Number(total[0].count),
  };
}
async getStats(userId) {
  const result = await db
    .select({
      totalUrls: count(),
      totalClicks: sql`COALESCE(SUM(${urls.clicks}), 0)`,
      averageClicks: sql`COALESCE(AVG(${urls.clicks}), 0)`,
    })
    .from(urls)
    .where(eq(urls.userId, userId));

  return {
    totalUrls: Number(result[0].totalUrls),
    totalClicks: Number(result[0].totalClicks),
    averageClicks: Number(result[0].averageClicks).toFixed(1),
  };
}
}

export default new UrlRepository();