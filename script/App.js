function updateReferencePoints() {
  var box = document.getElementById("ref_points");
  // Remove all children
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
  // Add new children
  for (var i = 0; i < global_reference_points.length; i++) {
    var newValue = document.createElement("p");
    newValue.innerHTML = global_reference_points[i].toString();
    box.appendChild(newValue);
  }
}

function updateSolutionPoints() {
  var box = document.getElementById("sol_points");
  // Remove all children
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
  // Add new children
  for (var i = 0; i < global_solution_points.length; i++) {
    var newValue = document.createElement("p");
    newValue.innerHTML = global_solution_points[i].toString();
    box.appendChild(newValue);
  }
}

function addSolution() {
  var x = parseInt(document.getElementById("size_x").value);
  var y = parseInt(document.getElementById("size_y").value);
  var z = parseInt(document.getElementById("size_z").value);
  var solution = new Point(x, y, z);
  // Get the reference points that are dominated by the solution
  var ref_points_dominated = getDominatedReferencePoints(global_reference_points, solution);
  // If the solution does not dominate any reference point, then we do not add it
  if (ref_points_dominated.length == 0) {
    console.log("Solution: " + solution.coordinates + " does not dominate any reference point");
    return;
  }
  // Otherwise, we add the solution and update the reference points
  // - Save the state of the plot
  global_states.push(new State(global_reference_points, global_solution_points));
  // - Update the reference points and solution points
  global_reference_points = updateBounds(global_reference_points, solution);
  global_solution_points.push(solution);
  updateReferencePoints();
  updateSolutionPoints();
  // Update the plot: for each reference point dominated by the solution, we add a box
  for (var i = 0; i < ref_points_dominated.length; i++) {
    var ref_point_dominated = ref_points_dominated[i];
    updatePlot(ref_point_dominated.coordinates[0], ref_point_dominated.coordinates[1], ref_point_dominated.coordinates[2],
               solution.coordinates[0], solution.coordinates[1], solution.coordinates[2]); 
  }
}

function removeSolution() {
  // The first trace is the scatter3d trace and the second is the mesh3d trace
  if (data.length > 2) {
    // Restore the previous state
    if (global_states.length == 0) {
      console.log("No more states to restore");
      global_reference_points = [new Point(0, 0, 0)];
      global_solution_points = [];
      // Remove the last trace
      Plotly.deleteTraces("plotly_3d_cube", data.length - 1);
    } else {
      console.log("Restoring the previous state");
      var state = global_states[global_states.length - 1];
      global_reference_points = state.reference_points;
      global_solution_points = state.solution_points;
      global_states.pop();
      // Remove the last traces that belong to the solution that was removed
      var diff = data.length - state.solution_points.length - 2;
      for (var i = 0; i < diff; i++) {
        Plotly.deleteTraces("plotly_3d_cube", data.length - 1);
      }
    }
    updateReferencePoints();
    updateSolutionPoints();
  }  
}

document.getElementById("update_button").onclick = function() {
  console.log("The update button was clicked");
  addSolution();
};

document.getElementById("remove_button").onclick = function() {
  console.log("The remove button was clicked");
  removeSolution();
};
