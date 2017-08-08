function render() {
  //init
  var rects = svg.selectAll("rect").data(tempData);

  //enter
  rects.enter().append("rect")
    .attr("width", 5)
    .attr("x", function(d, i) {
      return i * 6;
    })
    .attr("y", function(d) {
      return 100 - d;
    })
    .attr("height", function(d) {
      return d;
    })

  // update
  rects.transition().
  duration(0)
    .attr("x", function(d, i) {
      return i * 6;
    })
    .attr("y", function(d) {
      return 100 - d;
    })
    .attr("height", function(d) {
      return d;
    })


  // exit
  rects.exit().remove();
}
