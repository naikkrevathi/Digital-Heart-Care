const express = require('express');
const db = require('../db');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'ecg/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.post('/ecg/add', upload.single('image'), async (req, res) => {
    const {
        user,
        one,
        two,
        three,
        four,
        five,
        six,
        seven,
        eight,
        type
    } = req.body;

    const image = req.file ? `ecg/${req.file.filename}` : null;

    if (!image) {
        return res.status(400).json({ success: false, message: 'Image upload failed.' });
    }

    const sqlInsert = `
        INSERT INTO ecg (patient_id, qrs, qt, pr, p, rr, qrsv, qtcbd, sokolow, type, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        await new Promise((resolve, reject) => {
            db.execute(sqlInsert, [user, one, two, three, four, five, six, seven, eight, type, image], (err, result) => {
                if (err) {
                    console.error('Error inserting ECG data:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        res.json({ success: true, message: 'ECG added successfully!' });
    } catch (err) {
        console.error('Error adding ECG:', err);
        res.status(500).json({ success: false, message: 'Unable to insert your data, kindly try again later.' });
    }
});

router.get('/ecg/view', async (req, res) => {
    const sqlQuery = `
        SELECT ecg.ecg_id, ecg.date, patient_master.full_name, patient_master.email
        FROM ecg
        JOIN patient_master ON patient_master.id = ecg.patient_id
        ORDER BY ecg.ecg_id DESC
    `;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sqlQuery, (err, rows) => {
                if (err) {
                    console.error('Error fetching ECG data:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

        res.json({ success: true, data: results });
    } catch (err) {
        console.error('Error retrieving ECG data:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch data, kindly try again later.' });
    }
});

router.get('/ecg-report/:id', async (req, res) => {
    const ecgId = req.params.id;

    const sqlQuery = `
    SELECT ecg.*, patient_master.full_name, patient_master.email, patient_master.phone, patient_master.address, patient_master.UHID
        FROM ecg
        JOIN patient_master ON patient_master.id = ecg.patient_id
        WHERE ecg.ecg_id = ?
    `;

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(sqlQuery, [ecgId], (err, rows) => {
                if (err) {
                    console.error('Error fetching ECG report:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'ECG report not found.' });
        }

        res.json({ success: true, data: result[0] });
    } catch (err) {
        console.error('Error retrieving ECG report:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch the report, kindly try again later.' });
    }
});

router.get('/ecg/user-reports', async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required.' });
    }

    const sqlQuery = `
        SELECT ecg.ecg_id, ecg.date, patient_master.full_name, patient_master.email
        FROM ecg
        JOIN patient_master ON patient_master.id = ecg.patient_id
        WHERE patient_master.username = ?
        ORDER BY ecg.ecg_id DESC
    `;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sqlQuery, [username], (err, rows) => {
                if (err) {
                    console.error('Error fetching user ECG reports:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

        res.json({ success: true, data: results });
    } catch (err) {
        console.error('Error retrieving user ECG reports:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch data, kindly try again later.' });
    }
});
module.exports = router;
