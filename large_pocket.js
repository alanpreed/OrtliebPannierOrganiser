include("/home/alan/Programming/CAD/utilities/createPolyline.js");
include("/home/alan/Programming/CAD/utilities/generateSeamAllowance.js");
include("/home/alan/Programming/CAD/dimensions.js");

const pocket_offset = 110

const p1 = [top_width - pocket_offset, total_height]
const p2 = [top_width - pocket_offset, 0]

const p3 = [top_width / 2 - base_width / 2, 0]
const p4 = [top_width / 2 - mid_width / 2, base_height]
const p5 = [0, top_height - side_height]
const p6 = [0, total_height]

// Shape needs to be centred on origin for border generation to work
base = createPolyline([p1, p2, p3, p4, p5, p6], true)
move(base, [-top_width / 2, -top_height / 2]);

border = generateSeamAllowance(base, 15)

hem_line = createPolyline([[0, top_height], [top_width - pocket_offset, top_height]], false)
move(hem_line, [-top_width / 2, -top_height / 2]);

// move(base, [-55, 0]);
// move(border, [-55, 0]);
// move(hem_line, [-55, 0]);
addShape(base)
addShape(border)
addShape(hem_line)
