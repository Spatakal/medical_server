const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// routes for users
const userRoutes = require('./routes/users.routes');
app.use('/users', userRoutes);

// routes for medicines
const medicineRoutes = require('./routes/medicines.route');
app.use('/api/medicines', medicineRoutes);

// routes for diseases
const diseaseRoutes = require('./routes/diseases.route');
app.use('/api/diseases', diseaseRoutes);

// routes for medicine-disease mapping
const medicineDiseaseMapRoutes = require('./routes/medicineDiseaseMap.route');
app.use('/api/map', medicineDiseaseMapRoutes);

// routes for doctors
const doctorRoutes = require('./routes/doctors.route');
app.use('/api/doctors', doctorRoutes);

// routes for prescriptions
const prescriptionRoutes = require('./routes/prescriptions.route');
app.use('/api/prescriptions', prescriptionRoutes);

// routes for orders
const orderRoutes = require('./routes/orders.route');
app.use('/api/orders', orderRoutes);

// routes for doctordisease
const doctorDiseaseRoutes = require('./routes/doctorDisease.routes');
app.use('/api/doctor-disease', doctorDiseaseRoutes);

// routes for authentication
const loginRoutes = require('./authentication/login.routes')
app.use('/auth', loginRoutes)

app.get('/', (req, res) => {
  res.send('API running');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
