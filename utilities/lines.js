// Utility functions for working with QCAD RLines

function calculateGradient(line) {
  start = line.getStartPoint()
  end = line.getEndPoint()
  return (end.y - start.y) / (end.x - start.x);
}

function calculateIntercept(line) {
  gradient = calculateGradient(line);
  point = line.getStartPoint();
  return point.y - (gradient * point.x)
}

function calculateIntersectionPoint(line1, line2) {
  if (line1.isVertical()) {
    gradient2 = calculateGradient(line2)
    intercept2 = calculateIntercept(line2)
    x = line1.getStartPoint().x
    y = gradient2 * x + intercept2
  }
  else if (line2.isVertical()) {
    gradient1 = calculateGradient(line1)
    intercept1 = calculateIntercept(line1)
    x = line2.getStartPoint().x
    y = gradient1 * x + intercept1
  }
  else {
    gradient1 = calculateGradient(line1)
    intercept1 = calculateIntercept(line1)
    gradient2 = calculateGradient(line2)
    intercept2 = calculateIntercept(line2)

    x = (intercept2 - intercept1) / (gradient1 - gradient2)
    y = gradient1 * x + intercept1
  }
  return [x, y]
}
