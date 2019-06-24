var zingData1 = [[],[],[]];
var zingData2 = [[],[],[]];
(function(){
	var chartData1={"type":"line"};

	var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope) {
		$scope.populationData = [{'reproduce':[{'reproduce':'90.0%'},{'reproduce':'85.0%'},{'reproduce':'85.0%'}]},{'offspring':[{'offspring':'2.78'},{'offspring':'3.0'},{'offspring':'4.0'}]},{'adulthood':[{'adulthood':'80.0%'},{'adulthood':'82.0%'},{'adulthood':'62.3%'}]},{'population':[{'initialPopulation':'100000'},{'initialPopulation':'2'},{'initialPopulation':'2'}]}];
	    $scope.createGraphData = function(){
	    	this.graphData = []; 
	    	for(var i=0;i<500;i++){
	    		if(i==0){
	    			this.graphData.push([{'generation':(i)},
	    								 {'noOfIndividual':
		    								 [parseInt($scope.populationData[3].population[0].initialPopulation), parseInt($scope.populationData[3].population[1].initialPopulation), parseInt($scope.populationData[3].population[2].initialPopulation)]
		    							 },
		    							 {'grandTots': 0},
	    								 {'eachGroupTotalPopulation':[]}
	    								 ]);

	    			this.graphData[0][2].grandTots = (this.graphData[0][1].noOfIndividual[0])+(this.graphData[0][1].noOfIndividual[1])+(this.graphData[0][1].noOfIndividual[2]);

	    			this.graphData[0][3].eachGroupTotalPopulation.push(((this.graphData[0][1].noOfIndividual[0])/(this.graphData[0][2].grandTots)*100),
	    								 ((this.graphData[0][1].noOfIndividual[1])/(this.graphData[0][2].grandTots)*100).toFixed(1),
	    								 ((this.graphData[0][1].noOfIndividual[2])/(this.graphData[0][2].grandTots)*100).toFixed(1));
	    		}
	    		else{
		    		this.graphData.push([{'generation':(i+1)},
		    			{'noOfIndividual':
		    					[(0.5*(this.graphData[i-1][1].noOfIndividual[0])*(parseFloat(this.populationData[0].reproduce[0].reproduce)/100)*this.populationData[1].offspring[0].offspring*(parseFloat(this.populationData[2].adulthood[0].adulthood)/100)),
		    					(0.5*(this.graphData[i-1][1].noOfIndividual[1])*(parseFloat(this.populationData[0].reproduce[1].reproduce)/100)*this.populationData[1].offspring[1].offspring*(parseFloat(this.populationData[2].adulthood[1].adulthood)/100)),
		    					(0.5*(this.graphData[i-1][1].noOfIndividual[2])*(parseFloat(this.populationData[0].reproduce[2].reproduce)/100)*this.populationData[1].offspring[2].offspring*(parseFloat(this.populationData[2].adulthood[2].adulthood)/100))]
		    			},
		    			{'grandTots':0},
		    			{'eachGroupTotalPopulation':[]}
		    			]);

		    		this.graphData[i][2].grandTots = this.graphData[i][1].noOfIndividual[0]+this.graphData[i][1].noOfIndividual[1]+this.graphData[i][1].noOfIndividual[2];

	    			this.graphData[i][3].eachGroupTotalPopulation.push(((this.graphData[i][1].noOfIndividual[0])/(this.graphData[i][2].grandTots)*100),
	    								 ((this.graphData[i][1].noOfIndividual[1])/(this.graphData[i][2].grandTots)*100).toFixed(1),
	    								 ((this.graphData[i][1].noOfIndividual[2])/(this.graphData[i][2].grandTots)*100).toFixed(1));
		    	}
	    	}
	    };
	    $scope.keyPressAction = function($event){
	    	var key = $event.keyCode;
    		if(key == 13){
    			this.createGraphData();
    		}
	    };
	    $scope.drawGraph = function(){
	    	zingData1 = [[],[],[]];
	    	zingData2 = [[],[],[]];
	    	for(var k=0;k<3;k++){
	    		for(var i=0;i<$scope.graphData.length;i++){
	    			var yData1 = $scope.graphData[i][3].eachGroupTotalPopulation[k];
		    		var xData1 = $scope.graphData[i][0].generation;

		    		var xValue1 = (xData1)/(500/360);
		    		var yValue1 = (yData1)/(100/250);
		    		var tempD1 = $('#graph2').find('#path'+(k+1)).attr('d');
		    		if(i==0){
		    			$('#graph2 #path'+(k+1)).attr('d','M'+xValue1+' '+yValue1+' ');
		    		}
		    		else $('#graph2 #path'+(k+1)).attr('d',tempD1+'L'+xValue1+' '+yValue1+' ');

		    		var yData2 = $scope.graphData[i][1].noOfIndividual[k];
		    		var xData2 = $scope.graphData[i][0].generation;

		    		zingData1[k].push([xData2,yData2]);
		    		zingData2[k].push([xData1,yData1]);
		    	}
	    	}
	    	chartData1={
			    "type":"line",  // Specify your chart type here.
			    "globals":{
			    	"font-family":"Arial"
			    },
			    'background-color': 'transparent',
			    "title": {
			 	  "text": 'Total # of individuals for each group',
			 	  "font-size":"18px",
			 	},
			    "plotarea":{ 
			      "margin-right" : "40px","margin-left" : "30px","margin-bottom" : "44px","margin-top" : "46px",
			    },
			    "scale-y": {
				    "progression": "log",
				    "log-base": 10,
				    "exponent":false,
				    "label":{
				 	   "text":""
				 	},
				 },
			    "scale-x": {
				    "label":{
				 	   "text":"Generation"
				 	},
				 	"values":"1:501:50"
				 },
				  "plot":{
				    "aspect":"spline",
				    "line-width":4,
				    "tooltip":{
				      "visible":false
				    }
				  },
			    "series":[  // Insert your series data here.
			        { "values": zingData1[0],"line-color":"rgb(79, 129, 189)",},{ "values": zingData1[1],"line-color":"rgb(192, 80, 77)",},{ "values": zingData1[2],"line-color":"rgb(155, 187, 89)",}
			    ]
			  };
			zingchart.render({ // Render Method[3]
			    id:'visualL',
			    data:chartData1,
			    height:340,
			    width:390
			  });

			rearrangeScaleToScientificNotation();
			function rearrangeScaleToScientificNotation(){
				var scaleYItem = $('#visualL-svg').find(".visualL-graph-id0-scale-y-item");
				scaleYItem.each(function(index, el){
					var scaleValues = $(el).find('tspan').text();
					if(scaleValues.length > 11){
						$(el).find('tspan').text(parseInt(scaleValues).toExponential());
						var eleWidth = $(el)[0].getBBox().width;
						var xPos = parseFloat($('#visualL-graph-id0-scale-y-path').attr('d').split(' ')[1]);
						$(el).find('tspan').attr('x',xPos-eleWidth-6);
					}
				});
			}
	    };
	    $scope.$watch('graphData', $scope.drawGraph, true);
	});
})();

gridFunction();
function gridFunction()
{
	var gridPath = '';
	/*for(var i=0; i<=7; i++)
	{
		var x = 50+(65*i);
		gridPath += "M"+x+" 470";
		gridPath += "L"+x+" 19";
	}
	$('#gridX_'+0).attr('d',gridPath).attr('opacity','0.5');
	gridPath='';*/
	for(var j=0; j<10; j++){
		var y = 1+(25*j);
		if(j%2==0){
			 y = 1+(25*j);
				//y=y + 0.5;
		}
		gridPath += "M0 "+y+" ";
		gridPath += "L360 "+y+" ";
		$('#yt_'+j).attr('y',y+5);
	}	
	$('#gridY_'+0).attr('d',gridPath);
	
	y = 1+(25*10)+0.5;
	$('#yt_10').attr('y',y);
	gridPath='';
	
	for(var i=0;i<11;i++)
	{
		var x = 1+(34.7*i);
		$('#xt_'+i).attr('x',x);
	}
	for(var i=0;i<50;i++)
	{
		var x1 = 14.4+(7*i);
		gridPath += "M"+x1+" "+250+" ";
		gridPath += "L"+x1+" "+255+" ";
	}
	$('#gridX_'+0).attr('d',gridPath);
}