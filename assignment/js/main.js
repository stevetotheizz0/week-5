/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */


var markersToRemove = [];

var removeMarkers = function(markersToRemove) {
    _.each(markersToRemove, function (removeIt) {
      map.removeLayer(removeIt);
    });
};


var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


$(document).ready(function() {
  // Do your stuff here
  $('#text-label1').text('Dataset URL:');
  $('#text-label2').text('Latitude:');
  $('#text-label3').text('Longitude:');
  $("button").text("Place Markers");

  $('#text-input1').prop('disabled',false);
  $('#text-input2').prop('disabled',false);
  $('#text-input3').prop('disabled',false);


  $('button').click(function(){
    removeMarkers(markersToRemove);
    var downloadData = $.ajax($("#text-input1").val());
    var lat = $('#text-input2').val();
    var lon = $('#text-input3').val();

    var parseData = function(ajaxResponseValue) {
      console.log("Parse");
      return JSON.parse(ajaxResponseValue);
    };

    var makeMarkers = function(makeData) {
      console.log("Make Markers");
      return _.map(makeData, function(feature){
        return  L.marker([parseFloat(feature[lat]), parseFloat(feature[lon])]);
      });
    };

    var plotMarkers = function(markersToPlot){
      console.log("Plot Markers");
      return _.map(markersToPlot, function(markery){
        return L.marker(markery._latlng).addTo(map);});
    };

      downloadData.done(function(data) {
        var parsed = parseData(data);
        var markers =  makeMarkers(parsed);
        var plotted = plotMarkers(markers);
        markersToRemove = plotted;
        return markersToRemove;
      });

  });

});
