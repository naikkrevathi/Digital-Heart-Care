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

const ECHOReportDetails = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/echo-report/${id}`);
                if (response.data.success) {
                    // Format dates before setting the report
                    const formattedReport = {
                        ...response.data.data,
                        order_date: new Date(response.data.data.order_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }),
                        report_date: new Date(response.data.data.report_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })
                    };
                    setReport(formattedReport);
                } else {
                    setError('Failed to fetch ECHO report details.');
                }
            } catch (err) {
                setError('An error occurred while fetching the ECHO report details.');
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
                ECHO Report Details
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
                                <strong>UHID:</strong> #{report.UHID}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Order Date:</strong> {report.order_date}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Report Date:</strong> {report.report_date}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Bed No:</strong> {report.Bed_No}
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
                                    <TableCell>Left Atrium</TableCell>
                                    <TableCell align="center">{report.Left_atrium}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Aortic Root</TableCell>
                                    <TableCell align="center">{report.Aortic_root}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>LVPWd</TableCell>
                                    <TableCell align="center">{report.LVPWd}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>IVSd</TableCell>
                                    <TableCell align="center">{report.IVSd}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>LVIDs</TableCell>
                                    <TableCell align="center">{report.LVIDs}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>LVIDd</TableCell>
                                    <TableCell align="center">{report.LVIDd}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>LVEF</TableCell>
                                    <TableCell align="center">{report.LVEF}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Impression</TableCell>
                                    <TableCell align="center">{report.Impression}</TableCell>
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

export default ECHOReportDetails;