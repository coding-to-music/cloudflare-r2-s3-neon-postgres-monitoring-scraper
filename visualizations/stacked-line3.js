const lineData = data.series.map((s) => {
  const dateField = s.fields.find((f) => f.name === "departed_date");
  const numField = s.fields.find((f) => f.name === "departed_num");

  const dates = dateField.values.toArray();
  const nums = numField.values.toArray();

  return dates.map((d, i) => [d, nums[i]]);
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
      name: "Departed Links",
      type: "line",
      smooth: true, // Enable smooth curve
      data: lineData,
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
