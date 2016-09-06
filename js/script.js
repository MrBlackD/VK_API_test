	var friends;
	var people;
	var users=document.getElementById("users");
	var container=document.getElementById("container");
	var FUCK=0;
	var MARRY=1;
	var KILL=2;
	var stage=FUCK;
	
	var labels=["FUCK","MARRY","KILL"];
	
	var first_clicked=false;
	var second_clicked=false;
	var third_clicked=false;
	var target=1;//0 - по городу, 1 - по друзьям

window.onload=function(){

	

	getThreePeople();
	
	
	users.onclick=function(){
		if(!logged_in)
			return;
		VK.Api.call('users.search', {city:user.city,sex:(3-user.sex),count:1000,offset:2,fields:"photo_200_orig,photo_100,sex,city"}, function(r) {
			if(r.response) {
				friends=r.response;
				console.log(friends);
				for(var i in friends){
					if(i==0)
						continue;
					var img=document.createElement("IMG");
					if(friends[i].sex!=user.sex)
						img.setAttribute('src',friends[i].photo_100);
					container.appendChild(img);
					console.log(friends[i].first_name);
				}
			}
		});
	}
	
	
	document.getElementById("next").onclick=function(){
		getThreePeople();
	}
	
	document.getElementById("ready").onclick=function(){
		getThreePeople();
	}
	
	document.getElementById("cancel").onclick=refresh;
	
}

function getThreePeople(){
	
	
	
	if(!logged_in)
		return;

	off_rnd=0;
	if(target){
		VK.Api.call('users.search', {sex:(3-user.sex),count:1000,fields:"photo_200_orig,photo_100,photo_max,photo_max_orig,sex,city",from_list:"friends"}, function(r) {
			if(r.response) {
				console.log(r.response);
				refresh();
				people=r.response;
				//console.log(people);
				first_index=parseInt(1+Math.random()*(people.length-1));
				
				second_index=-1;
				while(second_index==first_index||second_index==-1)
					second_index=parseInt(1+Math.random()*(people.length-1));
				
				third_index=-1;
				while(third_index==first_index||third_index==second_index||third_index==-1)
					third_index=parseInt(1+Math.random()*(people.length-1));
				//console.log(people[first_index]);
				console.log(people[first_index].uid+" "+people[second_index].uid+" "+people[third_index].uid);
					
				var first_img=document.getElementById("first");
				first_img.setAttribute('src',people[first_index].photo_max);
				
				var second_img=document.getElementById("second");
				second_img.setAttribute('src',people[second_index].photo_max);
				
				var third_img=document.getElementById("third");
				third_img.setAttribute('src',people[third_index].photo_max);
				
				first_img.onclick=click;
				second_img.onclick=click;
				third_img.onclick=click;
				
			}
		});	
	}else{
		VK.Api.call('users.search', {city:user.city,sex:(3-user.sex),count:1000,fields:"photo_200_orig,photo_100,photo_max,photo_max_orig,sex,city"}, function(r) {
			if(r.response) {
				console.log(r.response);
				refresh();
				people=r.response;
				//console.log(people);
				first_index=parseInt(1+Math.random()*(people.length-1));
				
				second_index=-1;
				while(second_index==first_index||second_index==-1)
					second_index=parseInt(1+Math.random()*(people.length-1));
				
				third_index=-1;
				while(third_index==first_index||third_index==second_index||third_index==-1)
					third_index=parseInt(1+Math.random()*(people.length-1));
				//console.log(people[first_index]);
				console.log(people[first_index].uid+" "+people[second_index].uid+" "+people[third_index].uid);
					
				var first_img=document.getElementById("first");
				first_img.setAttribute('src',people[first_index].photo_max);
				
				var second_img=document.getElementById("second");
				second_img.setAttribute('src',people[second_index].photo_max);
				
				var third_img=document.getElementById("third");
				third_img.setAttribute('src',people[third_index].photo_max);
				
				first_img.onclick=click;
				second_img.onclick=click;
				third_img.onclick=click;
				
			}
		});		
	}
	
	
}

function refresh(){
	stage=FUCK;
	document.getElementById("label_span").innerHTML="Choose someone to FUCK";
	document.getElementById("first_span").innerHTML="";
	document.getElementById("second_span").innerHTML="";
	document.getElementById("third_span").innerHTML="";
	//document.getElementById("next").classList.add("disabled");
	document.getElementById("ready").setAttribute("style","display:none");
	document.getElementById("first").onclick=click;
	document.getElementById("second").onclick=click;
	document.getElementById("third").onclick=click;
}

function click(){
	if(stage>=KILL)
		return;
	this.onclick=function(){};


	this.nextElementSibling.innerHTML=labels[stage];
	
	stage++;
	
	document.getElementById("label_span").innerHTML="Choose someone to "+labels[stage];
 
	
	if(stage>MARRY){
		if(document.getElementById("first_span").innerHTML=="")
			document.getElementById("first_span").innerHTML=labels[stage];
		if(document.getElementById("second_span").innerHTML=="")
			document.getElementById("second_span").innerHTML=labels[stage];
		if(document.getElementById("third_span").innerHTML=="")
			document.getElementById("third_span").innerHTML=labels[stage];
		//document.getElementById("next").classList.remove("disabled");
		document.getElementById("ready").setAttribute("style","display:inline-block");
		//setTimeout(getThreePeople(),3000);
	}
		
}