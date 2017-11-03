import { Component, OnInit, Input } from '@angular/core';
import { CashFlowResults, CashFlowForm } from '../cash-flow';
import * as d3 from 'd3';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-cash-flow-diagram',
  templateUrl: './cash-flow-diagram.component.html',
  styleUrls: ['./cash-flow-diagram.component.css']
})
export class CashFlowDiagramComponent implements OnInit {
  @Input()
  cashFlowResults: CashFlowResults;
  @Input()
  cashFlowForm: CashFlowForm;
  // x: any;
  // y: any;
  constructor() {
     }

  ngOnInit() {
  }

  ngOnChanges() {
    this.makeGraph();
  }

  makeGraph() {
    console.log("installation cost " + this.cashFlowForm.installationCost);
    console.log("energy savings " + this.cashFlowForm.energySavings);


    // const data = [
    //   {month: "Q1-2016", apples: 3840, bananas: 1920, cherries: -1960, dates: -400},
    //   {month: "Q2-2016", apples: 1600, bananas: 1440, cherries: -960, dates: -400},
    //   {month: "Q3-2016", apples:  640, bananas:  960, cherries: -640, dates: -600},
    //   {month: "Q4-2016", apples:  320, bananas:  480, cherries: -640, dates: -400}
    // ];
    const data = [
      {month: "Q1-2016", apples: 10, bananas: 10, cherries: -10, dates: -10},
      {month: "Q2-2016", apples: 20, bananas: 20, cherries: -20, dates: -20},
      {month: "Q3-2016", apples:  30, bananas:  30, cherries: -30, dates: -30},
      {month: "Q4-2016", apples:  40, bananas:  40, cherries: -40, dates: -40}
    ];

    let series = d3.stack()
      .keys(["apples", "bananas", "cherries", "dates"])
      .offset(d3.stackOffsetDiverging)
      (data);

    const margin = {top: 20, right: 30, bottom: 30, left: 60};
    const width = 600, height = 500;
    let svg = d3.select("app-cash-flow-diagram").append("svg")
        .attr('width', width)
        .attr('height', height)
        .attr('margin', margin);

    // var svg = d3.select("app-cash-flow-diagram").append("svg"),
    //   margin = {top: 20, right: 30, bottom: 30, left: 60},
    //   width = +svg.attr("width"),
    //   height = +svg.attr("height");

    let x = d3.scaleBand()
      .domain(data.map(function(d) { return d.month; }))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

    let y = d3.scaleLinear()
      // .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
      .domain([-80, d3.max(series, stackMax)])
      .rangeRound([height - margin.bottom, margin.top]);

    let z = d3.scaleOrdinal(d3.schemeCategory10);

    svg.append("g")
      .selectAll("g")
      .data(series)
      .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("width", x.bandwidth)
      .attr("x", function(d) { return x(d.data.month); })
      .attr("y", function(d) { return y(0); }) // setting this to 0 produces bars that are below the y axis, so this likely means that bars are drawn "top down"
      // .attr("y", function(d) { return y(d.data.bananas); })
      .attr("height", function(d) { return y(d.data.apples); });
      // .attr("y", function(d) { return y(d[1]); })
      // .attr("height", function(d) { return y(d[0]) - y(d[1]); });

    svg.append("g")
      .attr("transform", "translate(0," + y(0) + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(d3.axisLeft(y));

    function stackMin(serie) {
      return d3.min(serie, function(d) { return d[0]; });
    }

    function stackMax(serie) {
      return d3.max(serie, function(d) { return d[1]; });
    }

    // var data = [
    //   {year: "Year 1", installationCost: this.cashFlowForm.installationCost, annualSavings: this.cashFlowForm.energySavings},
    //   // {year: "Year 1", apples: 3840, bananas: 1920, cherries: -1960, dates: -400},
    //   // {year: "Year 2", apples: 1600, bananas: 1440, cherries: -960, dates: -400},
    //   // {year: "Year 3", apples:  640, bananas:  960, cherries: -640, dates: -600},
    //   // {year: "Year 4", apples:  320, bananas:  480, cherries: -640, dates: -400}
    // ];
    //
    // var series = d3.stack()
    //   .keys(["installationCost", "annualSavings"])
    //   .offset(d3.stackOffsetDiverging)
    //   (data);
    //
    // const margin = {top: 20, right: 30, bottom: 30, left: 60};
    // const width = 500, height = 500;
    //
    // var svg = d3.select('app-cash-flow-diagram').append("svg")
    //   .attr('width', 500)
    //   .attr('height', 500);
    // // margin = {top: 20, right: 30, bottom: 30, left: 60},
    // // .attr('height', fullHeight)
    // // width = svg.attr(500),
    // // height = svg.attr(500);
    // // width = +svg.attr("width"),
    // // height = +svg.attr("height");
    //
    // var x = d3.scaleBand()
    //   .domain(data.map(function(d) { return d.year; }))
    //   .rangeRound([margin.left, width - margin.right])
    //   .padding(0.1);
    //
    // var y = d3.scaleLinear()
    // // .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
    //   .domain([-12000, 12000])
    //   .rangeRound([height - margin.bottom, margin.top]);
    //
    // var z = d3.scaleOrdinal(d3.schemeCategory10);
    //
    //
    // for (let i = 0; i < data.length; i++) {
    //   svg.append("g")
    //     .selectAll("g")
    //     .data(series)
    //     .enter().append("g")
    //     .attr("fill", function(d) { return z(d.key); })
    //     .selectAll("rect")
    //     // .data(function(d) { return d; })
    //     .data(data)
    //     .enter().append("rect")
    //     .attr("width", x.bandwidth)
    //     .attr("x", x(data[i].year))
    //     // .attr("y", function(d) { return y(d[1]); })
    //     // .attr("y", y(data[i].installationCost))
    //     .attr("y", y(data[i].annualSavings))
    //     .attr("height", y(data[i].annualSavings));
    //     // .attr("height", y(data[i].installationCost));
    //
    //   svg.append("g")
    //     .attr("transform", "translate(0," + y(0) + ")")
    //     .call(d3.axisBottom(x));
    //
    //   svg.append("g")
    //     .attr("transform", "translate(" + margin.left + ",0)")
    //     .call(d3.axisLeft(y));
    // }
    // svg.append("g")
    //   .selectAll("g")
    //   .data(series)
    //   .enter().append("g")
    //   .attr("fill", function(d) { return z(d.key); })
    //   .selectAll("rect")
    //   .data(function(d) { return d; })
    //   .enter().append("rect")
    //   .attr("width", x.bandwidth)
    //   .attr("x", function(d) { return x(d.data.year); })
    //   // .attr("y", function(d) { return y(d[1]); })
    //   .attr("y", function(d) { return y(d.data.installationCost); })
    //   .attr("height", function(d) {
    //     return y(d.data.installationCost);
    //     // const blah = y(d[0]) - y(d[1]);
    //     // if (blah < 0) {
    //     //   return -blah;
    //     // }
    //     // return y(d[0]) - y(d[1]);
    //   });
    //
    // svg.append("g")
    //   .attr("transform", "translate(0," + y(0) + ")")
    //   .call(d3.axisBottom(x));
    //
    // svg.append("g")
    //   .attr("transform", "translate(" + margin.left + ",0)")
    //   .call(d3.axisLeft(y));

  }
}
