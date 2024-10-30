import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/compress-image', async (req, res) => {
    try {
        const { base64Image } = req.body;

        const buffer = Buffer.from(base64Image, 'base64');

        const compressedBuffer = await sharp(buffer)
            .resize(512, 512)
            .jpeg({ quality: 70 })
            .toBuffer();

        const compressedBase64 = compressedBuffer.toString('base64');
        
        res.json({ compressedBase64 });
    } catch (error) {
        console.error('Error compressing image:', error);
        res.status(500).json({ error: 'Failed to compress image' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
