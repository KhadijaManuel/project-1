<template>
    <div id="piechart"></div>
</template>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js">
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){[api data]} // This is where the API data will be inserted

var options ={
    title: 'Pie Chart'
};

var chart = new google.visualization.PieChart(document.getElementById('piechart'));
chart.draw(data, options);

</script>


    <div id="piechart_values" style="width: 900px; height: 500px;"></div>

<!-- try to put all this in html tags -->