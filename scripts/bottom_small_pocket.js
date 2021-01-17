PROJECT_PATH = "/home/alan/Documents/CAD/Ortlieb bag organiser/scripts/"

include(PROJECT_PATH + "utilities/createPolyline.js");
include(PROJECT_PATH + "utilities/generateSeamAllowance.js");
include(PROJECT_PATH + "dimensions.js");
include(PROJECT_PATH + "utilities/lines.js");

// Account for pocket inset in pocket height so that it has the correct size when shrunk later
// Account for pocket inset of large pocket only in pocket width so that this will fit on it when shrunk
const pocket_height = bottom_small_pocket_height + 4 * pocket_inset;
const pocket_width = large_pocket_width + 2 * pocket_inset;

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

// Shrink pocket by 2x the pocket inset, so that it fits on large pocket
shifted_base = generateSeamAllowance(base, -2 * pocket_inset)

// Add seam allowance around shape
border = generateSeamAllowance(shifted_base, seam_allowance)


// Calculate position for pocket hem
hem_right = [p1[0]  - 2 * pocket_inset - top_width / 2, p1[1] - 2 *pocket_inset - top_height / 2  - hem_height]
hem_left = shifted_base.getVertices()[3]

hem_line = new RLine(new RVector(hem_right), hem_left)

addShape(shifted_base)
addShape(border)
addShape(hem_line)

addSimpleText("Hem", [0, p1[1] - top_height / 2 - pocket_inset - hem_height], small_text_height, 0, "standard", RS.VAlignTop, RS.HAlignCenter, false, false)
addSimpleText("Seam allowance", [0, p1[1] - top_height / 2 - pocket_inset], small_text_height, 0, "standard", RS.VAlignTop, RS.HAlignCenter, false, false)
addSimpleText("Bottom small pocket", [(pocket_width - top_width) / 2, -pocket_height / 2], large_text_height, 0, "standard", RS.VAlignTop, RS.HAlignCenter, false, false)
