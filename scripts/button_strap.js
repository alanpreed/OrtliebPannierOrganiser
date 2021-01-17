PROJECT_PATH = "/home/alan/Documents/CAD/Ortlieb bag organiser/scripts/"

include(PROJECT_PATH + "utilities/createPolyline.js");
include(PROJECT_PATH + "utilities/generateSeamAllowance.js");
include(PROJECT_PATH + "dimensions.js");
include(PROJECT_PATH + "utilities/lines.js");

const p1 = [0, 0];
const p2 = [0, strap_length];
const p3 = [2 * strap_width, strap_length];
const p4 = [2 * strap_width, 0];

base = createPolyline([p1, p2, p3, p4], true)
base.move(new RVector(-(2 * strap_width) / 2, -strap_length / 2));

// Add seam allowance around shape
border = generateSeamAllowance(base, strap_seam_allowance)

// Fold line for strap
fold_top = [strap_width,  0];
fold_bottom = [strap_width, strap_length];

fold_line = new RLine(new RVector(fold_top), new RVector(fold_bottom))
fold_line.move(new RVector(-(2 * strap_width) / 2, -strap_length / 2))

addShape(base);
addShape(border);
addShape(fold_line);

addSimpleText("Seam allowance", [0, strap_length / 2 + strap_seam_allowance - small_text_height / 2], small_text_height, 0, "standard", RS.VAlignTop, RS.HAlignCenter, false, false)
addSimpleText("Button strap", [-3, strap_length / 4], 6, 0, "standard", RS.VAlignTop, RS.HAlignCenter, false, false)
addSimpleText("Fold line", [small_text_height, - strap_length / 4], small_text_height, 90, "standard", RS.VAlignTop, RS.HAlignCenter, false, false)
