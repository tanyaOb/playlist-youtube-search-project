//After the API loads search box will be enabled. Function - handleAPILoaded()

var nextPT=""; //Next page
var prevPT=""; //Previous page
var q="eminem"; //The search key
var listV=[]; 
var idv=['icB-DPmdaPw','j5-yKhDd64s','YVkUvmDQ3HY','RQ9_TKayu9s','JByDbPn6A1o'];
var k=0;

function handleAPILoaded() {
   $('#search-button').attr('disabled', false);
}

//Get id of YouTube videos
function VideoGetId(l){
  $('#query').val(q);
  idlist=idv;
  result1=idlist[l];
  var onepart="http://www.youtube.com/v/";
  var secondpart="?version=3&enablejsapi=1";
  var result2=onepart.concat(result1,secondpart);
  $('#video_list'+''+l+'').html('<pre><iframe id="player" type="text/html" width="570" height="390" src='+result2+' frameborder="0"></iframe></pre>'); 
}

//Search for a specified key word
function search() {
  gapi.client.load('youtube', 'v3', function(){
	gapi.client.setApiKey('AIzaSyCTR0j0I5qoD-JSN9Pc0O4CUVtqmsBy4Ts');
	idv=[];
    q=$('#query').val();
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet',
      maxResults: '5',
      type: 'video',
      topicId: '/m/0d6lp'
    });
    request.execute(function(response) {
    $('video_list1').append(response);
    var np=JSON.stringify(response.result.nextPageToken).toString();
    nextPT=np.substr(1,(np.length-2));
    console.log(nextPT);
    for (var i=0;i<5;i++){  
       if (!response.result.items[i].id.videoId){console.log("No items found")}
       else{
            var result0=JSON.stringify(response.result.items[i].id.videoId).toString();
            var result1=result0.substr(1,(result0.length-2));
            idv[i]=result1+"?";
            var onepart="http://www.youtube.com/v/";
            var secondpart="?version=3&enablejsapi=1";
            var result2=onepart.concat(result1,secondpart);
            console.log(result2);
            $('#video_list'+''+i+'').html('<pre><iframe id="player"  type="text/html" width="570" height="390" src='+result2+' frameborder="0"></iframe></pre>'); 
            var download_url='https://www.youtube.com/watch?v=';
            var download_url_all=download_url.concat(download_url,result1);  
        }}
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
});
}

function nextPageButton(){
  if (NextPT=null){alert('the end of response');}
  var request=gapi.client.youtube.search.list({
  q: q,
  pageToken:nextPT,
  part: 'snippet',
  maxResults: '5',
  type: 'video'
  });
  request.execute(function(response) {
    idv=[];
    var np=JSON.stringify(response.result.nextPageToken).toString();
    var pp=JSON.stringify(response.result.prevPageToken).toString();
    nextPT=np.substr(1,(np.length-2));
    prevPT=pp.substr(1,(pp.length-2));
    console.log(nextPT);
    for (var i=0;i<5;i++){   
        if (!response.result.items[i].id.videoId){console.log("No items found");}
        else{
             var result0=JSON.stringify(response.result.items[i].id.videoId).toString();
             var result1=result0.substr(1,(result0.length-2));
             idv[i]=result1;
             var onepart="http://www.youtube.com/v/";
             var secondpart="?version=3&enablejsapi=1";
             var result2=onepart.concat(result1,secondpart);
             console.log(result2);
              $('#video_list'+''+i+'').html('<pre><iframe id="player"  type="text/html" width="570" height="390" src='+result2+' frameborder="0"></iframe></pre>'); 
    }}
   });
}

function prevPageButton(){
 var request=gapi.client.youtube.search.list({
  q: q,
  pageToken:prevPT,
  part: 'snippet',
  maxResults: '5',
  type: 'video'
  });
  request.execute(function(response){
     var np=JSON.stringify(response.result.nextPageToken).toString();
     if (response.result.prevPageToken==null){}
     else{
     idv=[];
     var pp=JSON.stringify(response.result.prevPageToken).toString();
     prevPT=pp.substr(1,(pp.length-2));}
     nextPT=np.substr(1,(np.length-2));
     for (var i=0;i<5;i++){
	      var result0=JSON.stringify(response.result.items[i].id.videoId).toString();
          var result1=result0.substr(1,(result0.length-2));
          idv[i]=result1;
          var onepart="http://www.youtube.com/v/";
          var secondpart="?version=3&enablejsapi=1";
          var result2=onepart.concat(result1,secondpart);
          console.log(result2);
          $('#video_list'+''+i+'').html('<pre><iframe id="player"  type="text/html" width="570" height="390" src='+result2+' frameborder="0"></iframe></pre>'); 
    }});
}

function getVideoId(v)
{
  var vi=idv[v];
  return vi;
}

//Add video in playlist
function addtoPlaylist(value){
  var vId=value;
  listV.push(vId);
  var download_url='https://www.youtube.com/watch?v=';
  var download_url_all=download_url.concat(vId);
  var onepart1="http://www.youtube.com/v/";
  var secondpart2="?version=3&enablejsapi=1";
  var result2=onepart1.concat(vId,secondpart2);
  var b=k;
  console.log("The value of vid"+vId);
  console.log(result2);
  $('#videolist0').append('<div class="block_all" id="block_all_delete'+b+'"><div class="block1" id=playlist_element'+b+'><iframe id="player'+
  b+'" width="330" height="220" src='+result2+' frameborder="0"></iframe></div><div class="block2"><form action="http://savefrom.net/index.php" method="get" target="_blank"><input type="hidden" name="url" value="'+download_url_all+
  '"/><button id="downloadButton'+b+'" style="width:100px;height:50px" onclick="" >Download</button></form><button id="deleteButton'+b+'" style="width:100px;height:50px" onclick="onDelete('+b+'); this.remove()" value="'+vId+'">Delete</button></div></div>')
  k++;
}

//Delete video from playlist
function onDelete(valueID){
  var i=valueID;
  var vs='player';
  var fd='downloadButton';
  var bd='deleteButton';
  var bad='block_all_delete';
  var vs2=vs.concat(i);
  var fd2=fd.concat(i);
  var bd2=bd.concat(i);
  var bad2=bad.concat(i);
  var z=document.getElementById(bd2);
  var a=x=document.getElementById(bad2).remove();
  var indexE=listV.indexOf(z);
  listV.splice(indexE, 1);
}

//Below are functions related for managing cookies
function set_cookie(name, value, expires){
  var path;
  document.cookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires : "") +
      ((path) ? "; path=" + path : "");
}

function get_cookie(name){
  var matches = document.cookie.match(new RegExp(
  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function delete_cookies(){
  for(var m=0; m<document.cookie.length;m++){
      var nameC="video"+m;
      $.removeCookie(nameC);
    }
  var idvlist=idv;
  for (var r=0; r<idvlist.length; r++){
       var nameV="videoSet"+r;
       $.removeCookie(nameV);
    }
  save_cookie_video();
}

function save_cookie_video(){ 
  var listSV=[];
  listSV=listV;
  var query;
  query="query";
  query_value=q;
  save_cookie(query, query_value);
  for (var i=0; i<listSV.length; i++){
       var name1="video"+i;
       var tmp1=listSV[i];
       save_cookie(name1, tmp1);
   }
  var idvlist=idv;
  for (var a=0; a<idvlist.length; a++){
       var name2="videoSet"+a;
       var tmp2=idvlist[a];
       save_cookie(name2, tmp2);
	   }
}

function save_cookie(name, tmp){
  if (name===null){}
  else {
         expires=new Date();
         expires.setTime(expires.getTime()+(1000*86400*365));
         set_cookie(name, tmp, expires);
         console.log("Cookies were saved");
    }
}

function write_cookie(){
  console.log("The videolist is: "+listV);
  console.log("Cookies were writen");
  var listWV=[];
  listWV=listV;
  for (var i=0; i<listWV.length; i++){
  var key="video"+i;
  document.write(listWV);
  alert("Cookies: "+get_cookie(key));
  }
}

function output_cookies2(){
  var keyQuery="query";
  q=(get_cookie(keyQuery));
  idv=[];
  for (var j=0; j<document.cookie.length; j++){
  var name="videoSet"+j;
  if (get_cookie(name)==null){}
  else{
         idv[j]=(get_cookie(name));
    }
   }
   return idv;
}

function output_cookies(){
  for (var j=0; j<document.cookie.length; j++){
  var name="video"+j;
  if (get_cookie(name)==null){}
  else{
         addtoPlaylist(get_cookie(name));
    }
   }
}




