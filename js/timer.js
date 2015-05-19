require.config({
    packages: [
        {
            name: 'echarts',
            location: 'js',
            main: 'echarts'
        }
    ]
});

require(
    [
        'echarts',
        'echarts/chart/pie'
    ],
    function (ec) {
        //准备某个颜色的样式
        function getStyle(color) {
            return {
                normal : {
                    color: color,
                    label: {show:false},
                    labelLine: {show:false}
                },
                emphasis : {
                    color: color
                }
            };
        }
        //准备某一圈的样式
        function getSerie(color, radius) {
            return {
                type:'pie',
                clockWise: false,
                radius : radius,
                data : [
                    {
                        value : 0,
                        itemStyle : getStyle('rgba(0,0,0,0)')
                    },
                    {
                        value : 1,
                        itemStyle : getStyle(color)
                    }
                ]
            };
        }
        //图表设置
        var option = {
            //图表标题
            title: {
                text: '某时钟',
                subtext: 'By: Cat73\nQQ: 1901803382',
                x: 'center',
                y: 'center',
                itemGap: 20,
                textStyle : {
                    color : 'rgba(30,144,255,0.8)',
                    fontFamily : '微软雅黑',
                    fontSize : 32,
                    fontWeight : 'bolder'
                }
            },
            //图表设置
            series : [
                getSerie('rgba(30,144,255,0.8)', [126, 150]),
                getSerie('rgba(144,255,30,0.8)', [101, 125]),
                getSerie('rgba(255,30,144,0.8)', [75, 100])
            ]
        };
        //初始化
        var myChart = ec.init(document.getElementById('main'));
        myChart.setOption(option);
        //循环loop
        setInterval(loop, 1000);
        
        function loop() {
            var date = new Date();
            var hour = date.getHours(), minutes = date.getMinutes(), second = date.getSeconds();

            hour = hour == 0 ? 24 : hour;
            minutes = minutes == 0 ? 60 : minutes;
            second = second == 0 ? 60 : second;

            option.series[0].data[1].value = second;
            option.series[0].data[0].value = 60 - second;
            option.series[1].data[1].value = minutes;
            option.series[1].data[0].value = 60 - minutes;
            option.series[2].data[1].value = hour;
            option.series[2].data[0].value = 24 - hour;
            
            myChart.setOption(option);
        }
    }
);
