// Initialize plot
var data = [{
  type: 'scatter3d'
}];

var axis_maxima = [5, 5, 5];

var layout = {
  scene: {
    xaxis_title: "X",
    yaxis_title: "Y",
    zaxis_title: "Z",
    camera: {
      eye: {
        x: 1.25,
        y: 1.25,
        z: 1.25
      }
    }
  },
  margin: { l: 0, r: 0, b: 0, t: 0 }
};

// Colors for the boxes (twenty colors)
var colors = [
  'rgb(31, 119, 180)',
  'rgb(255, 127, 14)',
  'rgb(44, 160, 44)',
  'rgb(214, 39, 40)',
  'rgb(148, 103, 189)',
  'rgb(140, 86, 75)',
  'rgb(227, 119, 194)',
  'rgb(127, 127, 127)',
  'rgb(188, 189, 34)',
  'rgb(23, 190, 207)',
  'rgb(174, 199, 232)',
  'rgb(255, 187, 120)',
  'rgb(152, 223, 138)',
  'rgb(255, 152, 150)',
  'rgb(197, 176, 213)',
  'rgb(196, 156, 148)',
  'rgb(247, 182, 210)',
  'rgb(199, 199, 199)',
  'rgb(219, 219, 141)',
  'rgb(158, 218, 229)'
];

Plotly.newPlot('plotly_3d_cube', data, layout);

// First plot with default values
updatePlot(0, 0, 0, 0, 0, 0);
// Add origin point to the reference points
global_reference_points.push(new Point(0, 0, 0));
// Update the reference points
updateReferencePoints();

// Function to update the plot
function updatePlot(x, y, z, dx, dy, dz) {

  // Calculate the size of the box
  var size_x = diff(dx, x);
  var size_y = diff(dy, y);
  var size_z = diff(dz, z);

  var x1 = x;
  var x2 = sum(size_x, x);
  var y1 = y;
  var y2 = sum(size_y, y);
  var z1 = z;
  var z2 = sum(size_z, z);

  // Update the axis ranges
  axis_maxima[0] = Math.max(axis_maxima[0], sum(x2, 1));
  axis_maxima[1] = Math.max(axis_maxima[1], sum(y2, 1));
  axis_maxima[2] = Math.max(axis_maxima[2], sum(z2, 1));

  // Create the box
  var box = {
    type: 'mesh3d',
    mode: 'markers',
    x: [x1, x2, x2, x1, x1, x2, x2, x1],
    y: [y1, y1, y2, y2, y1, y1, y2, y2],
    z: [z1, z1, z1, z1, z2, z2, z2, z2],
    i : [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
    j : [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
    k : [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
    opacity: 0.5,
    flatshading: true,
    showscale: false,
    color: colors[global_solution_points.length - 1]
  };

  // Update the layout to fit the new box
  layout.scene.xaxis = {range: [0, axis_maxima[0]]};
  layout.scene.yaxis = {range: [0, axis_maxima[1]]};
  layout.scene.zaxis = {range: [0, axis_maxima[2]]};

  Plotly.addTraces('plotly_3d_cube', box);
}
