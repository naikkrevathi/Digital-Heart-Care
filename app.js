const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const symptomRoutes=require('./routes/symptomsRoutes');
const ecgRoutes=require('./routes/ecgRoutes');
const tmtRoutes=require('./routes/tmtRoutes');
const echoRoutes=require('./routes/echoRoutes');
const profileRoutes=require('./routes/profileRoutes');
const path = require('path');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', patientRoutes);
app.use('/api', doctorRoutes);
app.use('/api', symptomRoutes);
app.use('/api', ecgRoutes);
app.use('/api', tmtRoutes);
app.use('/api', echoRoutes);
app.use('/api', profileRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
