import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './components/NewsCard';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // פונקציה למשיכת הנתונים מהשרת
  const fetchNews = async () => {
    try {
      setLoading(true);
      // פנייה לשרת ה-Node.js שהקמנו על פורט 5000
      const response = await axios.get('http://localhost:5000/api/news');
      setArticles(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("לא הצלחנו לטעון את הכתבות. ודא שהשרת שלך רץ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>Pulse News Dashboard</h1>
        <p style={styles.subtitle}>כל העדכונים החמים במקום אחד, בזמן אמת</p>
      </header>

      {loading && <div style={styles.message}>טוען כתבות...</div>}
      
      {error && <div style={{...styles.message, color: '#ef4444'}}>{error}</div>}

      {!loading && !error && (
        <main style={styles.grid}>
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </main>
      )}
    </div>
  );
}

// עיצוב כללי של הדאשבורד
const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    direction: 'rtl', // תמיכה מלאה בעברית
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    removeAttribute: 'center',
    marginBottom: '40px',
  },
  mainTitle: {
    fontSize: '2.5rem',
    color: '#0f172a',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#475569',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  message: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#64748b',
    marginTop: '40px',
  }
};

export default App;