include("/home/alan/Programming/CAD/utilities/createPolyline.js");
include("/home/alan/Programming/CAD/utilities/lines.js");
include("/home/alan/Programming/CAD/utilities/print.js");

function generateSeamAllowance(shape, allowance) {

  // Shape needs to be centred on the origin, otherwise some border edges generate
  // inside instead of outside
  translation = shape.getBoundingBox().getCenter().copy();
  print("translation: " + translation.x.toString() + ", " + translation.y.toString()) 
  print("allowance: " + allowance.toString());
  shape.move(new RVector(-translation.x, -translation.y))

  lines = shape.getExploded()

  para = []

  for (var i = 0; i < lines.length; i++) {
    offset_line = lines[i].getOffsetShapes(-allowance, 1, RS.LeftHand, new RVector(0,0))
    para.push(offset_line[0])
  }

  points = []

  for (var i = 0; i < para.length; i++) {
    if (i < para.length - 1) {
      points.push(calculateIntersectionPoint(para[i], para[i + 1]))
    }
    else {
      points.push(calculateIntersectionPoint(para[i], para[0]))
    }
  
    print("Point: " + points[i][0].toString() + ", " + points[i][1].toString());
  }
  
  print("Number of points: " + points.length.toString());
  
  for (var i = 0; i < points.length; i++) {
  
    print("Point: " + points[i][0].toString() + ", " + points[i][1].toString());
  }
  
  border = createPolyline(points, true)

  // Move shape and border back to where they were originally
  shape.move(new RVector(translation.x, translation.y))
  border.move(new RVector(translation.x, translation.y))
  
  return border
}