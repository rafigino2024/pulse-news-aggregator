import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// טעינת משתני הסביבה מקובץ ה-.env
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// נתיב למשיכת חדשות אמיתיות
app.get('/api/news', async (req, res) => {
  try {
    // קריאה ל-API החיצוני (מביא חדשות טכנולוגיה מארה"ב לדוגמה)
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: 'technology',
        apiKey: process.env.NEWS_API_KEY // שימוש בטוח במפתח
      }
    });

    // ה-API החיצוני מחזיר מבנה שונה ממה שה-React שלנו מצפה לקבל.
    // לכן, אנחנו עושים "מיפוי" (Mapping) כדי להתאים את הנתונים למבנה הקיים שלנו:
    const formattedArticles = response.data.articles
      .filter(article => article.title && article.description) // מסנן כתבות חסרות מידע
      .slice(0, 9) // לוקח רק את ה-9 הראשונות
      .map((article, index) => ({
        id: index.toString(),
        title: article.title,
        summary: article.description,
        source: article.source.name,
        category: 'טכנולוגיה', // כרגע שמנו קבוע כי משכנו רק טכנולוגיה
        publishedAt: article.publishedAt,
        url: article.url // הוספנו לינק לכתבה המקורית למקרה שנרצה להשתמש בזה
      }));

    res.json(formattedArticles);

  } catch (error) {
    console.error('Error fetching news from API:', error.message);
    res.status(500).json({ message: 'שגיאה בקבלת הנתונים משרת החדשות' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 השרת רץ בהצלחה על פורט: http://localhost:${PORT}`);
});