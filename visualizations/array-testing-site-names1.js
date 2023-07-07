// var echarts = require("echarts");

const queryData = [
  { first_dt: "2023-07-01", site_name_txt: "dailymail.co.uk", num_count: 2 },
  { first_dt: "2023-07-01", site_name_txt: "msn.com", num_count: 16 },
  { first_dt: "2023-07-01", site_name_txt: "news.yahoo.com", num_count: 6 },
  { first_dt: "2023-07-01", site_name_txt: "wsj.com", num_count: 6 },
  { first_dt: "2023-07-02", site_name_txt: "dailymail.co.uk", num_count: 1 },
  { first_dt: "2023-07-02", site_name_txt: "msn.com", num_count: 3 },
  { first_dt: "2023-07-02", site_name_txt: "news.yahoo.com", num_count: 2 },
  { first_dt: "2023-07-02", site_name_txt: "wsj.com", num_count: 4 },
  { first_dt: "2023-07-03", site_name_txt: "dailymail.co.uk", num_count: 5 },
  { first_dt: "2023-07-03", site_name_txt: "msn.com", num_count: 9 },
  { first_dt: "2023-07-03", site_name_txt: "news.yahoo.com", num_count: 2 },
  { first_dt: "2023-07-03", site_name_txt: "wsj.com", num_count: 9 },
  { first_dt: "2023-07-04", site_name_txt: "dailymail.co.uk", num_count: 8 },
  { first_dt: "2023-07-04", site_name_txt: "msn.com", num_count: 6 },
  { first_dt: "2023-07-04", site_name_txt: "news.yahoo.com", num_count: 2 },
  { first_dt: "2023-07-04", site_name_txt: "wsj.com", num_count: 7 },
  { first_dt: "2023-07-05", site_name_txt: "dailymail.co.uk", num_count: 7 },
  { first_dt: "2023-07-05", site_name_txt: "msn.com", num_count: 17 },
  { first_dt: "2023-07-05", site_name_txt: "news.yahoo.com", num_count: 7 },
  { first_dt: "2023-07-05", site_name_txt: "wsj.com", num_count: 9 },
];

// console.log("Hello, world!");

// Generate x-axis data dynamically
const xAxisData = [...new Set(queryData.map((data) => data.first_dt))];
console.log("xAxisData:", xAxisData);

// Generate legend data dynamically
const legendData = [...new Set(queryData.map((data) => data.site_name_txt))]; // get no legend
console.log("legendData:", legendData);

// const site_name = [...new Set(queryData.map((data) => data.site_name_txt))]; // get no legend
// console.log("site_name:", site_name);

// const first_date = [...new Set(queryData.map((data) => data.first_dt))];
// console.log("first_date:", first_date);

// const valuesData = [...new Set(queryData.map((data) => data.num_count))];
// console.log("valuesData:", valuesData);

// const dataForDate = queryData.filter((data) => data.first_dt === date);
// const seriesData = xAxisData.map((site) => {
// const seriesData = xAxisData.map((date) => {

//   //   const dataForDate = queryData.filter((data) => data.first_dt === date);
//   const dataForSite = queryData.filter((data) => data.site_name_txt === site);
// const seriesData = xAxisData.map((date) => {
const seriesData = xAxisData.map((site) => {
  const dataForSite = queryData.filter((data) => data.site_name_txt === site);
  return {
    name: site,
    type: "bar",
    //   label: labelOption,
    emphasis: {
      focus: "series",
    },
    data: dataForSite.map((data) => data.num_count),
  };
});

console.log("seriesData:", seriesData);
