include("/home/alan/Programming/CAD/utilities/createPolyline.js");
include("/home/alan/Programming/CAD/utilities/generateSeamAllowance.js");
include("/home/alan/Programming/CAD/dimensions.js");

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



const p1 = [top_width, total_height]
const p2 = [top_width, top_height - side_height]
const p3 = [top_width / 2 + mid_width / 2, base_height]
const p4 = [top_width / 2 + base_width / 2, 0]

const p5 = [top_width / 2 - base_width / 2, 0]
const p6 = [top_width / 2 - mid_width / 2, base_height]
const p7 = [0, top_height - side_height]
const p8 = [0, total_height]

// Shape needs to be centred on origin for border generation to work
base = createPolyline([p1, p2, p3, p4, p5, p6, p7, p8], true)
move(base, [-top_width / 2, -top_height / 2]);

border = generateSeamAllowance(base, 15)

hem_line = createPolyline([[0, top_height], [top_width, top_height]], false)
move(hem_line, [-top_width / 2, -top_height / 2]);

addShape(base)
addShape(border)
addShape(hem_line)
