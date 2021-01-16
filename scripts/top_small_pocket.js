PROJECT_PATH = "/home/alan/Documents/CAD/Ortlieb bag organiser/scripts/"

include(PROJECT_PATH + "utilities/createPolyline.js");
include(PROJECT_PATH + "utilities/generateSeamAllowance.js");
include(PROJECT_PATH + "dimensions.js");
include(PROJECT_PATH + "utilities/lines.js");

const pocket_h_offset = 40;
const pocket_height = 110 + 4 * pocket_inset;

pocket_width = large_pocket_width + 4 * pocket_inset


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

shifted_base = generateSeamAllowance(base, -2 * pocket_inset)

border = generateSeamAllowance(shifted_base, 15)

hem_line = new RLine(new RVector(p1[0] - 2 * pocket_inset, p1[1] - hem_height - 2 * pocket_inset), 
                     new RVector(p5[0] + 2 * pocket_inset, p5[1] - hem_height - 2 * pocket_inset))
hem_line.move(new RVector(-top_width / 2, -top_height / 2));

const pen_divider_size = 30;

pen_line_1 = new RLine(new RVector(p1[0] - pen_divider_size - 2 * pocket_inset, p1[1] - hem_height - 2 * pocket_inset), 
                       new RVector(p2[0] - pen_divider_size - 2 * pocket_inset, p2[1] + 2 * pocket_inset))
pen_line_1.move(new RVector(-top_width / 2, -top_height / 2));

pen_line_2 = new RLine(new RVector(p1[0] - 2 *pen_divider_size - 2 * pocket_inset, p1[1] - hem_height - 2 * pocket_inset),
                       new RVector(p2[0] - 2 * pen_divider_size - 2 * pocket_inset, p2[1] + 2 * pocket_inset))
pen_line_2.move(new RVector(-top_width / 2, -top_height / 2));

addShape(shifted_base)
addShape(border)
addShape(hem_line)
addShape(pen_line_1)
addShape(pen_line_2)
