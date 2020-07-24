include("/home/alan/Programming/CAD/utilities/createPolyline.js");
include("/home/alan/Programming/CAD/utilities/generateSeamAllowance.js");
include("/home/alan/Programming/CAD/dimensions.js");
include("/home/alan/Programming/CAD/utilities/lines.js");

const pocket_width = large_pocket_width + 2 * pocket_inset;
const pocket_height = 120 + 4 * pocket_inset;

const p1 = [pocket_width, pocket_height + hem_height]
const p2 = [pocket_width, 0]

const p3 = [top_width / 2 - base_width / 2, 0]
const p4 = [top_width / 2 - mid_width / 2, base_height]

// Top left corner will be partway along the angled LH edge, so we need to calculate where the top
// edge will cross this
const p5 = calculateIntersectionPoint(new RLine(new RVector(p4), new RVector(0, top_height - side_height)),
                                      new RLine(new RVector(p1[0], p1[1] - hem_height - 2 * pocket_inset), 
                                                new RVector(p1[0] + 1, p1[1] - hem_height - 2 * pocket_inset)))

const p6 = calculateIntersectionPoint(new RLine(new RVector(p5), new RVector(p4[0], 2 * p5[1] - p4[1])),
                                      new RLine(new RVector(p1), new RVector(p1[0] + 1, p1[1])))

base = createPolyline([p1, p2, p3, p4, p5, p6], true)
base.move(new RVector(-top_width / 2, -top_height / 2));

shifted_base = generateSeamAllowance(base, -2 * pocket_inset)

border = generateSeamAllowance(shifted_base, 15)


hem_right = [p1[0]  - 2 * pocket_inset - top_width / 2, p1[1] - hem_height - 2 *pocket_inset - top_height / 2]

hem_left = shifted_base.getVertices()[3]

print(hem_left.x.toString())

hem_line = new RLine(new RVector(hem_right), hem_left)

addShape(shifted_base)
addShape(border)
addShape(hem_line)
