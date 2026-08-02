import { and, eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { refreshTokens } from "../db/schema/index.js";

class RefreshTokenRepository {
  async create(tokenData) {
    const result = await db
      .insert(refreshTokens)
      .values(tokenData)
      .returning();

    return result[0];
  }

  async findByUserId(userId) {
    const result = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.userId, userId));

    return result;
  }

  async findToken(userId, token) {
    const result = await db
      .select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.userId, userId),
          eq(refreshTokens.token, token)
        )
      )
      .limit(1);

    return result[0] || null;
  }

  async deleteToken(id) {
    await db
      .delete(refreshTokens)
      .where(eq(refreshTokens.id, id));
  }

  async deleteAllUserTokens(userId) {
    await db
      .delete(refreshTokens)
      .where(eq(refreshTokens.userId, userId));
  }
  async findByToken(token) {
  const result = await db
    .select()
    .from(refreshTokens)
    .where(eq(refreshTokens.token, token))
    .limit(1);

  return result[0] || null;
}
async deleteByToken(token) {
  await db
    .delete(refreshTokens)
    .where(eq(refreshTokens.token, token));
}
}

export default new RefreshTokenRepository();