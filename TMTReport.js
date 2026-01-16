import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../Component/AdminNavbar';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Alert } from '@mui/material';
import AdminHeader from '../../Component/AdminHeader';
import AdminFooter from '../../Component/AdminFooter';

const TMTReport = () => {
    const [tmtReports, setTmtReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTmtReports();
    }, []);

    const fetchTmtReports = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tmt/view');
            if (response.data.success) {
                // Format dates after receiving the data
                const formattedReports = response.data.data.map(report => ({
                    ...report,
                    date: new Date(report.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    })
                }));
                setTmtReports(formattedReports);
            } else {
                setError('Failed to fetch TMT reports.');
            }
        } catch (err) {
            setError('An error occurred while fetching TMT reports.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Alert severity="error">{error}</Alert>
            </div>
        );
    }

    return (
        <div >
            <AdminHeader />
<section className="breadcrumb_part breadcrumb_bg">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breadcrumb_iner">
          <div className="breadcrumb_iner_item">
            <h2>TMT Report</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
            <div >
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tmtReports.map((report, index) => (
                                    <TableRow key={report.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{report.full_name}</TableCell>
                                        <TableCell>{report.email}</TableCell>
                                        <TableCell>{report.date}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                href={`/admin/tmt-report-details/${report.id}`}
                                            >
                                                View Report
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
            <AdminFooter />
        </div>
    );
};

export default TMTReport;