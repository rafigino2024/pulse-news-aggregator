import React from 'react';

const NewsCard = ({ article }) => {
  // פונקציית עזר לעיצוב התאריך בצורה קריאה
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('he-IL', options);
  };

  return (
    <div style={styles.card}>
      <div style={styles.badge}>{article.category}</div>
      <h3 style={styles.title}>{article.title}</h3>
      <p style={styles.summary}>{article.summary}</p>
      <div style={styles.footer}>
        <span style={styles.source}>מקור: <strong>{article.source}</strong></span>
        <span style={styles.date}>{formatDate(article.publishedAt)}</span>
      </div>
    </div>
  );
};

// עיצוב בסיסי ונקי ב-Inline CSS כדי לשמור על הפשטות בשלב זה
const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    border: '1px solid #eef2f6',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    color: '#1e293b',
    lineHeight: '1.4',
  },
  summary: {
    margin: 0,
    color: '#64748b',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '12px',
    borderTop: '1px solid #f1f5f9',
    fontSize: '0.85rem',
    color: '#94a3b8',
  },
  source: {
    color: '#475569',
  },
  date: {
    fontSize: '0.8rem',
  }
};

export default NewsCard;