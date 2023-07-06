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
  const seriesObj = {
    name: date,
    type: "bar",
    label: labelOption,
    emphasis: {
      focus: "series",
    },
    data: [],
  };

  // Populate series data with site names and respective num_count
  for (const site of legendData) {
    const siteData = dataForDate.find((data) => data.site_name_txt === site);
    if (siteData) {
      seriesObj.data.push(siteData.num_count);
    } else {
      seriesObj.data.push(0);
    }
  }

  return seriesObj;
});

// Generate legend data dynamically
const legendData = [...new Set(queryData.map((data) => data.site_name_txt))];

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
    data: legendData, // Use dynamically generated legend data
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
