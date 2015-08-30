!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self);var f=n;f=f.d3||(f.d3={}),f=f.plugins||(f.plugins={}),f.adjacencyMatrix=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var d3 = window.d3["default"] || window.d3;

exports["default"] = function() {
  var directed = true,
    size = [1,1],
    nodes = [],
    edges = [],
    edgeWeight = function (d) {return 1},
    nodeID = function (d) {return d.id};

  function matrix() {
    var width = size[0],
    height = size[1],
    nodeWidth = width / nodes.length,
    nodeHeight = height / nodes.length,
    constructedMatrix = [],
    matrix = [],
    edgeHash = {},
    xScale = d3.scale.linear().domain([0,nodes.length]).range([0,width]),
    yScale = d3.scale.linear().domain([0,nodes.length]).range([0,height]);

    nodes.forEach(function(node, i) {
      node.sortedIndex = i;
    })

    edges.forEach(function(edge) {
      var constructedEdge = {source: edge.source, target: edge.target, weight: edgeWeight(edge)};
      if (typeof edge.source == "number") {
        constructedEdge.source = nodes[edge.source];
      }
      if (typeof edge.target == "number") {
        constructedEdge.target = nodes[edge.target];
      }
      var id = nodeID(constructedEdge.source) + "-" + nodeID(constructedEdge.target);

      if (directed === false && constructedEdge.source.sortedIndex < constructedEdge.target.sortedIndex) {
        id = nodeID(constructedEdge.target) + "-" + nodeID(constructedEdge.source);
      }
      if (!edgeHash[id]) {
        edgeHash[id] = constructedEdge;
      }
      else {
        edgeHash[id].weight = edgeHash[id].weight + constructedEdge.weight;
      }
    });

    console.log("nodes", nodes, nodes.length)

    nodes.forEach(function (sourceNode, a) {
      nodes.forEach(function (targetNode, b) {
        var grid = {id: nodeID(sourceNode) + "-" + nodeID(targetNode), source: sourceNode, target: targetNode, x: xScale(b), y: yScale(a), weight: 0, height: nodeHeight, width: nodeWidth};
        var edgeWeight = 0;
        if (edgeHash[grid.id]) {
          edgeWeight = edgeHash[grid.id].weight;
          grid.weight = edgeWeight;
        };
        if (directed === true || b < a) {
          matrix.push(grid);
          if (directed === false) {
            var mirrorGrid = {id: nodeID(sourceNode) + "-" + nodeID(targetNode), source: sourceNode, target: targetNode, x: xScale(a), y: yScale(b), weight: 0, height: nodeHeight, width: nodeWidth};
            mirrorGrid.weight = edgeWeight;
            matrix.push(mirrorGrid);
          }
        }
      });
    });

    console.log("matrix", matrix, matrix.length)

    return matrix;
  }

  matrix.directed = function(x) {
    if (!arguments.length) return directed;
    directed = x;
    return matrix;
  }

  matrix.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return matrix;
  }

  matrix.nodes = function(x) {
    if (!arguments.length) return nodes;
    nodes = x;
    return matrix;
  }

  matrix.links = function(x) {
    if (!arguments.length) return edges;
    edges = x;
    return matrix;
  }

  matrix.edgeWeight = function(x) {
    if (!arguments.length) return edgeWeight;
    if (typeof x === "function") {
      edgeWeight = x;
    }
    else {
      edgeWeight = function () {return x};
    }
    return matrix;
  }

  matrix.nodeID = function(x) {
    if (!arguments.length) return nodeID;
    if (typeof x === "function") {
      nodeID = x;
    }
    return matrix;
  }

  matrix.xAxis = function(calledG) {
    var nameScale = d3.scale.ordinal()
    .domain(nodes.map(nodeID))
    .rangePoints([0,size[0]],1);

    var xAxis = d3.svg.axis().scale(nameScale).orient("top").tickSize(4);

    calledG
    .append("g")
    .attr("class", "am-xAxis am-axis")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("transform", "translate(-10,-10) rotate(90)");

  }

  matrix.yAxis = function(calledG) {
    var nameScale = d3.scale.ordinal()
    .domain(nodes.map(nodeID))
    .rangePoints([0,size[1]],1);

    yAxis = d3.svg.axis().scale(nameScale)
    .orient("left")
    .tickSize(4);

    calledG.append("g")
    .attr("class", "am-yAxis am-axis")
    .call(yAxis);
  }

  return matrix;
}
},{}]},{},[1])
(1)
});