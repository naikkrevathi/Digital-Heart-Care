import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';

const ECGReportDetails = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/ecg-report/${id}`);
                if (response.data.success) {
                    // Format the date before setting the report
                    const formattedReport = {
                        ...response.data.data,
                        date: new Date(response.data.data.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })
                    };
                    setReport(formattedReport);
                } else {
                    setError('Failed to fetch ECG report details.');
                }
            } catch (err) {
                setError('An error occurred while fetching the ECG report details.');
            } finally {
                setLoading(false);
            }
        };

        fetchReportDetails();
    }, [id]);

    const printDiv = (divId) => {
        const printContents = document.getElementById(divId).innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container id="printableArea" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                ECG Report Details
            </Typography>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">{report.full_name}</Typography>
                            <Typography variant="body1">{report.email}</Typography>
                            <Typography variant="body1">{report.phone}</Typography>
                            <Typography variant="body1">{report.address}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                                <strong>Invoice:</strong> #{report.UHID}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Date:</strong> {report.date}
                            </Typography>
                        </Grid>
                    </Grid>
                    <TableContainer sx={{ mt: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Measurement Result</TableCell>
                                    <TableCell align="center">Values</TableCell>
                                    <TableCell align="center">Normal Values</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>QRS</TableCell>
                                    <TableCell align="center">{report.qrs}</TableCell>
                                    <TableCell align="center">&lt; 90 MS</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>QT/QTcB</TableCell>
                                    <TableCell align="center">{report.qt}</TableCell>
                                    <TableCell align="center">&lt; 400 MS</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>PR</TableCell>
                                    <TableCell align="center">{report.pr}</TableCell>
                                    <TableCell align="center">138 MS</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>P</TableCell>
                                    <TableCell align="center">{report.p}</TableCell>
                                    <TableCell align="center">&lt; 100 MS</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>RR</TableCell>
                                    <TableCell align="center">{report.rr}</TableCell>
                                    <TableCell align="center">&lt; 705 MS</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>P/QRS/T</TableCell>
                                    <TableCell align="center">{report.qrsv}</TableCell>
                                    <TableCell align="center">&lt; 100 Degree</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>QTD/QTcBD</TableCell>
                                    <TableCell align="center">{report.qtcbd}</TableCell>
                                    <TableCell align="center">&lt; 80 MS</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Sokolow</TableCell>
                                    <TableCell align="center">{report.sokolow}</TableCell>
                                    <TableCell align="center">1.3 - 3.5 mV</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell align="center">{report.type}</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => printDiv('printableArea')}
                        >
                            Print
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ECGReportDetails;