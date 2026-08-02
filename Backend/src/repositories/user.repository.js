import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema/index.js";

class UserRepository {
  async findByEmail(email) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] || null;
  }

  async create(userData) {
    const result = await db
      .insert(users)
      .values(userData)
      .returning();

    return result[0];
  }
  async findById(id) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return result[0] || null;
}
}

export default new UserRepository();