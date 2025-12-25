export interface Message {
  id: string;                              
  username: string;
  userId: string;
  text: string;
  type: 'normal' | 'private' | 'clanChat';
  recipientId?: string;   
  timestamp: string;
  clanName?: string;
}


export type SendMessageImport = Omit<Message, 'id' | 'timestamp' | 'type'>;

