PROJECT_PATH = "/home/alan/Documents/CAD/Ortlieb bag organiser/scripts/"

include(PROJECT_PATH + "utilities/createPolyline.js");
include(PROJECT_PATH + "utilities/generateSeamAllowance.js");
include(PROJECT_PATH + "dimensions.js");

// Account for pocket inset in pocket width so that it has the correct size when shrunk
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

// Shrink base shape by pocket inset so that it fits onto the bag base
shifted_base = generateSeamAllowance(base, -pocket_inset)

// Add seam allowance around shape
border = generateSeamAllowance(shifted_base, seam_allowance)

hem_line = createPolyline([[pocket_inset, top_height - pocket_inset], [pocket_width - pocket_inset, top_height - pocket_inset]], false)
move(hem_line, [-top_width / 2, -top_height / 2]);

addShape(shifted_base)
addShape(border)
addShape(hem_line)

addSimpleText("Hem", [0, total_height / 2 - pocket_inset], small_text_height, 0, "standard", RS.VAlignTop, RS.HAlignCenter, false, false)
addSimpleText("Seam allowance", [0, hem_height + total_height / 2 - pocket_inset], small_text_height, 0, "standard", RS.VAlignTop, RS.HAlignCenter, false, false)
addSimpleText("Large pocket", [0, 0], large_text_height, 0, "standard", RS.VAlignTop, RS.HAlignCenter, false, false)
