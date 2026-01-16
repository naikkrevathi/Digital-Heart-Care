const express = require('express');
const db = require('../db');
const nodemailer = require('nodemailer');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  console.log('Register endpoint hit'); // Debug 1
  const { username, name, email, gender, dob, age, address, injuries, contact } = req.body;
  console.log('Request body:', req.body); // Debug 2

  const password = `PAss${Math.floor(100000 + Math.random() * 900000)}`;
  const uhid = `UHID${Math.floor(100000 + Math.random() * 900000)}`;
  const appname = "Cardiology";
  
  console.log('Generated credentials - username:', username, 'password:', password, 'UHID:', uhid); // Debug 3

  const sqlPatient = `INSERT INTO patient_master (full_name, email, phone, username, status, image, UHID, gender, age, address, injuries, dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const sqlUser = `INSERT INTO user_master (username, type, password, status) VALUES (?, ?, ?, ?)`;
  
  console.log('SQL Patient:', sqlPatient); // Debug 4
  console.log('SQL User:', sqlUser); // Debug 5

  try {
    // Insert into patient_master
    console.log('Attempting to insert into patient_master'); // Debug 6
    await new Promise((resolve, reject) => {
      db.execute(sqlPatient, [name, email, contact, username, true, 'user/patient_image.jpg', uhid, gender, age, address, injuries, dob], (err, result) => {
        if (err) {
          console.error('Error inserting into patient_master:', err); // Debug 7
          return reject(err);
        }
        console.log('Successfully inserted into patient_master:', result); // Debug 8
        resolve(result);
      });
    });

    // Insert into user_master
    console.log('Attempting to insert into user_master'); // Debug 9
    await new Promise((resolve, reject) => {
      db.execute(sqlUser, [username, 'Patient', password, true], (err, result) => {
        if (err) {
          console.error('Error inserting into user_master:', err); // Debug 10
          return reject(err);
        }
        console.log('Successfully inserted into user_master:', result); // Debug 11
        resolve(result);
      });
    });

    // Send email using nodemailer
    console.log('Setting up email transporter'); // Debug 12
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${appname}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `User Registration: ${appname}`,
      html: `Dear ${name},<br> You have recently registered to our webpage.<br> USERNAME: ${username}<br>PASSWORD: ${password}<br>UHID: ${uhid}<br><br>Thank you,<br>Team ${appname}`,
    };

    console.log('Attempting to send email to:', email); // Debug 13
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully'); // Debug 14

    res.json({ success: true, message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error in registration process:', err); // Debug 15
    res.status(500).send('Unable to process, kindly try again later.');
  }
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM user_master WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) {
      res.json({ success: true, type: result[0].type, id: result[0].id });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Change Password for Admin
router.post('/change-password', (req, res) => {
  const { adminId, currentPassword, newPassword } = req.body;

  const sql = 'SELECT * FROM user_master WHERE id = ? AND type = "Admin"';
  db.query(sql, [adminId], (err, result) => {
    if (err) return res.status(500).send('Error occurred');

    const user = result[0]; // Fetch the specific admin user by ID
    if (user) {
      if (user.password === currentPassword) {
        const updateSql = 'UPDATE user_master SET password = ? WHERE id = ?';
        db.query(updateSql, [newPassword, adminId], (err) => {
          if (err) return res.status(500).send('Failed to update password');
          res.json({ success: true });
        });
      } else {
        res.status(401).send('Incorrect current password');
      }
    } else {
      res.status(404).send('Admin user not found');
    }
  });
});

// Change Password for docotor
router.post('/change-password-doctor', (req, res) => {
  const { adminId, currentPassword, newPassword } = req.body;

  const sql = 'SELECT * FROM user_master WHERE id = ? AND type = "Doctor"';
  db.query(sql, [adminId], (err, result) => {
    if (err) return res.status(500).send('Error occurred');

    const user = result[0]; // Fetch the specific admin user by ID
    if (user) {
      if (user.password === currentPassword) {
        const updateSql = 'UPDATE user_master SET password = ? WHERE id = ?';
        db.query(updateSql, [newPassword, adminId], (err) => {
          if (err) return res.status(500).send('Failed to update password');
          res.json({ success: true });
        });
      } else {
        res.status(401).send('Incorrect current password');
      }
    } else {
      res.status(404).send('Admin user not found');
    }
  });
});

router.post('/change-password-patient', (req, res) => {
  const { adminId, currentPassword, newPassword } = req.body;

  const sql = 'SELECT * FROM user_master WHERE id = ? AND type = "Patient"';
  db.query(sql, [adminId], (err, result) => {
    if (err) return res.status(500).send('Error occurred');

    const user = result[0]; // Fetch the specific admin user by ID
    if (user) {
      if (user.password === currentPassword) {
        const updateSql = 'UPDATE user_master SET password = ? WHERE id = ?';
        db.query(updateSql, [newPassword, adminId], (err) => {
          if (err) return res.status(500).send('Failed to update password');
          res.json({ success: true });
        });
      } else {
        res.status(401).send('Incorrect current password');
      }
    } else {
      res.status(404).send('Admin user not found');
    }
  });
});
// Change Password for User
router.post('/change-password-user', (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const sql = 'SELECT * FROM users WHERE role = "User"';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send('Error occurred');

    const user = result[0]; // Assuming there's only one user
    if (user) {
      if (user.password === currentPassword) {
        const updateSql = 'UPDATE users SET password = ? WHERE user_id = ?';
        db.query(updateSql, [newPassword, user.user_id], (err) => {
          if (err) return res.status(500).send('Failed to update password');
          res.json({ success: true });
        });
      } else {
        res.status(401).send('Incorrect current password');
      }
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Get Users
router.get('/users', (req, res) => {
  const sql = 'SELECT user_id, name, email, role FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
// Get Police Users
router.get('/users/police', (req, res) => {
  const sql = 'SELECT user_id, name, email, role FROM users WHERE role = "Police"';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Delete User
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE user_id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('User deleted successfully');
  });
});

// Update User
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE user_id = ?';
  db.query(sql, [name, email, role, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('User updated successfully');
  });
});

// Dashboard Route
router.get('/dashboard', async (req, res) => {
  try {
    const stats = {};

    // Count total patients
    stats.totalPatients = await new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS count FROM patient_master', (err, result) => {
        if (err) return reject(err);
        resolve(result[0].count);
      });
    });

    // Count total doctors
    stats.totalDoctors = await new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS count FROM doctor_master', (err, result) => {
        if (err) return reject(err);
        resolve(result[0].count);
      });
    });

    // Count total ECG records
    stats.totalECG = await new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS count FROM ecg', (err, result) => {
        if (err) return reject(err);
        resolve(result[0].count);
      });
    });

    // Count total ECHO records
    stats.totalECHO = await new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS count FROM echo', (err, result) => {
        if (err) return reject(err);
        resolve(result[0].count);
      });
    });

    // Count total TMT records
    stats.totalTMT = await new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS count FROM tmt', (err, result) => {
        if (err) return reject(err);
        resolve(result[0].count);
      });
    });

    // Recent activities (last 5 records from ecg, echo, and tmt)
    stats.recentActivities = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT 'ECG' AS type, date FROM ecg
        UNION ALL
        SELECT 'ECHO' AS type, date FROM echo
        UNION ALL
        SELECT 'TMT' AS type, date FROM tmt
        ORDER BY date DESC
        LIMIT 5
        `,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    res.json(stats);
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).send('Unable to fetch dashboard stats');
  }
});
module.exports = router;
