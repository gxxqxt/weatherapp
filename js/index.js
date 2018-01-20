var weather;
var city;
$.ajax({
    url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
    dataType:"jsonp",
    type:"get",
    success:function(obj){
    	weather=obj.data.weather;
    }
	})
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
    type:"get",
    success:function(obj){
    	city=obj.data;
    }
})
function update(){
	// 当前城市
    var cityName=document.getElementsByClassName("header")[0];
    cityName.innerHTML=weather.city_name;
    // 当前温度
    var temperature=document.getElementsByClassName("wendu")[0];
    temperature.innerHTML=weather.current_temperature+"°";
    // 当前天气状况
    var condition=document.getElementsByClassName("tianqi")[0];
    condition.innerHTML=weather.current_condition;
    // 今日最高温
    var dat_high_temperature=document.getElementById("dat_high_temperature");
    dat_high_temperature.innerHTML=weather.dat_high_temperature;
    // 今日最低温
    var dat_low_temperature=document.getElementById("dat_low_temperature");
    dat_low_temperature.innerHTML=weather.dat_low_temperature;
    // 今日天气状况
    var day_condition=document.getElementById("day_condition");
    day_condition.innerHTML=weather.day_condition;
    // 今日天气图片
    var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`
    // 明日最高温
    var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
    // 明日最低温
    var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
    // 明日天气状况
    var tomorrow_condition=document.getElementById("tomorrow_condition");
    tomorrow_condition.innerHTML=weather.tomorrow_condition;
    // 明天天气图片
    var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`
    // 
    for(var i in weather.hourly_forecast){
    	// 创建父元素div
    	var now=document.createElement("div");
    	// 给父元素div加样式
    	now.className="now";
    	// 获取now的父元素
    	var nowp=document.getElementById("now");
    	// 把now插入到父元素中
    	nowp.appendChild(now);

    	var now_time=document.createElement("h2");
    	now_time.className="now_time";
    	now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
    	now.appendChild(now_time);

    	var now_icon=document.createElement("div");
    	now_icon.className="now_icon";
    	now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`
    	now.appendChild(now_icon);

    	var now_temperature=document.createElement("h2");
    	now_temperature.className="now_temperature";
    	now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
    	now.appendChild(now_temperature);
    }
    for(var j in weather.forecast_list){
    	// 创建父元素div
    	var recent=document.createElement("div");
    	// 给父元素div加样式
    	recent.className="recent";
    	// 获取now的父元素
    	var recentp=document.getElementById("recent");
    	// 把now插入到父元素中
    	recentp.appendChild(recent);

    	var recent_date=document.createElement("div");
    	recent_date.className="recent_date";
    	recent_date.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+(weather.forecast_list[j].date.substring(8));
        recent.appendChild(recent_date);

    	var recent_wea=document.createElement("h2");
    	recent_wea.className="recent_wea";
    	recent_wea.innerHTML=weather.forecast_list[j].condition;
    	recent.appendChild(recent_wea);

    	var recent_pic=document.createElement("div");
    	recent_pic.className="recent_pic";
    	recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`
    	recent.appendChild(recent_pic);

    	var recent_high=document.createElement("h3");
    	recent_high.className="recent_high";
    	recent_high.innerHTML=weather.forecast_list[j].high_temperature;
    	recent.appendChild(recent_high);

    	var recent_low=document.createElement("h4");
    	recent_low.className="recent_low";
    	recent_low.innerHTML=weather.forecast_list[j].low_temperature;
    	recent.appendChild(recent_low);

    	var recent_wind=document.createElement("h5");
    	recent_wind.className="recent_wind";
    	recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
    	recent.appendChild(recent_wind);

    	var recent_level=document.createElement("h6");
    	recent_level.className="recent_level";
    	recent_level.innerHTML=weather.forecast_list[j].wind_level;
    	recent.appendChild(recent_level);
        
       
    	
    }

    var header=document.getElementsByClassName("header")[0];
    var city_box=document.getElementsByClassName("city-box")[0];
    var con3=document.getElementsByClassName("con3")[0];
    var fifth=document.getElementsByClassName("fifth")[0];
    // 给header添加点击事件
    header.onclick=function(){
    	$(".text").val("");
    	$(".button").html("取消");
    	city_box.style="display:block";
    	// con3.style="display:none";
     //    fifth.style="display:none";
    }
    // 渲染城市
    for(var k in city){
        
        var cityp=document.getElementById("city");
    	var title=document.createElement("h1");
    	title.className="title";
    	title.innerHTML=k;
        cityp.appendChild(title);

        var con=document.createElement("div");
        con.className="con";
        for (var y in city[k]){
        	var erji=document.createElement("div");
        	erji.className="son";
        	erji.innerHTML=y;
        	con.appendChild(erji);
        }
        cityp.appendChild(con);
    }
}

// 查找个城市天气信息
function AJAX(str){
	$.ajax({
    url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
    dataType:"jsonp",
    type:"get",
    success:function(obj){
    	weather=obj.data.weather;
    	update();
    	$(".city-box").css({"display":"none"});
    	
    }
	})
}
window.onload=function(){
	update();
	$(".son").on("click",function(){
       var cityh=this.innerHTML;
       AJAX(cityh); 
	})

	// input获取焦点 button变确认
	$(".text").on("focus",function(){
		// html获取设置或改变元素的内容
		$(".button-box").html("确认");
	})

	// 操作按钮
	var button=document.getElementsByClassName("button-box")[0];
	
	button.onclick=function(){
		// 获取button中的内容
		var btn=this.innerHTML;
		if (btn=="取消") {
			var city_box1=document.getElementsByClassName("city-box")[0];
			city_box1.style="display:none";
		}
		else{
			var str=document.getElementsByClassName("text")[0].value;
			for(var i in city){
				if(i==str){
					AJAX(str);
					 //如果符合条件，打断执行 
					return;
				}
				else{
					for(var j in city[i]){
						if(j==str){
						AJAX(str);
						return;
					    }
					}
				}
			}
			alert("没有该城市气象信息");
		}
	}
}