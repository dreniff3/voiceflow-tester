import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('debug', true);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));

const interactionSchema = new mongoose.Schema({
    prompt: String,
    image: String,
    timestamp: Date,
});

const UserInteraction = mongoose.model('UserInteraction', interactionSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true}));

app.post('/save-interaction', async (req, res) => {
    try {
        const { prompt, image, timestamp } = req.body;

        const newInteraction = new UserInteraction({
            prompt,
            image,
            timestamp
        });

        await newInteraction.save();
        res.status(200).json({ message: 'Interaction saved successfully!' });
    } catch (error) {
        console.error('Error saving interaction:', error);
        res.status(500).json({ error: 'Failed to save interaction' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
