import { useEffect, useState } from 'react';


export function useTelegramNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  async function fetchTelegramNews() {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/telegram-news'); // ← исправлено
      const data = await res.json(); // ← сервер возвращает JSON, не XML!
      setNews(data);
    } catch (e) {
      setError('Ошибка загрузки новостей');
    } finally {
      setLoading(false);
    }
  }
  fetchTelegramNews();
}, []);

  return { news, loading, error };
}