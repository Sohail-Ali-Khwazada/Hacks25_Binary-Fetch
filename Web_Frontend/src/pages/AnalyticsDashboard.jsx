import React from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { useAgentContext } from "../context/AgentContext";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = [
  { date: "Oct 4", followers: 175 },
  { date: "Oct 5", followers: 174 },
  { date: "Oct 6", followers: 175 },
  { date: "Oct 7", followers: 175 },
  { date: "Oct 8", followers: 173 },
  { date: "Oct 9", followers: 174 },
];

// Card component for displaying metrics
const MetricCard = ({ title, value }) => (
  <Card sx={{ p: 2, textAlign: "center", boxShadow: 3, flex: "1 1 18%" }}>
    <CardHeader title={<Typography variant="subtitle1">{title}</Typography>} />
    <CardContent>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

// Connected accounts component
const ConnectedAccount = ({ platform,login_flag, to}) => (
  <Link to={to}>
  <Card sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 2 }}>
    <Avatar sx={{ mr: 2 }} src={`https://api.dicebear.com/7.x/initials/svg?seed=${platform}`} />
    <div>
      <Typography variant="subtitle1">{platform}</Typography>
      <Typography variant="body2" color="textSecondary">
        {login_flag ? "Connected" : "Not connected"}
      </Typography>
    </div>
  </Card>
  </Link>
);

export  function AnalyticsDashboard() {
  const {authUser} = useAuthContext();
  const {isLoggedin_BlueSky} = useAgentContext();
  const login_flag_BS = isLoggedin_BlueSky();


  const firstRowMetrics = [
    { title: "Likes", value: "0" },
    { title: "Comments", value: "0" },
    { title: "Impressions", value: "89" },
    { title: "Engagement", value: "0" },
    { title: "Engagement Rate", value: "0.00%" },
  ];

  const secondRowMetrics = [
    { title: "Email contacts", value: "0" },
    { title: "Follower count", value: "3" },
    { title: "Directions clicks", value: "0" },
    { title: "Phone call clicks", value: "0" },
    { title: "Profile views", value: "11" },
  ];

  const thirdRowMetrics = [
    { title: "Reach", value: "11" },
    { title: "Text message clicks", value: "0" },
    { title: "Website clicks", value: "0" },
  ];

  // Chart.js Data
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Followers",
        data: data.map((item) => item.followers),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      {/* Connected Accounts */}
      <Card sx={{ mb: 4, p: 2, boxShadow: 3 }}>
        <CardHeader title="Connected Accounts" />
        <CardContent sx={{ display: "flex", gap: 2 }}>
          <ConnectedAccount platform="tumblr" login_flag={login_flag_BS} to={login_flag_BS ? "https://www.tumblr.com" : "/connect-account"}/>
          <ConnectedAccount platform="Blue Sky" login_flag={login_flag_BS} to={login_flag_BS ? "https://bsky.app" : "/connect-account"}/>
          <ConnectedAccount platform="X" login_flag={login_flag_BS} to={login_flag_BS ? "https://x.com" : "/connect-account"}/>
        </CardContent>
      </Card>

      {/* Metrics Sections */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {firstRowMetrics.map((metric) => (
          <MetricCard {...metric} key={metric.title} />
        ))}
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={2}>
        {secondRowMetrics.map((metric) => (
          <MetricCard {...metric} key={metric.title} />
        ))}
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={2}>
        {thirdRowMetrics.map((metric) => (
          <MetricCard {...metric} key={metric.title} />
        ))}
      </Box>

      {/* Audience Chart */}
      {/* <Card sx={{ mt: 4, p: 2, boxShadow: 3 }}>
        <CardHeader title="Audience" subheader="The number of followers per day during the selected period" />
        <CardContent>
          <div style={{ height: "300px" }}>
            <Line data={chartData} />
          </div>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            You can drag the chart to zoom.
          </Typography>
        </CardContent>
      </Card> */}
    </div>
  );
}
