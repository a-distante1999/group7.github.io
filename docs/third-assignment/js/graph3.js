$(document).ready(function () {
    // The svg
    const svg = d3.select(singleContainer)
        .append("svg")
        .attr("width", 700)
        .attr("height", 500);

    let width = +svg.attr("width");
    let height = +svg.attr("height");

    const legend = d3.select(singleContainer)
        .append("svg")
        .attr("width", 1000)
        .attr("height", 150);

    const Tooltip = d3.select(singleContainer)
        .append("div")
        .attr("class", "Tooltip")
        .attr('style', 'position: absolute; opacity: 0;')
        .style("opacity", 0)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    let data = new Map()
    const colorScale = d3.scaleThreshold()
        .domain([200, 400, 600, 800, 1000])
        .range(d3.schemeBlues[6]);

    Promise.all([
        d3.json("../circoscrizioni.json"),
        d3.csv("../neighborhood.csv", function (d) {
            data.set(d.numero_cir, +d.oxygen)
        })
    ]).then(function (loadData) {

        let topo = loadData[0]

        let mouseOver = function (d) {
            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", .1)
            d3.select(this)
                .transition()
                .duration(200)
                .style("opacity", 1)
            Tooltip.style('opacity', 1)
        }

        var mousemove = function (event, d) {
            Tooltip
                .html(d.properties.nome + "<br>" + "Oxygen: " + d.total + " kg/yr"+ "<br>" + "Abundance: " + d.properties.treeAbundance + "<br>" + "Area: " + d.properties.area + " m<sup>2</sup>" + "<br>")
                .style("left", (event.x) / 1.5 + "px")
                .style("top", (event.y) / 1.5 + "px")
        }

        let mouseLeave = function (d) {
            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", 1)
            d3.select(this)
                .transition()
                .duration(200)
            Tooltip.style('opacity', 0)
        }

        const projection = d3.geoIdentity().reflectY(true)
            .fitSize([width, height], topo);

        svg.append("g")
            .selectAll("path")
            .data(topo.features)
            .join("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#000")

            .attr("fill", function (d, i) {
                d.total = data.get(d.properties.numero_cir) || 0;
                return colorScale(d.total);
            })
            .attr("class", function (d) { return "Country" })
            .style("opacity", 1)
            .on("mouseover", mouseOver)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseLeave)

        legend.append("text").attr("x", 430).attr("y", 140).text("Oxygen Production [kg/yr]").style("font-size", "15px").attr("alignment-baseline", "middle")
        //LEGEND
        //Primo blocco
        legend.append("rect").attr("x", 50).attr("y", 70).attr('width', 150).attr('height', 30).style("fill", colorScale(0)).attr('stroke', 'black')
        legend.append("text").attr("x", 45).attr("y", 115).text("0").style("font-size", "15px").attr("alignment-baseline", "middle")
        legend.append("text").attr("x", 186).attr("y", 115).text("200").style("font-size", "15px").attr("alignment-baseline", "middle")
        //Secondo blocco
        legend.append("rect").attr("x", 200).attr("y", 70).attr('width', 150).attr('height', 30).style("fill", colorScale(200)).attr('stroke', 'black')
        legend.append("text").attr("x", 337).attr("y", 115).text("400").style("font-size", "15px").attr("alignment-baseline", "middle")
        //Terzo blocco
        legend.append("rect").attr("x", 350).attr("y", 70).attr('width', 150).attr('height', 30).style("fill", colorScale(400)).attr('stroke', 'black')
        legend.append("text").attr("x", 487).attr("y", 115).text("600").style("font-size", "15px").attr("alignment-baseline", "middle")
        //Quarto blocco
        legend.append("rect").attr("x", 350 + 150).attr("y", 70).attr('width', 150).attr('height', 30).style("fill", colorScale(600)).attr('stroke', 'black')
        legend.append("text").attr("x", 637).attr("y", 115).text("800").style("font-size", "15px").attr("alignment-baseline", "middle")
        //Quinto blocco
        legend.append("rect").attr("x", 350 + 300).attr("y", 70).attr('width', 150).attr('height', 30).style("fill", colorScale(800)).attr('stroke', 'black')
        legend.append("text").attr("x", 783).attr("y", 115).text("1000").style("font-size", "15px").attr("alignment-baseline", "middle")
        //Sesto blocco
        legend.append("rect").attr("x", 350 + 450).attr("y", 70).attr('width', 150).attr('height', 30).style("fill", colorScale(1000)).attr('stroke', 'black')
        legend.append("text").attr("x", 930).attr("y", 115).text("Oltre 1000").style("font-size", "15px").attr("alignment-baseline", "middle")
    })
});