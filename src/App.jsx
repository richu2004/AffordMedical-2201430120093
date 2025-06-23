import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';

function Redirector() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    const entry = urls.find(u => u.id === code);
    if (!entry) return navigate('/');

    const now = new Date();
    if (now > new Date(entry.expiresAt)) {
      alert('Link expired!');
      return navigate('/');
    }
if(!entry.clicks) entry.clicks = [];
    entry.clicks.push({
      timestamp: now.toISOString(),
      source: document.referrer || 'Direct',
      location: 'Unknown', // can mock or use IP lookup
    });
    localStorage.setItem('urls', JSON.stringify(urls));

    window.location.href = entry.longUrl;
  }, [code, navigate]);

  return <p>Redirecting...</p>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:code" element={<Redirector />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
