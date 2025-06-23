import { useState } from 'react';
import { logEvent } from '../middleware/logger';
import { isValidURL, generateShortcode, isValidShortcode } from '../utils/helpers';
import { TextField, Button, Grid, Typography } from '@mui/material';

function Home() {
  const [inputs, setInputs] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [shortened, setShortened] = useState([]);

  const handleSubmit = () => {
    const results = [];
    const allUrls = JSON.parse(localStorage.getItem('urls')) || [];

    inputs.forEach((item, index) => {
      if (!isValidURL(item.longUrl)) {
        alert(`URL ${index + 1} is invalid`);
        return;
      }

      let code = item.shortcode || generateShortcode();
      if (item.shortcode && !isValidShortcode(code)) {
        alert(`Shortcode ${index + 1} is invalid`);
        return;
      }

      const isDuplicate = allUrls.find(u => u.shortcode === code);
      if (isDuplicate) {
        alert(`Shortcode ${code} already exists`);
        return;
      }

      const now = new Date();
      const validityMin = parseInt(item.validity) || 30;

      const newShort = {
        id: code,
        longUrl: item.longUrl,
        createdAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + validityMin * 60000).toISOString(),
        clicks: [],
      };

      allUrls.push(newShort);
      results.push(newShort);
      logEvent('URL_SHORTENED', { shortcode: code, original: item.longUrl });
    });

    setShortened(results);
    localStorage.setItem('urls', JSON.stringify(allUrls));
  };

  return (
    <Grid container spacing={2} padding={4}>
      <Typography variant="h4">URL Shortener</Typography>
      {inputs.map((input, i) => (
        <Grid item xs={12} key={i}>
          <TextField
            label="Long URL"
            fullWidth
            value={input.longUrl}
            onChange={e => {
              const updated = [...inputs];
              updated[i].longUrl = e.target.value;
              setInputs(updated);
            }}
          />
          <TextField
            label="Validity (minutes)"
            type="number"
            value={input.validity}
            onChange={e => {
              const updated = [...inputs];
              updated[i].validity = e.target.value;
              setInputs(updated);
            }}
          />
          <TextField
            label="Custom Shortcode"
            value={input.shortcode}
            onChange={e => {
              const updated = [...inputs];
              updated[i].shortcode = e.target.value;
              setInputs(updated);
            }}
          />
        </Grid>
      ))}
      <Button onClick={() => inputs.length < 5 && setInputs([...inputs, { longUrl: '', validity: '', shortcode: '' }])}>
        Add Another
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Shorten URLs
      </Button>

      <Grid item xs={12}>
        {shortened.map(s => (
          <Typography key={s.id}>
            <a href={`/${s.id}`} target="_blank" rel="noreferrer">
              http://localhost:3000/{s.id}
            </a> (expires at: {new Date(s.expiresAt).toLocaleString()})
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
}
export default Home;