import React from 'react';
import * as d3 from "d3";
import * as cloud from 'd3-cloud';
import { useEffect } from 'react';

function WordCloudSec(props) {
    useEffect(()=>{
        const spalvos = ["#1E90FF", "#191970", "#000000", "#D2691E", "#DC143C", "#2F4F4F", "#9400D3", "#B22222", "#4B0082", "#808000"];
        // Cloudo dimensionai
        const margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 0.72*window.innerWidth - margin.left - margin.right,
            height = 0.45*window.innerHeight - margin.top - margin.bottom;
        
        // append the svg object to the body of the page (karoce be sito neveiks XDDD)
        const svg = d3.select("#burbulas").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        .append("g")
            .attr("width", width + margin.left + margin.right)
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
            
        let sizeMultiplier = 1;
        //Pacio layouto kurimas    
        const layout = cloud()
        .size([width, height])
        .words(props.array.map((d,index)=>{if(index==1){if(parseFloat(d[1]) < 20){sizeMultiplier = 3}else if(parseFloat(d[1]) < 50){sizeMultiplier = 2}else if(parseFloat(d[1]) > 200){sizeMultiplier = 0.7}else{sizeMultiplier = 1}}; return {text: d[0], size: d[1]}}))
        .padding(4)        //Tarpas tarp zodziu
        .rotate(315)       // Zodziu pasisukimas, jis yra random galima padaryt ji vienoda
        .fontSize(function(d) { return d.size * sizeMultiplier; })      // zodziu dydis pagal turimus skaicius, kadangi fonto dydis atitinka frequency
                                                        //tai galima dalint is skaiciaus arba kazkaip suzaist su skaiciais
        .on("end", draw);
        layout.start();
        
        //Layouto atvaizdavimas
        function draw(words) {
        svg
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
                .data(words)
            .enter().append("text")
                .style("font-size", function(d) { return d.size; }) //atitinkamai reiks ir cia pakeist kadangi sitas dalykas actually piesia 
                .style("fill", spalvos[Math.floor(Math.random() * 10)]) //spalvos 
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
    },[])

    return (
        <div id='burbulas'>
        </div>
    );
}

export default WordCloudSec;