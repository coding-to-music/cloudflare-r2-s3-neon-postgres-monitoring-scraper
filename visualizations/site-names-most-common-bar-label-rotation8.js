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

const posList = [
  "left",
  "right",
  "top",
  "bottom",
  "inside",
  "insideTop",
  "insideLeft",
  "insideRight",
  "insideBottom",
  "insideTopLeft",
  "insideTopRight",
  "insideBottomLeft",
  "insideBottomRight",
];

echarts.configParameters = {
  rotate: {
    min: -90,
    max: 90,
  },
  align: {
    options: {
      left: "left",
      center: "center",
      right: "right",
    },
  },
  verticalAlign: {
    options: {
      top: "top",
      middle: "middle",
      bottom: "bottom",
    },
  },
  position: {
    options: posList.reduce(function (map, pos) {
      map[pos] = pos;
      return map;
    }, {}),
  },
  distance: {
    min: 0,
    max: 100,
  },
};

const labelOption = {
  show: true,
  position: echarts.config.position,
  distance: echarts.config.distance,
  align: echarts.config.align,
  verticalAlign: echarts.config.verticalAlign,
  rotate: echarts.config.rotate,
  formatter: "{c}  {name|{a}}",
  fontSize: 16,
  rich: {
    name: {},
  },
};

// Generate x-axis data dynamically
const xAxisData = [...new Set(queryData.map((data) => data.first_dt))];

// Generate series data dynamically
const seriesData = xAxisData.map((date) => {
  const dataForDate = queryData.filter((data) => data.first_dt === date);
  return {
    name: date,
    type: "bar",
    label: labelOption,
    emphasis: {
      focus: "series",
    },
    data: dataForDate.map((data) => data.num_count),
  };
});

// Assign series data to the chart
return {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    show: true, // Add show: true to display the legend
    data: xAxisData, // Use dynamically generated x-axis data
  },
  toolbox: {
    show: true,
    orient: "vertical",
    left: "right",
    top: "center",
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar", "stack"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  xAxis: [
    {
      type: "category",
      axisTick: { show: false },
      data: xAxisData, // Use dynamically generated x-axis data
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: seriesData, // Assign dynamically generated series data
  grid: {
    bottom: "3%",
    containLabel: true,
    left: "3%",
  },
};
