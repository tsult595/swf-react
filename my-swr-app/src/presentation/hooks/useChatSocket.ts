import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message } from '../../Domain/Entities/MessageTypes';



const SOCKET_URL = 'http://localhost:3001';

export function useChatSocket(currentUserId: string, currentUsername: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!currentUserId) return;
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.emit('register', currentUserId);
    console.log('registering user:', currentUserId);
    socket.emit('get all messages');
    socket.on('all messages', (msgs: Message[]) => {
      if (!loaded) {
        setMessages(msgs);
        setLoaded(true);
      }
    });

    socket.on('chat message', (msg: Message) => {
      console.log('received chat message', msg);
      console.log('checking userId equal:', msg.userId === currentUserId, 'msg.userId:', msg.userId, 'currentUserId:', currentUserId);
      setMessages((prev) => {
        if (msg.userId === currentUserId) return prev; // Не добавлять свои сообщения из сокета
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserId]);

  type SendMessageArgs = {
    text: string;
    recipientId?: string;
    type?: 'normal' | 'private' | 'clanChat';
  };

  const sendMessage = ({ text, recipientId, type }: SendMessageArgs) => {
    if (!text.trim() || !socketRef.current || !currentUserId) return;
    const msg: Message = {
      id: Date.now().toString(),
      username: currentUsername,
      userId: currentUserId,
      text,
      type: type || 'normal',
      recipientId,
      timestamp: new Date().toISOString(),
    };
    console.log('emitting chat message', msg);
    setMessages((prev) => [...prev, msg]); // Добавить локально для отправителя
    socketRef.current.emit('chat message', msg);
    // ispravit front doljen otpravlat http soobwenie
  };

  return {
    messages,
    sendMessage,
    setMessages,
  };
}