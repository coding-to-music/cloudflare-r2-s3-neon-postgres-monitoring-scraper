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

/**
 * Enable Data Zoom by default
 */
setTimeout(
  () =>
    echartsInstance.dispatchAction({
      type: "takeGlobalCursor",
      key: "dataZoomSelect",
      dataZoomSelectActive: true,
    }),
  500
);

/**
 * Update Time Range on Zoom
 */
echartsInstance.on("datazoom", function (params) {
  const startValue = params.batch[0]?.startValue;
  const endValue = params.batch[0]?.endValue;
  locationService.partial({ from: startValue, to: endValue });
});

return {
  series: [
    {
      type: "treemap",
      data: [
        {
          name: "nodeA",
          value: 10,
          children: [
            {
              name: "nodeAa",
              value: 4,
            },
            {
              name: "nodeAb",
              value: 6,
            },
          ],
        },
        {
          name: "nodeB",
          value: 20,
          children: [
            {
              name: "nodeBa",
              value: 20,
              children: [
                {
                  name: "nodeBa1",
                  value: 20,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
