//select DATE(latest_dt)::text AS departed_date, count(*) as departed_num
//from  scraper_history
//where perm_link = false and departed = TRUE
//group by DATE(latest_dt)
//order by DATE(latest_dt)
//desc limit 8;

const pieData = data.series.map((s) => {
  const modelsField = s.fields.find((f) => f.name === "departed_date");
  const valuesField = s.fields.find((f) => f.name === "departed_num");

  const models = modelsField.values.toArray();
  const values = valuesField.values.toArray();

  return values.map((d, i) => {
    return { name: models[i].toString(), value: d };
  });
})[0];

return {
  tooltip: {
    trigger: "item",
  },
  legend: {
    show: false,
    top: "5%",
    left: "5%", // Position the legend on the left side
  },
  series: [
    {
      name: "Pie Chart",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: true, // Show the labels
        position: "outside", // Position the labels outside the slices
        formatter: "{b}: {c}", // Customize the label format as needed
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: pieData,
    },
  ],
};
