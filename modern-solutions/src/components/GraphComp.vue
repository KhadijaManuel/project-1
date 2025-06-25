<template>
    <div id="bar-graph"></div>
</template>

<script type="text/javascript">
// import { onMounted } from 'vue';
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([ ]);
    
        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        var options = {
            title: 'Graph',
            width: 900,
            height: 500,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true
        };

        var chart = new google.visualization.BarChart(document.getElementById('bar-graph'));
        chart.draw(view, options);
    }
</script>

<div id="bar-graph_values" styel="width: px; height: px;"></div>