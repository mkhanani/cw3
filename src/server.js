const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path'); // Import path module for working with file paths

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// A logger middleware that outputs all requests to the server console
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Static file middleware that returns lesson images
// Replace 'public/images' with the actual path where your images are stored
app.use('/images', express.static(path.join(__dirname, '/Users/mustafakhanani/Downloads/CST3145_main/CW1_main/images')));

// Middleware for allowing CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

// MongoDB connection
let db;
MongoClient.connect('mongodb+srv://ak2650:uni123@cluster0.rthvzm3.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db('afterschool');

        // Root path to show that API is working
        app.get('/', (req, res) => {
            res.send('Select a collection, e.g., /collection/lessons');
        });

        // GET route to fetch all lessons
        app.get('/collection/lessons', async (req, res) => {
            try {
                const lessons = await db.collection('lessons').find({}).toArray();
                res.json(lessons);
            } catch (error) {
                console.error('Error fetching lessons:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // POST route to save a new order
        app.post('/collection/orders', async (req, res) => {
            try {
                const newOrder = req.body;
                const result = await db.collection('orders').insertOne(newOrder);
                res.json(result.ops[0]);
            } catch (error) {
                console.error('Error saving order:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // PUT route to update lesson spaces after an order is submitted
        app.put('/collection/lessons/:id', async (req, res) => {
            try {
                const lessonId = req.params.id;
                const spaces = req.body.spaces;
                const result = await db.collection('lessons').updateOne({ _id: ObjectId(lessonId) }, { $set: { spaces: spaces } });
                res.json({ message: 'Lesson spaces updated successfully' });
            } catch (error) {
                console.error('Error updating lesson spaces:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // GET route to retrieve a document by ID from any collection
        app.get('/collection/:collectionName/:id', async (req, res) => {
            try {
                const collectionName = req.params.collectionName;
                const objectId = req.params.id;
                const document = await db.collection(collectionName).findOne({ _id: ObjectId(objectId) });
                res.json(document);
            } catch (error) {
                console.error('Error fetching document:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // PUT route to update a document by ID in any collection
        app.put('/collection/:collectionName/:id', async (req, res) => {
            try {
                const collectionName = req.params.collectionName;
                const objectId = req.params.id;
                const result = await db.collection(collectionName).updateOne({ _id: ObjectId(objectId) }, { $set: req.body });
                res.json({ msg: result.modifiedCount === 1 ? 'success' : 'error' });
            } catch (error) {
                console.error('Error updating document:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // DELETE route to delete a document by ID from any collection
        app.delete('/collection/:collectionName/:id', async (req, res) => {
            try {
                const collectionName = req.params.collectionName;
                const objectId = req.params.id;
                const result = await db.collection(collectionName).deleteOne({ _id: ObjectId(objectId) });
                res.json({ msg: result.deletedCount === 1 ? 'success' : 'error' });
            } catch (error) {
                console.error('Error deleting document:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
