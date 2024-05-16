// init api rest usin express and multer to upload a file and pass it to another microservices, run it on port 3000
const express = require('express');
const multer = require('multer');
const app = express();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const port = 3000;

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to receive the file
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Get file data from req.file
        const file = req.file;

        // Check if file exists
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const data = new FormData();
        data.append('file', file.buffer, file.originalname);

        // Send the file to another microservice
        const response = await axios.post('http://localhost:3001/upload', 
            data,
            {
                headers: {
                    ...data.getHeaders()
                }
            }
        );

        // Return the response from the other microservice
        res.send(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});