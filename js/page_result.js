/**
 * Function that should be called whenever the user is about to go to the result page.
 */
function page_result_enter()
{
	chartEmotionsSolvingtime();
	
}

function chartEmotionsSolvingtime()
{
	Highcharts.theme = {
			   colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
			      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
			   chart: {
			      backgroundColor: 'rgba(0,0,0,0)',
			      borderRadius: 15,
			   },
			   title: {
			      style: {
			         color: '#000000',
			         font: 'bold 1.5em Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			      }
			   },
			   xAxis: {
			      lineColor: '#000000',
			      lineWidth: 1,
			      tickColor: '#000000',
			      labels: {
			         style: {
			            color: '#000000',
			            fontWeight: 'bold'
			         }
			      },
			      title: {
			         style: {
			            color: '#1E90FF	',
			            font: '1.3em Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			         }
			      }
			   },
			   yAxis: {
				  lineColor: '#000000',
				  lineWidth: 1,
				  tickColor: '#000000',
				  tickWidth: 1,
			      labels: {
			         style: {
			            color: '#000000',
			            fontWeight: 'bold'
			         }
			      },
			      title: {
			         style: {
			            color: '#1E90FF	', //dodgerblue
			            font: '1.3em Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			         }
			      }
			   },
			   legend: {
			      itemStyle: {
			         color: '#000000',
			         font: '1.5em Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			      },
			      itemHoverStyle: {
			         color: '#1E90FF'
			      },
			      itemHiddenStyle: {
			         color: '#000000'
			      }
			   },
			   labels: {
			      style: {
			         color: '#F00'
			      }
			   },
			   tooltip: {
			      backgroundColor: {
			         linearGradient: [0, 0, 0, 50],
			         stops: [
			            [0, 'rgba(96, 96, 96, .8)'],
			            [1, 'rgba(16, 16, 16, .8)']
			         ]
			      },
			      borderWidth: 0,
			      style: {
			         color: '#FFF'
			      }
			   },


			   plotOptions: {
			      line: {
			         dataLabels: {
			            color: '#CCC'
			         },
			         marker: {
			            lineColor: '#333'
			         }
			      },
			      spline: {
			         marker: {
			            lineColor: '#333'
			         }
			      },
			      scatter: {
			         marker: {
			            lineColor: '#333'
			         }
			      },
			      candlestick: {
			         lineColor: 'white'
			      }
			   },

			   toolbar: {
			      itemStyle: {
			         color: '#CCC'
			      }
			   },

			   navigation: {
			      buttonOptions: {
			         backgroundColor: {
			            linearGradient: [0, 0, 0, 20],
			            stops: [
			               [0.4, '#606060'],
			               [0.6, '#333333']
			            ]
			         },
			         borderColor: '#000000',
			         symbolStroke: '#C0C0C0',
			         hoverSymbolStroke: '#FFFFFF'
			      }
			   },

			   exporting: {
			      buttons: {
			         exportButton: {
			            symbolFill: '#55BE3B'
			         },
			         printButton: {
			            symbolFill: '#7797BE'
			         }
			      }
			   },

			   // scroll charts
			   rangeSelector: {
			      buttonTheme: {
			         fill: {
			            linearGradient: [0, 0, 0, 20],
			            stops: [
			               [0.4, '#888'],
			               [0.6, '#555']
			            ]
			         },
			         stroke: '#000000',
			         style: {
			            color: '#CCC',
			            fontWeight: 'bold'
			         },
			         states: {
			            hover: {
			               fill: {
			                  linearGradient: [0, 0, 0, 20],
			                  stops: [
			                     [0.4, '#BBB'],
			                     [0.6, '#888']
			                  ]
			               },
			               stroke: '#000000',
			               style: {
			                  color: 'white'
			               }
			            },
			            select: {
			               fill: {
			                  linearGradient: [0, 0, 0, 20],
			                  stops: [
			                     [0.1, '#000'],
			                     [0.3, '#333']
			                  ]
			               },
			               stroke: '#000000',
			               style: {
			                  color: 'yellow'
			               }
			            }
			         }
			      },
			      inputStyle: {
			         backgroundColor: '#333',
			         color: 'silver'
			      },
			      labelStyle: {
			         color: 'silver'
			      }
			   },

			   navigator: {
			      handles: {
			         backgroundColor: '#666',
			         borderColor: '#AAA'
			      },
			      outlineColor: '#CCC',
			      maskFill: 'rgba(16, 16, 16, 0.5)',
			      series: {
			         color: '#7798BF',
			         lineColor: '#A6C7ED'
			      }
			   },

			   scrollbar: {
			      barBackgroundColor: {
			            linearGradient: [0, 0, 0, 20],
			            stops: [
			               [0.4, '#888'],
			               [0.6, '#555']
			            ]
			         },
			      barBorderColor: '#CCC',
			      buttonArrowColor: '#CCC',
			      buttonBackgroundColor: {
			            linearGradient: [0, 0, 0, 20],
			            stops: [
			               [0.4, '#888'],
			               [0.6, '#555']
			            ]
			         },
			      buttonBorderColor: '#CCC',
			      rifleColor: '#FFF',
			      trackBackgroundColor: {
			         linearGradient: [0, 0, 0, 10],
			         stops: [
			            [0, '#000'],
			            [1, '#333']
			         ]
			      },
			      trackBorderColor: '#666'
			   },

			   // special colors for some of the demo examples
			   legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
			   legendBackgroundColorSolid: 'rgb(70, 70, 70)',
			   dataLabelsColor: '#444',
			   textColor: '#E0E0E0',
			   maskColor: 'rgba(255,255,255,0.3)'
			};

			// Apply the theme
			var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
	
	
	chart = new Highcharts.Chart({
        chart: {
            renderTo: 'result_graph',
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Emotions versus solving time'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Time to solve a riddle (seconds)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Emotions (%)'
            }
        },
        tooltip: {
            formatter: function() {
                    return ''+
                    this.x +' sec, '+ this.y +' %';
            }
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Happy',
            color: 'rgba(255, 215, 0, .75)',
            data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                [170.0, 59.0], [159.1, 47.6]]

        }, {
            name: 'Relaxed',
            color: 'rgba(0, 128, 0, .75)',
            data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                [181.5, 74.8], [184.0, 86.4], [184.5, 78.4]]
        }, {
            name: 'Energetic',
            color: 'rgba(255, 15, 0, .75)',
            data: [[154.0, 45.6], [165.3, 81.8], [173.5, 90.7], [196.5, 42.6], [197.2, 48.8],
                [141.5, 64.8], [144.0, 76.4], [124.5, 58.4]]
        },{
            name: 'Confident',
            color: 'rgba(30,144,255, .75)',
            data: [[151.2, 61.6], [157.5, 69.0], [169.5, 59.2], [167.0, 73.0], [185.8, 53.6],
                [160.0, 49.0], [189.1, 77.6]]

        }]
    });
}


/**
 * Function that should be called whenever the user leaves the result page.
 */
function page_result_exit()
{
	
}




function viewDialog()
{
	
}



function eraseDialog()
{
	
}