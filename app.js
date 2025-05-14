const express=require('express')
const dotenv=require('dotenv')
const app=express();
const cors=require('cors')
const authRoutes=require('./routes/authRoutes')
const User = require('./models/userModel')
const connectDB=require('./config/db')
const bodyParser = require('body-parser');
app.use(bodyParser.json());





app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true              
}));
dotenv.config()


//Auth Routes
app.use('/api/auth',authRoutes)


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

