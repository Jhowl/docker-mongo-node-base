import express from 'express';
import mongoose from 'mongoose';
// import  openaiRoutes from './openaiRoutes'

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

// Connect to MongoDB
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(connection => {
   console.log('MongoDB Connected')
   const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to MongoDB');
  });

  // Define the User schema
  const userSchema = new mongoose.Schema({
    telegramId: {
      type: Number,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  });

  // Create the User model
  const User = mongoose.model('User', userSchema);

  // Save a user to the database
  app.post('/user', async (req, res) => {
    const user = new User({
      telegramId: req.body.telegramId,
      firstName: req.body.firstName, // corrected typo here
      lastName: req.body.lastName,
    });
    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      console.log(error);
      res.status(400).send(JSON.stringify(error));
    }
  });
})
.catch((err) => console.log(err));

mongoose.set('strictQuery', true);


// Use the OpenAI routes
// app.use('/openai', openaiRoutes);

// Start the express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
