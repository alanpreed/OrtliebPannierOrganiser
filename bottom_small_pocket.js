include("/home/alan/Programming/CAD/utilities/createPolyline.js");
include("/home/alan/Programming/CAD/utilities/generateSeamAllowance.js");
include("/home/alan/Programming/CAD/dimensions.js");
include("/home/alan/Programming/CAD/utilities/lines.js");

const pocket_offset = 110;
const pocket_height = 140 + hem_height;

const p1 = [top_width - pocket_offset, pocket_height]
const p2 = [top_width - pocket_offset, 0]

const p3 = [top_width / 2 - base_width / 2, 0]
const p4 = [top_width / 2 - mid_width / 2, base_height]

// Top left corner will be partway along the angled LH edge, so we need to calculate where the top
// edge will cross this
const p5 = calculateIntersectionPoint(new RLine(new RVector(p4), new RVector(0, top_height - side_height)),
                                      new RLine(new RVector(p1), new RVector(p1[0] + 1, p1[1])))

base = createPolyline([p1, p2, p3, p4, p5], true)
base.move(new RVector(-top_width / 2, -top_height / 2));

border = generateSeamAllowance(base, 15)


hem_right = [p1[0], p1[1] - hem_height]

hem_left = calculateIntersectionPoint(new RLine(new RVector(hem_right), new RVector(hem_right[0] + 1, hem_right[1])),
                                      new RLine(new RVector(p4), new RVector(0, top_height - side_height)))

hem_line = new RLine(new RVector(hem_right), new RVector(hem_left))
hem_line.move(new RVector(-top_width / 2, -top_height / 2));

addShape(base)
addShape(border)
addShape(hem_line)
