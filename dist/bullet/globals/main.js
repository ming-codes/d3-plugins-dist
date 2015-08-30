!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self);var f=n;f=f.d3||(f.d3={}),f=f.plugins||(f.plugins={}),f.bullet=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var d3 = window.d3["default"] || window.d3;

// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
exports["default"] = function() {
  var orient = "left",
      reverse = false,
      vertical = false,
      ranges = bulletRanges,
      markers = bulletMarkers,
      measures = bulletMeasures,
      width = 380,
      height = 30,
      xAxis = d3.svg.axis();

  // For each small multiple…
  function bullet(g) {
    g.each(function(d, i) {
      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
          markerz = markers.call(this, d, i).slice().sort(d3.descending),
          measurez = measures.call(this, d, i).slice().sort(d3.descending),
          g = d3.select(this),
          extentX,
          extentY;

      var wrap = g.select("g.wrap");
      if (wrap.empty()) wrap = g.append("g").attr("class", "wrap");

      if (vertical) {
        extentX = height, extentY = width;
        wrap.attr("transform", "rotate(90)translate(0," + -width + ")");
      } else {
        extentX = width, extentY = height;
        wrap.attr("transform", "translate(0)");
      }

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
          .range(reverse ? [extentX, 0] : [0, extentX]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Derive width-scales from the x-scales.
      var w0 = bulletWidth(x0),
          w1 = bulletWidth(x1);

      // Update the range rects.
      var range = wrap.selectAll("rect.range")
          .data(rangez);

      range.enter().append("rect")
          .attr("class", function(d, i) { return "range s" + i; })
          .attr("width", w0)
          .attr("height", extentY)
          .attr("x", reverse ? x0 : 0)

      d3.transition(range)
          .attr("x", reverse ? x1 : 0)
          .attr("width", w1)
          .attr("height", extentY);

      // Update the measure rects.
      var measure = wrap.selectAll("rect.measure")
          .data(measurez);

      measure.enter().append("rect")
          .attr("class", function(d, i) { return "measure s" + i; })
          .attr("width", w0)
          .attr("height", extentY / 3)
          .attr("x", reverse ? x0 : 0)
          .attr("y", extentY / 3);

      d3.transition(measure)
          .attr("width", w1)
          .attr("height", extentY / 3)
          .attr("x", reverse ? x1 : 0)
          .attr("y", extentY / 3);

      // Update the marker lines.
      var marker = wrap.selectAll("line.marker")
          .data(markerz);

      marker.enter().append("line")
          .attr("class", "marker")
          .attr("x1", x0)
          .attr("x2", x0)
          .attr("y1", extentY / 6)
          .attr("y2", extentY * 5 / 6);

      d3.transition(marker)
          .attr("x1", x1)
          .attr("x2", x1)
          .attr("y1", extentY / 6)
          .attr("y2", extentY * 5 / 6);

      var axis = g.selectAll("g.axis").data([0]);
      axis.enter().append("g").attr("class", "axis");
      axis.call(xAxis.scale(x1));
    });
    d3.timer.flush();
  }

  // left, right, top, bottom
  bullet.orient = function(_) {
    if (!arguments.length) return orient;
    orient = _ + "";
    reverse = orient == "right" || orient == "bottom";
    xAxis.orient((vertical = orient == "top" || orient == "bottom") ? "left" : "bottom");
    return bullet;
  };

  // ranges (bad, satisfactory, good)
  bullet.ranges = function(_) {
    if (!arguments.length) return ranges;
    ranges = _;
    return bullet;
  };

  // markers (previous, goal)
  bullet.markers = function(_) {
    if (!arguments.length) return markers;
    markers = _;
    return bullet;
  };

  // measures (actual, forecast)
  bullet.measures = function(_) {
    if (!arguments.length) return measures;
    measures = _;
    return bullet;
  };

  bullet.width = function(_) {
    if (!arguments.length) return width;
    width = +_;
    return bullet;
  };

  bullet.height = function(_) {
    if (!arguments.length) return height;
    height = +_;
    return bullet;
  };

  return d3.rebind(bullet, xAxis, "tickFormat");
};

function bulletRanges(d) {
  return d.ranges;
}

function bulletMarkers(d) {
  return d.markers;
}

function bulletMeasures(d) {
  return d.measures;
}

function bulletWidth(x) {
  var x0 = x(0);
  return function(d) {
    return Math.abs(x(d) - x0);
  };
}
},{}]},{},[1])
(1)
});