// Import the required PostgreSQL library
const { Client } = require("pg");

// Create a new PostgreSQL client
const client = new Client({
  user: "your_username",
  password: "your_password",
  host: "your_host",
  port: "your_port",
  database: "your_database",
});

// Connect to the PostgreSQL database
await client.connect();

// Execute the query to retrieve the data for the chart
const query =
  "SELECT time_column, email_data, union_ads_data, video_ads_data, direct_data, search_engine_data FROM your_table";
const result = await client.query(query);

// Retrieve the data from the query result
const chartData = result.rows.map((row) => ({
  time: row.time_column,
  email: parseFloat(row.email_data),
  unionAds: parseFloat(row.union_ads_data),
  videoAds: parseFloat(row.video_ads_data),
  direct: parseFloat(row.direct_data),
  searchEngine: parseFloat(row.search_engine_data),
}));

// Close the PostgreSQL connection
await client.end();

// Create the series data for the chart
const series = [
  {
    name: "Email",
    stack: "Total",
    type: "line",
    data: chartData.map((data) => [data.time, data.email.toFixed(2)]),
  },
  {
    name: "Union Ads",
    stack: "Total",
    type: "line",
    data: chartData.map((data) => [data.time, data.unionAds.toFixed(2)]),
  },
  {
    name: "Video Ads",
    stack: "Total",
    type: "line",
    data: chartData.map((data) => [data.time, data.videoAds.toFixed(2)]),
  },
  {
    name: "Direct",
    stack: "Total",
    type: "line",
    data: chartData.map((data) => [data.time, data.direct.toFixed(2)]),
  },
  {
    name: "Search Engine",
    stack: "Total",
    type: "line",
    data: chartData.map((data) => [data.time, data.searchEngine.toFixed(2)]),
  },
];

// Return the modified chart configuration
return {
  grid: {
    bottom: "3%",
    containLabel: true,
    left: "3%",
    right: "4%",
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  series,
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    boundaryGap: false,
    data: chartData.map((data) => data.time),
    type: "category",
  },
  yAxis: {
    type: "value",
  },
};
