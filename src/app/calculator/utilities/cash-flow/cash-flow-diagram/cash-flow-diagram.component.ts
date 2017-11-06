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
    const margin = {top: 30, right: 10, bottom: 50, left: 50},
      width = 600,
      height = 400;

    const colors = [
      '#84B641',
      '#948A54',
      '#E1CD00',
      '#A03123',
      '#2ABDDA',
      '#DE762D',
      '#306DBE',
      '#1E7640'
    ];

    const stackBars = (arr, start, end) => {
      for (let index = end; index >= start; index--) {
        if (arr[index].value > 0 || arr[index + 1].value > 0) {
          continue;
        }
        arr[index].value = arr[index].value + arr[index + 1].value;
      }
    };

    function partialSort(arr, start, end) {
      let preSorted = arr.slice(0, start), postSorted = arr.slice(end);
      let sorted = arr.slice(start, end).sort((a, b) => a.value - b.value);
      arr.length = 0;
      arr.push.apply(arr, preSorted.concat(sorted).concat(postSorted));
      return arr;
    }

    let maxVals = {};
    let data = [
      {value: -this.cashFlowForm.operationCost, fill: colors[5], year: "Year 1"},
      {value: this.cashFlowForm.energySavings, fill: colors[7], year: "Year 1"},
      {value: -this.cashFlowForm.fuelCost, fill: colors[1], year: "Year 1"},
      {value: -this.cashFlowForm.installationCost, fill: colors[3], year: "Year 1"}
    ];

    partialSort(data, 0, 4);
    stackBars(data, 0, 3);
    maxVals['Year 1'] = data[3].value;

    let index = 4;
    for (let i = 1; i < this.cashFlowForm.lifeYears - 1; i++) {
      data.push({'value': -this.cashFlowForm.operationCost, 'fill': colors[5], 'year': 'Year ' + (i + 1)});
      data.push({'value': -this.cashFlowForm.fuelCost, 'fill': colors[1], 'year': 'Year ' + (i + 1)});
      data.push({'value': this.cashFlowForm.energySavings, 'fill': colors[7], 'year': 'Year ' + (i + 1)});
      partialSort(data, index, index + 3);
      stackBars(data, index, index + 2);
      maxVals['Year ' + (i + 1)] = data[index + 2].value;
      index += 3;
    }

    data.push({'value': -this.cashFlowForm.operationCost, 'fill': colors[5], 'year': 'Year ' + this.cashFlowForm.lifeYears});
    data.push({'value': -this.cashFlowForm.fuelCost, 'fill': colors[1], 'year': 'Year ' + this.cashFlowForm.lifeYears});
    data.push({'value': this.cashFlowForm.energySavings, 'fill': colors[7], 'year': 'Year ' + this.cashFlowForm.lifeYears});
    data.push({'value': this.cashFlowForm.salvageInput, 'fill': colors[6], 'year': 'Year ' + this.cashFlowForm.lifeYears});
    data.push({'value': -this.cashFlowForm.disposal, 'fill': colors[2], 'year': 'Year ' + this.cashFlowForm.lifeYears});
    partialSort(data, index, index + 5);
    stackBars(data, index, index + 4);
    const tmp = data[data.length - 2].value;
    data[data.length - 2].value += data[data.length - 1].value;
    data[data.length - 1].value = tmp;
    maxVals['Year ' + this.cashFlowForm.lifeYears] = data[data.length - 2].value;
    debugger

// Add svg to
    let svg = d3.select('app-cash-flow-diagram').append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// set the ranges
    const y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);

    const x = d3.scaleLinear()
      .range([0, width]);

// Scale the range of the data in the domains
    x.domain(d3.extent(data, function (d) {
      return d.value;
    }));
    y.domain(data.map(function (d) {
      return d.year;
    }));

// append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", function (d) {
        return "bar bar--" + (d.value < 0 ? "negative" : "positive");
      })
      .attr("x", function (d) {
        return x(Math.min(0, d.value));
      })
      .attr("y", function (d) {
        console.log('adding year ' + d.year);
        return y(d.year);
      })
      .attr("width", function (d) {
        return Math.abs(x(d.value) - x(0));
      })
      .attr("fill", function(d) { return d.fill; })
      .attr("height", y.bandwidth());

// add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

// add the y Axis
    let yAxisGroup = svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(d3.axisLeft(y));
      // .call(d3.axisRight(y));
    yAxisGroup.selectAll('.tick')
      .data(data)
      .select('text')
      // .attr('x', function(d, i) { return d.value < 0 ? 9 : -9; })
      .attr('x', function(d, i) { return 5; })
      .attr('fill', '#FFFFFF')
      // .attr('x', function(d, i) { console.log(d.year + ' and val is ' + maxVals[d.year]); return maxVals[d.year] / 10; })
      .style('text-anchor', function(d, i) { return 'start'; });
      // .style('text-anchor', 'end');
      // .style('text-anchor', function(d, i) { return d.value < 0 ? 'start' : 'end'; });


    // const data = [
    //   {month: "Q1-2016", apples: 10, bananas: 10, cherries: -10, dates: -10},
    //   {month: "Q2-2016", apples: 1, bananas: 20, cherries: -20, dates: -20},
    //   {month: "Q3-2016", apples:  1, bananas:  30, cherries: -30, dates: -30},
    //   {month: "Q4-2016", apples:  1, bananas:  40, cherries: -40, dates: -40}
    // ];
    //
    // let series = d3.stack()
    //   .keys(["apples", "bananas", "cherries", "dates"])
    //   .offset(d3.stackOffsetDiverging)
    //   (data);
    //
    // const margin = {top: 20, right: 30, bottom: 30, left: 60};
    // const width = 600, height = 500;
    // let svg = d3.select("app-cash-flow-diagram").append("svg")
    //     .attr('width', width)
    //     .attr('height', height)
    //     .attr('margin', margin);
    //
    // // var svg = d3.select("app-cash-flow-diagram").append("svg"),
    // //   margin = {top: 20, right: 30, bottom: 30, left: 60},
    // //   width = +svg.attr("width"),
    // //   height = +svg.attr("height");
    //
    // let x = d3.scaleBand()
    //   .domain(data.map(function(d) { return d.month; }))
    //   .rangeRound([margin.left, width - margin.right])
    //   .padding(0.1);
    //
    // let y = d3.scaleLinear()
    //   // .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
    //   .domain([-80, d3.max(series, stackMax)])
    //   .rangeRound([height - margin.bottom, margin.top]);
    //
    // let z = d3.scaleOrdinal(d3.schemeCategory10);
    //
    // svg.append("g")
    //   .selectAll("g")
    //   .data(series)
    //   .enter().append("g")
    //   .attr("fill", function(d) { return z(d.key); })
    //   .selectAll("rect")
    //   .data(function(d) { return d; })
    //   .enter().append("rect")
    //   .attr("width", x.bandwidth)
    //   .attr("x", function(d) { return x(d.data.month); })
    //   .attr("y", function(d) {
    //     return y(0);
    //   }) // setting this to 0 produces bars that are below the y axis, so this likely means that bars are drawn "top down"
    //   // .attr("y", function(d) { return y(d.data.bananas); })
    //   .attr("height", function(d) { return y(d.data.apples); });
    //   // .attr("y", function(d) { return y(d[1]); })
    //   // .attr("height", function(d) { return y(d[0]) - y(d[1]); });
    //
    // svg.append("g")
    //   .attr("transform", "translate(0," + y(0) + ")")
    //   .call(d3.axisBottom(x));
    //
    // svg.append("g")
    //   .attr("transform", "translate(" + margin.left + ",0)")
    //   .call(d3.axisLeft(y));
    //
    // function stackMin(serie) {
    //   return d3.min(serie, function(d) { return d[0]; });
    // }
    //
    // function stackMax(serie) {
    //   return d3.max(serie, function(d) { return d[1]; });
    // }

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
