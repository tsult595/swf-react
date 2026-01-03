

export const MessageTypeEnum = {
  NORMAL: 'normal',
  PRIVATE: 'private',
  CLAN_CHAT: 'clanChat',
} as const;

export type MessageType = typeof MessageTypeEnum[keyof typeof MessageTypeEnum];