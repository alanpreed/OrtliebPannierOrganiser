include("/home/alan/Programming/CAD/utilities/createPolyline.js");
include("/home/alan/Programming/CAD/utilities/generateSeamAllowance.js");
include("/home/alan/Programming/CAD/dimensions.js");
include("/home/alan/Programming/CAD/utilities/lines.js");

// function createBaseshape(top_width, mid_width, base_width, top_height, side_height, base_height) {
//   const p1 = [top_width, top_height]
//   const p2 = [top_width, top_height - side_height]
//   const p3 = [top_width / 2 + mid_width / 2, base_height]
//   const p4 = [top_width / 2 + base_width / 2, 0]

//   const p5 = [top_width / 2 - base_width / 2, 0]
//   const p6 = [top_width / 2 - mid_width / 2, base_height]
//   const p7 = [0, top_height - side_height]
//   const p8 = [0, top_height]

//   base = createPolyline([p1, p2, p3, p4, p5, p6, p7, p8], true)

//   move(base, [-top_width / 2, -top_height / 2]);

//   return base;
// };

// test_base = createBaseshape(top_width, mid_width, base_width, top_height + hem_height, side_height, base_height);

const pocket_width = 210;
const pocket_h_offset = 50;
const pocket_height = 110;


const p1 = [pocket_width, top_height - pocket_h_offset + hem_height]
const p2 = [pocket_width, top_height - pocket_h_offset - pocket_height]

const p4 = [0, top_height - side_height]
const p5 = [0, top_height - pocket_h_offset + hem_height]

// Bottom left corner will be partway along the angled LH edge, so we need to calculate where the top
// edge will cross this
const p3 = calculateIntersectionPoint(new RLine(new RVector(p4), new RVector(top_width / 2 - mid_width / 2, base_height)),
                                      new RLine(new RVector(p2), new RVector(p2[0] + 1, p2[1])))

base = createPolyline([p1, p2, p3, p4, p5], true)
base.move(new RVector(-top_width / 2, -top_height / 2));

border = generateSeamAllowance(base, 15)

hem_line = new RLine(new RVector(p1[0], p1[1] - hem_height), new RVector(p5[0], p5[1] - hem_height))
hem_line.move(new RVector(-top_width / 2, -top_height / 2));

const pen_divider_size = 30;

pen_line_1 = new RLine(new RVector(p1[0] - pen_divider_size, p1[1] - hem_height), new RVector(p2[0] - pen_divider_size, p2[1]))
pen_line_1.move(new RVector(-top_width / 2, -top_height / 2));

pen_line_2 = new RLine(new RVector(p1[0] - 2 *pen_divider_size, p1[1] - hem_height), new RVector(p2[0] - 2 * pen_divider_size, p2[1]))
pen_line_2.move(new RVector(-top_width / 2, -top_height / 2));

addShape(base)
addShape(border)
addShape(hem_line)
addShape(pen_line_1)
addShape(pen_line_2)
