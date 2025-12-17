
export interface UserType {
  id: string;
  createdAt: string;
}

export type UserInfo = {
  id: string;
  nickname?: string;
  clans?: string[];
  userAgent: string;
  language: string;
  platform: string;
  location: string | null;
};