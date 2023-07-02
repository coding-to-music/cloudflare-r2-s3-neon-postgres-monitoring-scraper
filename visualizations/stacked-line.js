const series = data.series.map((s) => {
  const sData =
    s.fields.find((f) => f.type === "number").values.buffer ||
    s.fields.find((f) => f.type === "number").values;
  const sTime =
    s.fields.find((f) => f.type === "time").values.buffer ||
    s.fields.find((f) => f.type === "time").values;

  return {
    name: s.refId,
    type: "line",
    showSymbol: false,
    areaStyle: {
      opacity: 0.1,
    },
    lineStyle: {
      width: 1,
    },
    data: sData.map((d, i) => [sTime[i], d.toFixed(2)]),
  };
});

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
  series: [
    {
      data: [120, 132, 101, 134, 90, 230, 210],
      name: "Email",
      stack: "Total",
      type: "line",
    },
    {
      data: [220, 182, 191, 234, 290, 330, 310],
      name: "Union Ads",
      stack: "Total",
      type: "line",
    },
    {
      data: [150, 232, 201, 154, 190, 330, 410],
      name: "Video Ads",
      stack: "Total",
      type: "line",
    },
    {
      data: [320, 332, 301, 334, 390, 330, 320],
      name: "Direct",
      stack: "Total",
      type: "line",
    },
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      name: "Search Engine",
      stack: "Total",
      type: "line",
    },
  ],
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
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    type: "category",
  },
  yAxis: {
    type: "value",
  },
};
