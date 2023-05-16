const multer = require('multer');
const express = require('express');
const cors = require('cors');
const app = express();

const fs = require('fs');
const path = require('path');

app.use(cors({
  origin: 'http://localhost:3000' 
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = uniqueSuffix + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// 파일 업로드를 처리하는 라우트 핸들러
app.post('/upload', upload.single('file'), (req, res) => {
  // 업로드된 파일은 req.file 객체로 접근할 수 있습니다.
  if (!req.file) {
    // 파일이 전송되지 않은 경우 처리 로직
    return res.status(400).send('No file uploaded.');
  }

  // 파일 업로드 완료 후 응답
  res.send('Image uploaded to 4000 server successfully.');
});
// 클라이언트로부터의 GET 요청에 응답하여 업로드된 이미지를 전송
app.get('/result', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');
  const files = fs.readdirSync(directoryPath);

  if (files.length === 0) {
    return res.status(404).send('Image not found.');
  }

  const latestFile = files[files.length - 1];
  const imagePath = path.join(directoryPath, latestFile);
  res.sendFile(imagePath);
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
