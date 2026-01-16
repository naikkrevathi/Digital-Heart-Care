import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';

const ViewECHO = () => {
    const [echoReports, setEchoReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEchoReports = async () => {
            try {
                const username = localStorage.getItem('username');
                if (!username) {
                    setError('Username is required.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/echo/user-reports', {
                    params: { username },
                });

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
                    setEchoReports(formattedReports);
                } else {
                    setError(response.data.message || 'Failed to fetch ECHO reports.');
                }
            } catch (err) {
                setError('Unable to fetch data, kindly try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEchoReports();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <>
           <Header/>
<section className="breadcrumb_part breadcrumb_bg">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breadcrumb_iner">
          <div className="breadcrumb_iner_item">
            <h2>View Echo</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        <div className="view-echo">
           
            <div className="card card_border p-lg-5 p-3 mb-4">
                <div className="card-body py-3 p-0">
                    <div className="row">
                        <table
                            className="table table-bordered table-striped display table-hover"
                            width="100%"
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {echoReports.map((report, index) => (
                                    <tr key={report.id}>
                                        <td>{index + 1}</td>
                                        <td>{report.full_name}</td>
                                        <td>{report.email}</td>
                                        <td>{report.date}</td>
                                        <td className="text-center">
                                            <a href={`/admin/echo-report-details/${report.id}`}>Report</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default ViewECHO;