const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "fruit",
    password: "newpassword",
    port: 5432,
});


app.get('/product/:msp', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.products WHERE msp = $1', [req.params.msp]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
