import { useState, useEffect } from "react";
import AdminHeader from "../../Component/AdminHeader";
import AdminFooter from "../../Component/AdminFooter";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper
} from "@mui/material";
import {
  People as PeopleIcon,
  MedicalServices as MedicalServicesIcon,
  Favorite as FavoriteIcon,
  MonitorHeart as MonitorHeartIcon,
  DirectionsRun as DirectionsRunIcon,
  AccessTime as AccessTimeIcon
} from "@mui/icons-material";

function AdminHome() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalECG: 0,
    totalECHO: 0,
    totalTMT: 0,
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  const statCards = [
    { title: "Total Patients", value: stats.totalPatients, icon: <PeopleIcon fontSize="large" /> },
    { title: "Total Doctors", value: stats.totalDoctors, icon: <MedicalServicesIcon fontSize="large" /> },
    { title: "ECG Records", value: stats.totalECG, icon: <FavoriteIcon fontSize="large" /> },
    { title: "ECHO Records", value: stats.totalECHO, icon: <MonitorHeartIcon fontSize="large" /> },
    { title: "TMT Records", value: stats.totalTMT, icon: <DirectionsRunIcon fontSize="large" /> }
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AdminHeader />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size={60} />
        </Box>
        <AdminFooter />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AdminHeader />
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            Error: {error}
          </Alert>
        </Box>
        <AdminFooter />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader />
      <Box component="main" sx={{ flex: 1, p: 3,mt: 10 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Admin Dashboard
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activities */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ mr: 1 }} /> Recent Activities
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {stats.recentActivities.length > 0 ? (
            <List>
              {stats.recentActivities.map((activity, index) => (
                <Box key={index}>
                  <ListItem>
                    <ListItemText
                      primary={activity.type}
                      secondary={activity.date}
                    />
                  </ListItem>
                  {index < stats.recentActivities.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No recent activities
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default AdminHome;