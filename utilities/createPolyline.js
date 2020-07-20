// QCAD's built-in addPolyline function, altered so that it returns the shape 
// rather than drawing it
function createPolyline(points, closed, relative) {
  if (isNull(closed)) {
      closed = false;
  }
  if (isNull(relative)) {
      relative = false;
  }

  var pl = new RPolyline();
  pl.setClosed(closed);

  var v = new RVector(0,0);
  for (var i=0; i<points.length; i++) {
      var v0 = undefined;
      var b = 0.0;
      var rel = relative;

      if (isVector(points[i])) {
          v0 = points[i];
      }
      // first item in vertex tuple is RVector or x,y pair:
      else if (isArray(points[i])) {
          if (isVector(points[i][0])) {
              v0 = points[i][0];
              if (!isNull(points[i][1])) {
                  b = points[i][1];
              }
              if (!isNull(points[i][2])) {
                  rel = points[i][2];
              }
          }
          else {
              v0 = new RVector(points[i][0], points[i][1]);
              if (!isNull(points[i][2])) {
                  b = points[i][2];
              }
              if (!isNull(points[i][3])) {
                  rel = points[i][3];
              }
          }
      }
      // custom objects with .x, .y (, .z, .b) members:
      else if (isNumber(points[i].x) && isNumber(points[i].y)) {
          if (isNumber(points[i].z)) {
              v0 = new RVector(points[i].x, points[i].y, points[i].z);
          }
          else {
              v0 = new RVector(points[i].x, points[i].y);
          }
          if (isNumber(points[i].b)) {
              b = points[i].b;
          }
      }

      // relative or absolute vertex position:
      if (relative) {
          v = v.operator_add(v0);
      }
      else {
          v = v0;
      }

      pl.appendVertex(v, b);
  }

  return pl;
}
