const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/patient-symptoms/add', async (req, res) => {
    const { symptom, user } = req.body;

    const sqlInsert = `INSERT INTO patient_symptoms (symptoms_id, UHID, status) VALUES (?, ?, ?)`;

    try {
        await new Promise((resolve, reject) => {
            db.execute(sqlInsert, [symptom, user, true], (err, result) => {
                if (err) {
                    console.error('Error inserting patient symptom:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        res.json({ success: true, message: 'Symptom added successfully!' });
    } catch (err) {
        console.error('Error adding symptom:', err);
        res.status(500).json({ success: false, message: 'Unable to insert your data, kindly try again later.' });
    }
});

router.get('/symptoms', (req, res) => {
    db.query('SELECT * FROM symptoms', (err, rows) => {
        if (err) {
            console.error('Error fetching symptoms:', err);
            return res.status(500).send('Unable to fetch symptoms.');
        }
        res.json(rows);
    });
});


router.delete('/patient-symptoms/:id', async (req, res) => {
    const { id } = req.params;

    const sqlDelete = `DELETE FROM patient_symptoms WHERE id = ?`;

    try {
        await new Promise((resolve, reject) => {
            db.execute(sqlDelete, [id], (err, result) => {
                if (err) {
                    console.error('Error deleting patient symptom:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        res.json({ success: true, message: 'Symptom deleted successfully!' });
    } catch (err) {
        console.error('Error deleting symptom:', err);
        res.status(500).json({ success: false, message: 'Unable to delete the symptom, kindly try again later.' });
    }
});

router.post('/patient-symptoms/view', async (req, res) => {
    const { user } = req.body;

    const sqlSelect = `
        SELECT patient_symptoms.id, symptoms.symptoms 
        FROM patient_symptoms 
        JOIN symptoms ON symptoms.id = patient_symptoms.symptoms_id 
        WHERE patient_symptoms.UHID = ? 
        ORDER BY patient_symptoms.id DESC
    `;

    try {
        const rows = await new Promise((resolve, reject) => {
            db.query(sqlSelect, [user], (err, results) => {
                if (err) {
                    console.error('Error fetching patient symptoms:', err);
                    return reject(err);
                }
                resolve(results);
            });
        });

        res.json(rows);
    } catch (err) {
        console.error('Error fetching symptoms:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch symptoms, kindly try again later.' });
    }
});
module.exports = router;
