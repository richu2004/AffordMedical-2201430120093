function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    setData(urls);
  }, []);

  return (
    <Grid container spacing={2} padding={4}>
      <Typography variant="h4">Shortened URLs Stats</Typography>
      {data.map(item => (
        <Grid item xs={12} key={item.id}>
          <Typography>
            Short URL: <a href={`/${item.id}`} target="_blank">http://localhost:3000/{item.id}</a>
          </Typography>
          <Typography>Original URL: {item.longUrl}</Typography>
          <Typography>Created At: {new Date(item.createdAt).toLocaleString()}</Typography>
          <Typography>Expires At: {new Date(item.expiresAt).toLocaleString()}</Typography>
          <Typography>Total Clicks: {item.clicks.length}</Typography>
          <ul>
            {item.clicks.map((click, idx) => (
              <li key={idx}>
                {click.timestamp} - {click.source} - {click.location}
              </li>
            ))}
          </ul>
        </Grid>
      ))}
    </Grid>
  );
}