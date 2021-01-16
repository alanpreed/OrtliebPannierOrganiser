PROJECT_PATH = "/home/alan/Documents/CAD/Ortlieb bag organiser/scripts/"

include(PROJECT_PATH + "utilities/createPolyline.js");
include(PROJECT_PATH + "utilities/generateSeamAllowance.js");
include(PROJECT_PATH + "dimensions.js");

// Include inset to compensate for pocket inset
pocket_width = large_pocket_width + 2 * pocket_inset

const p1 = [pocket_width, total_height]
const p2 = [pocket_width, 0]

const p3 = [top_width / 2 - base_width / 2, 0]
const p4 = [top_width / 2 - mid_width / 2, base_height]
const p5 = [0, top_height - side_height]
const p6 = [0, total_height]

// Shape needs to be centred on origin for border generation to work
base = createPolyline([p1, p2, p3, p4, p5, p6], true)
move(base, [-top_width / 2, -top_height / 2]);

shifted_base = generateSeamAllowance(base, -pocket_inset)

border = generateSeamAllowance(shifted_base, 15)

hem_line = createPolyline([[pocket_inset, top_height - pocket_inset], [pocket_width - pocket_inset, top_height - pocket_inset]], false)
move(hem_line, [-top_width / 2, -top_height / 2]);

// // move(base, [-55, 0]);
// // move(border, [-55, 0]);
// // move(hem_line, [-55, 0]);
addShape(shifted_base)
addShape(border)
addShape(hem_line)
