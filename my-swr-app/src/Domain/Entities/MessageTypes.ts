// 👇 Основной интерфейс (полное сообщение из БД)
export interface Message {
  id: number;                              
  // channel: 'global' | 'guild' | 'battle';
  username: string;
  userId: string;
  text: string;
  // type: 'normal' | 'system' | 'battle';    
  timestamp: string;                       
}


export type SendMessageImport = Omit<Message, 'id' | 'timestamp' | 'type'>;

