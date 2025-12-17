export interface Message {
  id: number;                              
  // channel: 'global' | 'guild' | 'battle';
  username: string;
  userId: string;
  text: string;
  type: 'normal' | 'private' | 'clanChat';
  recipientId?: string;   
  timestamp: string;                       
}


export type SendMessageImport = Omit<Message, 'id' | 'timestamp' | 'type'>;

