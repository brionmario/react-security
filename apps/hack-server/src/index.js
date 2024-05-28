import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, path.join('..', '.env.local'))});

const PORT = process.env.PORT || 5000;

const app = express();

const CORS_CONFIG = {
  credentials: true,
  origin: process.env.CLIENT_BASE_URLS.split(','),
};

app.use(bodyParser.json({extended: true, limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors(CORS_CONFIG));

app.get('/', (_, res) => {
  res.send(`⚡️ React Security - Hack Server!`);
});

// write a path to that gets the window object from a post request as a string and print the different storage objects
app.post('/hack/window', (req, res) => {
  const {window} = req.body;
  const storage = window.localStorage;
  const sessionStorage = window.sessionStorage;
  res.send({localStorage: storage, sessionStorage});
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default app;
