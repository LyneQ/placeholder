import express from 'express';
import generatePlaceholderImage from './placeholder/basic';
import * as fs from "node:fs";

const app = express();
const port = 3000;

app.get('/:width(\\d+)x:height(\\d+)', async (req, res) => {
    const width = parseInt(req.params.width, 10);
    const height = parseInt(req.params.height, 10);
    const imageBuffer = await generatePlaceholderImage(width, height);

    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
});

app.get('/testpage', (_req, res) => {
  res.send(fs.readFileSync('test.html', 'utf8'));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});