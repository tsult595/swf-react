import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message } from '../../Domain/Entities/MessageTypes';

const SOCKET_URL = 'http://localhost:3001';

export function useChatSocket(currentUserId: string, currentUsername: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!currentUserId) return;
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    // Получить все сообщения при подключении
    socket.emit('get all messages');
    socket.on('all messages', (msgs: Message[]) => {
      setMessages(msgs);
    });

    socket.on('chat message', (msg: Message) => {
      setMessages((prev) => {
        // Добавлять только если такого id ещё нет
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserId]);

  const sendMessage = (text: string) => {
    if (!text.trim() || !socketRef.current) return;
    const msg: Message = {
      id: Date.now(),
      username: currentUsername,
      userId: currentUserId,
      text,
      timestamp: new Date().toISOString(),
    };
    socketRef.current.emit('chat message', msg);
  };

  return {
    messages,
    sendMessage,
  };
}