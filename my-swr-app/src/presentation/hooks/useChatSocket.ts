import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message } from '../../Domain/Entities/MessageTypes';
import { sendMessage as sendMessageAPI, getAllMessages } from '../../data/api/messageApi';



const SOCKET_URL = 'http://localhost:3001';

export function useChatSocket(currentUserId: string, currentUsername: string, selectedRecipientId?: string, clanChatId?: string, clanIds?: string[]) {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!currentUserId) return;
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.emit('register', currentUserId);
    console.log('registering user:', currentUserId);
    if (clanIds) {
      socket.emit('join clans', clanIds);
      console.log('joining clans:', clanIds);
    }

    // Загружаем историю через HTTP
    const loadHistory = async () => {
      try {
        const msgs = await getAllMessages();
        console.log('loaded history via HTTP:', msgs);
        if (!loaded) {
          setMessages(msgs);
          setLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    };
    loadHistory();

    socket.on('chat message', (msg: Message) => {
      console.log('received chat message', msg);
      console.log('checking userId equal:', msg.userId === currentUserId, 'msg.userId:', msg.userId, 'currentUserId:', currentUserId);
      setMessages((prev) => {
        console.log('setMessages called, prev length:', prev.length, 'msg:', msg.text);
        if (msg.userId === currentUserId) return prev;
        if (prev.some((m) => m.id === msg.id)) return prev;
        const newArr = [...prev, msg];
        console.log('new messages length:', newArr.length);
        return newArr;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserId, clanIds]);

  type SendMessageArgs = {
    text: string;
    recipientId?: string;
    type?: 'normal' | 'private' | 'clanChat';
    clanName?: string;
  };

  const sendMessage = async ({ text, recipientId, type, clanName }: SendMessageArgs) => {
    if (!text.trim() || !currentUserId) return;
    const msg: Omit<Message, 'timestamp'> = {
      id: Date.now().toString(),
      username: currentUsername,
      userId: currentUserId,
      text,
      type: type || 'normal',
      recipientId,
      clanName,
    };
    console.log('sending message via HTTP', msg);
    setMessages((prev) => [...prev, { ...msg, timestamp: new Date().toISOString() }]); // Добавить локально для отправителя
    try {
      await sendMessageAPI(msg);
    } catch (error) {
      console.error('Failed to send message', error);
      // Optionally remove from local messages
      setMessages((prev) => prev.filter(m => m.id !== msg.id));
    }
  };

  return {
    messages,
    sendMessage,
    setMessages,
  };
}