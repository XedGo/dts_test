// 路径配置
require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist'
    }
});

// 使用
require(
    [
        'echarts',
        'echarts/chart/line',
        'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById('main'));

        var option = {
            title : {
                text: 'AAAAAAA',
                //subtext: '纯属虚构'
            },
            tooltip: {
                show: true
            },
            legend: {
                data:['Bugs2']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    //saveAsImage : {show: true}
                }
            },
             xAxis : [
                {
                    type : 'category',
                    data : [],
                    axisLabel:{
                        interval:0,
                        rotate:45,//倾斜度 -90 至 90 默认为0
                        margin:2,
                        textStyle:{
                            fontWeight:"bolder",
                            color:"#000000"
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [{name:'',type:'bar',data:[],
            itemStyle: {
                        normal: {
                            label: {
                                show: true,//是否展示
                                //position:'inside'
                            }
                        }},
            }]
        };

        $(function() {
            $('tr td a').bind('click', function() {
                //alert($(this).closest('tr').find('td:eq(1)').text());
              $.getJSON("/productdatas", {
                    product: $(this).closest('tr').find('td:eq(1)').text(),
                },function(data) {
                 //alert(data.date);
                 option.xAxis[0].data = data.date;
                 option.series[0].name = data.name;
                 option.series[0].data = data.data;
                 option.title.text='问题单每日报表';
                 myChart.clear();//清空绘画内容，清空后实例可用
                 myChart.hideLoading();//清除无数据时动画显示
                 myChart.setOption(option,true);
                 //myChart.setSeries(data.data);
                });
            });
        });
    }
);