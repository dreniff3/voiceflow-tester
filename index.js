import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose.set('debug', true);

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(error => console.error('MongoDB connection error:', error));

// const interactionSchema = new mongoose.Schema({
//     prompt: String,
//     image: String,
//     timestamp: Date,
// });

// const UserInteraction = mongoose.model('UserInteraction', interactionSchema);

app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true}));

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

        // await newInteraction.save();
        // res.status(200).json({ message: 'Interaction saved successfully!' });
    } catch (error) {
        console.error('Error compressing image:', error);
        res.status(500).json({ error: 'Failed to compress image' });
        // console.error('Error saving interaction:', error);
        // res.status(500).json({ error: 'Failed to save interaction' });
    }
});

// app.post('/save-interaction', async (req, res) => {
//     try {
//         const { prompt, image, timestamp } = req.body;

//         const newInteraction = new UserInteraction({
//             prompt,
//             image,
//             timestamp
//         });

//         await newInteraction.save();
//         res.status(200).json({ message: 'Interaction saved successfully!' });
//     } catch (error) {
//         console.error('Error saving interaction:', error);
//         res.status(500).json({ error: 'Failed to save interaction' });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
