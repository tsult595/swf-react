// src/hooks/useChatSocket.ts

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message } from '../../Domain/Entities/MessageTypes';

const SOCKET_URL = 'http://localhost:3001';

interface UseChatSocketReturn {
  sendMessage: (args: {
    text: string;
    recipientId?: string;
    type?: 'normal' | 'private' | 'clanChat';
    clanName?: string;
  }) => void;
}

export function useChatSocket(
  currentUserId: string,
  currentUsername: string,
  clanIds: string[],
  onNewMessage?: (message: Message) => void  // ← колбэк в родитель
): UseChatSocketReturn {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!currentUserId) return;

    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.emit('register', currentUserId);
    console.log('Socket registered:', currentUserId);

    if (clanIds.length > 0) {
      socket.emit('join clans', clanIds);
    }

    socket.on('chat message', (msg: Message) => {
      console.log('📨 Новое сообщение от сервера:', msg.text);
      onNewMessage?.(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserId, clanIds, onNewMessage]);

  const sendMessage = ({
    text,
    recipientId,
    type = 'normal',
    clanName,
  }: {
    text: string;
    recipientId?: string;
    type?: 'normal' | 'private' | 'clanChat';
    clanName?: string;
  }) => {
    if (!text.trim() || !socketRef.current) return;

  
    if (type === 'private' && recipientId) {
      const localMessage: Message = {
        id: `local-${Date.now()}-${Math.random()}`,
        userId: currentUserId,
        username: currentUsername,
        text: text.trim(),
        type,
        recipientId,
        clanName,
        timestamp: new Date().toISOString(),
      };
      onNewMessage?.(localMessage);
    }

    // Отправляем через сокет
    socketRef.current.emit('chat message', {
      text: text.trim(),
      type,
      recipientId,
      clanName,
      userId: currentUserId,
      username: currentUsername,
    });
  };

  return { sendMessage };
}