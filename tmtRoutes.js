const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/tmt/add', async (req, res) => {
    const {
        patient_id,
        stage,
        stage_time,
        speed_grade,
        hr,
        bp,
        rpp,
        comments,
        st,
        total_exercise_time,
        max_workload,
        max_hr,
        distance_covered,
        max_bp,
        test_date
    } = req.body;

    const sqlInsert = `
        INSERT INTO tmt (patient_id, stage, stage_time, speed_grade, hr, bp, rpp, comments, st, total_exercise_time, max_workload, max_hr, distance_covered, max_bp, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        await new Promise((resolve, reject) => {
            db.execute(sqlInsert, [
                patient_id,
                stage,
                stage_time,
                speed_grade,
                hr,
                bp,
                rpp,
                comments,
                st,
                total_exercise_time,
                max_workload,
                max_hr,
                distance_covered,
                max_bp,
                test_date
            ], (err, result) => {
                if (err) {
                    console.error('Error inserting TMT data:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        res.json({ success: true, message: 'TMT record added successfully!' });
    } catch (err) {
        console.error('Error adding TMT record:', err);
        res.status(500).json({ success: false, message: 'Unable to insert your data, kindly try again later.' });
    }
});

router.get('/tmt/view', async (req, res) => {
    const sqlQuery = `
      SELECT tmt.id, tmt.date, patient_master.full_name, patient_master.email FROM tmt JOIN patient_master ON patient_master.id = tmt.patient_id ORDER BY tmt.id DESC
    `;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sqlQuery, (err, rows) => {
                if (err) {
                    console.error('Error fetching TMT data:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

        res.json({ success: true, data: results });
    } catch (err) {
        console.error('Error retrieving TMT data:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch data, kindly try again later.' });
    }
});

router.get('/tmt-report/:id', async (req, res) => {
    const tmtId = req.params.id;

    const sqlQuery = `
    SELECT patient_master.UHID, patient_master.phone, patient_master.address, patient_master.email, patient_master.image, tmt.id as tmt_id, 
        tmt.date, patient_master.full_name, tmt.stage, tmt.stage_time, tmt.speed_grade, tmt.hr, tmt.bp, tmt.rpp, tmt.ments, tmt.st, tmt.total_exercise_time, tmt.max_workload, 
        tmt.max_hr, tmt.distance_covered, tmt.max_bp, tmt.comments, tmt.patient_id, tmt.date FROM tmt JOIN patient_master ON patient_master.id = tmt.patient_id WHERE tmt.id =  ?
    `;

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(sqlQuery, [tmtId], (err, rows) => {
                if (err) {
                    console.error('Error fetching TMT report:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'TMT report not found.' });
        }

        res.json({ success: true, data: result[0] });
    } catch (err) {
        console.error('Error retrieving TMT report:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch the report, kindly try again later.' });
    }
});

router.get('/tmt/user-reports', async (req, res) => {
    const username = req.query.username;

    const sqlQuery = `
        SELECT 
            tmt.id,
            tmt.date,
            tmt.stage,
            tmt.max_hr,
            tmt.max_bp,
            patient_master.full_name,
            patient_master.email 
        FROM tmt 
        JOIN patient_master ON patient_master.id = tmt.patient_id 
        WHERE patient_master.username = ? 
        ORDER BY tmt.id DESC
    `;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sqlQuery, [username], (err, rows) => {
                if (err) {
                    console.error('Error fetching user TMT reports:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

        res.json({ success: true, data: results });
    } catch (err) {
        console.error('Error retrieving user TMT reports:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch data, kindly try again later.' });
    }
});
module.exports = router;
