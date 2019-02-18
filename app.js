const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.htm'));
});

app.get('/video', function(req, res) {

  const videoPath = 'videos/sample.mp4'
  const stat = fs.statSync(videoPath)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10); 
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, {start, end});
    const head = {
      'Content-Range': `bytes ${start} - ${end} / ${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(videoPath).pipe(res)
  }

});

app.listen(PORT, () => {
  console.log('\x1b[33m%s\x1b[0m', `Listening of PORT ${PORT}`);
});