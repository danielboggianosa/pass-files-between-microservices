// init api rest using express and multer to upload a file and save it in a folder, run it on port 3001
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const storage = multer
    .diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            const uuidv4 = crypto.randomUUID().replace(/-/g, '').substring(0, 20)
            const extension = file.originalname.split('.').pop();

            cb(null, uuidv4 + path.extname(file.originalname) + '.' + extension);
        },
    });
const upload = multer({ storage: storage });
app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    // Check if file exists
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log('File uploaded:', file);
    res.send('File uploaded successfully');
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
