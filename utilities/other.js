
function generateSeamAllowance(shape, allowance) {
  bounding = shape.getBoundingBox();
  width = bounding.getWidth();
  height = bounding.getHeight();

  x_scale = (width + (2 * allowance)) / width;
  y_scale = (height + (2 * allowance)) / height;

  shape.scale(new RVector(x_scale, y_scale), bounding.getCenter())
}
