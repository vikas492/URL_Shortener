export interface Url {
  id: string;
  userId: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}