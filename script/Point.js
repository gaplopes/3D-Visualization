class Point {
  constructor(x, y, z) {
    this.dimensions = 3;
    this.coordinates = [x, y, z];
  }

  // Returns true if this point strongly dominates the other point
  stronglyDominates(other) {
    for (var i = 0; i < this.dimensions; i++) {
      if (this.coordinates[i] <= other.coordinates[i]) {
        return false;
      }
    }
    return true;
  }

  // Returns true if this point weakly dominates the other point
  weaklyDominates(other) {
    for (var i = 0; i < this.dimensions; i++) {
      if (this.coordinates[i] < other.coordinates[i]) {
        return false;
      }
    }
    return true;
  }

  // Returns an array of new reference points generated by a solution
  generateReferencePoints(solution) {
    var new_ref_points = [];
    if (!solution.stronglyDominates(this)) {
      return new_ref_points;
    }
    for (let j = 0; j < this.dimensions; j++) {
      // Create a new reference point
      var new_ref_point = new Point(0, 0, 0);
      for (let k = 0; k < this.dimensions; k++) {
        if (k == j) {
          new_ref_point.coordinates[k] = solution.coordinates[k];
        } else {
          new_ref_point.coordinates[k] = this.coordinates[k];
        }
      }
      new_ref_points.push(new_ref_point);
    }
    return new_ref_points;
  }

  // Point to string
  toString() {
    return "(" + this.coordinates[0] + ", " + this.coordinates[1] + ", " + this.coordinates[2] + ")";
  }
}

// Points to string
function pointsToString(points) {
  var str = "";
  for (var i = 0; i < points.length; i++) {
    str += points[i].toString();
    if (i != points.length - 1) {
      str += ", ";
    }
  }
  return str;
}

function updateBounds(bounds, solution) {
  // Steps:
  // 1. Get the reference points that are dominated by the solution
  // 2. Generate new reference points for each dominated reference point
  // 3. Remove dominated reference points from bounds
  // 4. Remove redundant reference points
  // 5. Add new reference points
  // 6. Remove redundant reference points from bounds
  // 7. Return the new bounds

  // 1. Get the reference points that are dominated by the solution
  var dominated_ref_points = [];
  for (var i = 0; i < bounds.length; i++) {
    if (solution.stronglyDominates(bounds[i])) {
      dominated_ref_points.push(bounds[i]);
    }
  }

  // 2. Generate new reference points for each dominated reference point
  var new_ref_points = [];
  for (var i = 0; i < dominated_ref_points.length; i++) {
    new_ref_points = new_ref_points.concat(dominated_ref_points[i].generateReferencePoints(solution));
  }

  // 3. Remove dominated reference points from bounds
  for (var i = 0; i < dominated_ref_points.length; i++) {
    var index = bounds.indexOf(dominated_ref_points[i]);
    bounds.splice(index, 1);
  }

  // 4. Remove redundant reference points from new_ref_points
  var redundant_ref_points = [];
  for (var i = 0; i < new_ref_points.length; i++) {
    for (var j = i + 1; j < new_ref_points.length; j++) {
      // Keep the point that is weakly dominated
      if (new_ref_points[i].weaklyDominates(new_ref_points[j])) {
        redundant_ref_points.push(new_ref_points[i]);
      } else if (new_ref_points[j].weaklyDominates(new_ref_points[i])) {
        redundant_ref_points.push(new_ref_points[j]);
      }
    }
  }
  for (var i = 0; i < redundant_ref_points.length; i++) {
    var index = new_ref_points.indexOf(redundant_ref_points[i]);
    new_ref_points.splice(index, 1);
  }

  // 5. Add new reference points
  bounds = bounds.concat(new_ref_points);

  // 6. Remove redundant reference points from bounds
  redundant_ref_points = [];
  for (var i = 0; i < bounds.length; i++) {
    for (var j = i + 1; j < bounds.length; j++) {
      // Keep the point that is weakly dominated
      if (bounds[i].weaklyDominates(bounds[j])) {
        redundant_ref_points.push(bounds[i]);
      } else if (bounds[j].weaklyDominates(bounds[i])) {
        redundant_ref_points.push(bounds[j]);
      }
    }
  }
  for (var i = 0; i < redundant_ref_points.length; i++) {
    var index = bounds.indexOf(redundant_ref_points[i]);
    bounds.splice(index, 1);
  }

  // 7. Return the new bounds
  return bounds;
}

function getDominatedReferencePoints(bounds, solution) {
  var dominated_ref_points = [];
  for (var i = 0; i < bounds.length; i++) {
    if (solution.stronglyDominates(bounds[i])) {
      dominated_ref_points.push(bounds[i]);
    }
  }
  return dominated_ref_points;
}

// Global variables
var global_reference_points = [];
var global_solution_points = [];