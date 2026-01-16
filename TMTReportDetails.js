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

const TMTReportDetails = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tmt-report/${id}`);
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
                    setError('Failed to fetch TMT report details.');
                }
            } catch (err) {
                setError('An error occurred while fetching the TMT report details.');
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
                TMT Report Details
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
                                    <TableCell>Measurement</TableCell>
                                    <TableCell align="center">Values</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Stage</TableCell>
                                    <TableCell align="center">{report.stage}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Stage Time</TableCell>
                                    <TableCell align="center">{report.stage_time}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Speed Grade</TableCell>
                                    <TableCell align="center">{report.speed_grade}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Heart Rate (HR)</TableCell>
                                    <TableCell align="center">{report.hr}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Blood Pressure (BP)</TableCell>
                                    <TableCell align="center">{report.bp}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Rate Pressure Product (RPP)</TableCell>
                                    <TableCell align="center">{report.rpp}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>METS</TableCell>
                                    <TableCell align="center">{report.ments}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>ST</TableCell>
                                    <TableCell align="center">{report.st}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total Exercise Time</TableCell>
                                    <TableCell align="center">{report.total_exercise_time}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Max Workload</TableCell>
                                    <TableCell align="center">{report.max_workload}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Max Heart Rate</TableCell>
                                    <TableCell align="center">{report.max_hr}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Distance Covered</TableCell>
                                    <TableCell align="center">{report.distance_covered}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Max Blood Pressure</TableCell>
                                    <TableCell align="center">{report.max_bp}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Comments</TableCell>
                                    <TableCell align="center">{report.comments}</TableCell>
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

export default TMTReportDetails;