// SELECT
//   date_portion::text as date_portion,
//   links_per_day,
//   departed_num
// FROM (
//   SELECT
//     DATE(first_dt) AS date_portion,
//     COUNT(*) AS links_per_day
//   FROM scraper_history
//   WHERE perm_link = false
//   GROUP BY DATE(first_dt)
// ) AS links
// JOIN (
//   SELECT
//     DATE(latest_dt) AS departed_date,
//     COUNT(*) AS departed_num
//   FROM scraper_history
//   WHERE perm_link = false AND departed = TRUE
//   GROUP BY DATE(latest_dt)
// ) AS departures ON links.date_portion = departures.departed_date
// ORDER BY links.date_portion

const lineData = data.series.map((s) => {
  const dateField = s.fields.find((f) => f.name === "date_portion");
  const linksField = s.fields.find((f) => f.name === "links_per_day");
  const departedField = s.fields.find((f) => f.name === "departed_num");

  const dates = dateField.values.toArray();
  const links = linksField.values.toArray();
  const departed = departedField.values.toArray();

  return dates.map((d, i) => {
    const date = new Date(d);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    const formattedDate = `${dayOfWeek} ${d}`;
    return [formattedDate, links[i], departed[i]];
  });
})[0];

return {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    show: false,
    top: "5%",
    left: "5%", // Position the legend on the left side
  },
  grid: {
    top: "10%", // Adjust the top margin
    left: "2%", // Adjust the left margin
    right: "2%", // Adjust the right margin
    bottom: "5%", // Adjust the bottom margin
    containLabel: true, // Make sure the labels are contained within the grid
  },
  series: [
    {
      name: "Links per Day",
      type: "line",
      smooth: true, // Enable smooth curve
      data: lineData.map((d) => [d[0], d[1]]), // Use formatted dates and links as data
    },
    {
      name: "Departed Links",
      type: "line",
      smooth: true, // Enable smooth curve
      data: lineData.map((d) => [d[0], d[2]]), // Use formatted dates and departed links as data
    },
  ],
  xAxis: {
    type: "category",
    data: lineData.map((d) => d[0]), // Use formatted dates as xAxis data
  },
  yAxis: {
    type: "value",
  },
};
