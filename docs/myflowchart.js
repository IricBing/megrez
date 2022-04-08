var flownow = 0;
var canvasnow = 0;
window.onload = function () {
  for (var i = 0; i < flownow; i++) {
    var cd = document.getElementById('gengzi_code_' + i),
      chart;
    var code = cd.value;
    chart = flowchart.parse(code);
    chart.drawSVG('canvas' + i, {
      // 'x': 30,
      // 'y': 50,
      'line-width': 3,
      'line-length': 50,
      'text-margin': 10,
      'font-size': 14,
      'font-color': 'black',
      'line-color': 'black',
      'element-color': 'black',
      fill: 'white',
      'yes-text': 'yes',
      'no-text': 'no',
      'arrow-end': 'block',
      scale: 1,
      // style symbol types
      symbols: {
        start: {
          'font-color': 'red',
          'element-color': 'green',
          fill: 'yellow'
        },
        end: {
          class: 'end-element'
        }
      },
      // even flowstate support ;-)
      flowstate: {
        past: { fill: '#CCCCCC', 'font-size': 12 },
        current: { fill: 'yellow', 'font-color': 'red', 'font-weight': 'bold' },
        future: { fill: '#FFFF99' },
        request: { fill: 'blue' },
        invalid: { fill: '#444444' },
        approved: { fill: '#58C4A3', 'font-size': 12, 'yes-text': 'APPROVED', 'no-text': 'n/a' },
        rejected: { fill: '#C45879', 'font-size': 12, 'yes-text': 'n/a', 'no-text': 'REJECTED' }
      }
    });
  }
};
