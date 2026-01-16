
// import { useTelegramNews } from '../../utils/useTelegramNews';

// export default function TelegramNews() {
//   const { news, loading, error } = useTelegramNews();

//   if (loading) return <div>Загрузка...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>Новости Telegram-канала</h2>
//       <ul>
//         {news.map((item, idx) => (
//           <li key={idx}>
//             <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
//             <div dangerouslySetInnerHTML={{ __html: item.description }} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }