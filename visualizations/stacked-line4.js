const lineData = data.series.map((s) => {
  const dateField = s.fields.find((f) => f.name === "date_portion");
  const linksField = s.fields.find((f) => f.name === "links_per_day");
  const departedField = s.fields.find((f) => f.name === "departed_num");

  const dates = dateField.values.toArray();
  const links = linksField.values.toArray();
  const departed = departedField.values.toArray();

  return dates.map((d, i) => [d, links[i], departed[i]]);
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
  series: [
    {
      name: "Links per Day",
      type: "line",
      smooth: true, // Enable smooth curve
      data: lineData.map((d) => [d[0], d[1]]), // Use dates and links as data
    },
    {
      name: "Departed Links",
      type: "line",
      smooth: true, // Enable smooth curve
      data: lineData.map((d) => [d[0], d[2]]), // Use dates and departed links as data
    },
  ],
  xAxis: {
    type: "category",
    data: lineData.map((d) => d[0]), // Use dates as xAxis data
  },
  yAxis: {
    type: "value",
  },
};
