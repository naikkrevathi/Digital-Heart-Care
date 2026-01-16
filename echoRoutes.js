const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/echo/add', async (req, res) => {
    const {
        patient_id,
        order_date,
        order_no,
        ipno,
        bed_no,
        aortic_root,
        left_atrium,
        ivsd,
        lvpwd,
        lvidd,
        lvids,
        lvef,
        impression
    } = req.body;

    const sqlInsert = `
        INSERT INTO echo (patient_id, order_date, Order_No, IPNO, Bed_No, Aortic_root, Left_atrium, IVSd, LVPWd, LVIDd, LVIDs, LVEF, Impression)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        await new Promise((resolve, reject) => {
            db.execute(sqlInsert, [
                patient_id,
                order_date,
                order_no,
                ipno,
                bed_no,
                aortic_root,
                left_atrium,
                ivsd,
                lvpwd,
                lvidd,
                lvids,
                lvef,
                impression
            ], (err, result) => {
                if (err) {
                    console.error('Error inserting ECHO data:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        res.json({ success: true, message: 'ECHO record added successfully!' });
    } catch (err) {
        console.error('Error adding ECHO record:', err);
        res.status(500).json({ success: false, message: 'Unable to insert your data, kindly try again later.' });
    }
});

router.get('/echo/view', async (req, res) => {
    const sqlQuery = `
      select echo.id, echo.date, patient_master.full_name, patient_master.email from echo join patient_master on patient_master.id = echo.patient_id order by echo.id desc
    `;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sqlQuery, (err, rows) => {
                if (err) {
                    console.error('Error fetching ECHO data:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

        res.json({ success: true, data: results });
    } catch (err) {
        console.error('Error retrieving ECHO data:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch data, kindly try again later.' });
    }
});

router.get('/echo-report/:id', async (req, res) => {
    const echoId = req.params.id;

    const sqlQuery = `
select patient_master.full_name, echo.Left_atrium, echo.Aortic_root, echo.date,echo.LVPWd, echo.IVSd, echo.LVIDs, echo.LVIDd, echo.Impression, echo.LVEF, echo.Bed_No, echo.order_date, echo.Order_No, echo.report_date, echo.IPNO, patient_master.UHID, patient_master.phone, patient_master.address, patient_master.email, patient_master.image from echo join patient_master on patient_master.id = echo.patient_id where echo.id = ?
    `;

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(sqlQuery, [echoId], (err, rows) => {
                if (err) {
                    console.error('Error fetching ECHO report:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'ECHO report not found.' });
        }

        res.json({ success: true, data: result[0] });
    } catch (err) {
        console.error('Error retrieving ECHO report:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch the report, kindly try again later.' });
    }
});

router.get('/echo/user-reports', async (req, res) => {
    const username = req.query.username;

    const sqlQuery = `
        SELECT echo.id, echo.date, patient_master.full_name, patient_master.email 
        FROM echo 
        JOIN patient_master ON patient_master.id = echo.patient_id 
        WHERE patient_master.username = ? 
        ORDER BY echo.id DESC
    `;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sqlQuery, [username], (err, rows) => {
                if (err) {
                    console.error('Error fetching user-specific ECHO reports:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

        res.json({ success: true, data: results });
    } catch (err) {
        console.error('Error retrieving user-specific ECHO reports:', err);
        res.status(500).json({ success: false, message: 'Unable to fetch data, kindly try again later.' });
    }
});

module.exports = router;
