class State {
  constructor(reference_points, solution_points) {
    // Make a deep copy of the reference points
    this.reference_points = [];
    for (var i = 0; i < reference_points.length; i++) {
      this.reference_points.push(reference_points[i]);
    }
    // Make a deep copy of the solution points
    this.solution_points = [];
    for (var i = 0; i < solution_points.length; i++) {
      this.solution_points.push(solution_points[i]);
    }
  }

  toString() {
    var str = "Reference points: ";
    for (var i = 0; i < this.reference_points.length; i++) {
      str += this.reference_points[i].toString() + ", ";
    }
    str += "Solution points: ";
    for (var i = 0; i < this.solution_points.length; i++) {
      str += this.solution_points[i].toString() + ", ";
    }
    return str;
  }
}

function printStates() {
  for (var i = 0; i < global_states.length; i++) {
    console.log(global_states[i].toString());
  }
}

// Global variable
var global_states = [];
