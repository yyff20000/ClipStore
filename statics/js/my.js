var NAV_STATE = true;

function search(){
    var keyword = document.getElementById("search_form").value;
    // 清空navbar
    document.getElementById("v-pills-tab").innerHTML = '';

    // console.log(keyword);
    if(!keyword){
        alert("search not null !");
        return ;
    }
    $.get("search.php?key="+encodeURIComponent(keyword), function(data, status){
        // console.log(data);
        if(data['code']==-1){
            alert("Something is wrong...");
        }else{
            // document.getElementById("web_page").setAttribute("style","width: 100%;margin-top: 50%");
            document.getElementById("web_page").setAttribute("style","width: 100%;");

            if(data['count']==0){
                document.getElementById("tbody").innerHTML = "";
                var node = document.createElement("tr");
                node.setAttribute("id","tr")
                document.getElementById("tbody").appendChild(node);
                var td = document.createElement("td");
                td.innerHTML = "Nothing Found !";
                td.className = "text-center";
                // td.setAttribute("class","text-center");
                document.getElementById("tr").appendChild(td);
            }
            else{
                var i = 0;
                // clear tbody
                document.getElementById("tbody").innerHTML = "";
                data['msg'].forEach(element => {
                    // console.log(element);
                    // create new tr
                    var node = document.createElement("tr");
                    node.setAttribute("id","tr_"+i);
                    node.setAttribute("style","height:80px; cursor:pointer");
                    node.setAttribute("onclick","toPage('"+transferQuotes(element)+"')");
                    document.getElementById("tbody").appendChild(node);
                    var td = document.createElement("td");
                    
                    td.innerText = element;
                    // td.className = "text-center";
                    td.setAttribute("style","padding-left: 3%");
                    td.setAttribute("class","ml-25");
                    document.getElementById("tr_"+i).appendChild(td);

                    // add to Nav Content
                    showNavNullContent(element,i);
                    i++;
                });
            }
        }
    //   alert("Data: " + data + "\nStatus: " + status);
    });
    
}

function getKey(){
    var search = document.getElementById("search_form");
    return_keys = new Array();
    keys = search.value.split(' ');
    keys.forEach(element => {
        if(element[0] == '-'){
            // console.log(element);
        }else{
            if(element[0]=='+'){
                element = element.slice(1);
            }
            return_keys.push(element);
        }
    });
    return return_keys;
}

function toPage(path){
    document.getElementById('vertical_nav_bar').setAttribute("style","display: false");
    document.getElementById('vertical_null_bar').setAttribute("style","display: false");

    document.getElementById('web_page').setAttribute("style","width: 87%; margin-top: auto");


    document.getElementById("pills-contact").innerHTML = "";
    
    // console.log(basic_path+path);

    basic_path = "./articles/";
    full_path = basic_path+path;
    // alert(basic_path+path);
    // console.log(basic_path+path);
    
    // 检查是否存在iframe
    if($("#iframe_node").length>0){
        // 已存在
        $("#iframe_node").attr("src",full_path);
    }else{
        // 新建
        var iframe_node = document.createElement('iframe');
        if (full_path.split('.').pop()=="mhtml"){
            iframe_node.setAttribute("src","mhtml://" + full_path);
        }else{
            iframe_node.setAttribute("src", full_path);
        }
        
        iframe_node.setAttribute("id",'iframe_node')
        iframe_node.setAttribute("class",'w-100 h-100');
        iframe_node.setAttribute("style","width:90%;border:0px");
        document.getElementById("pills-contact").appendChild(iframe_node);
        $("#pills-contact-tab").click();    
    }


    // document.getElementById("pills-upload-tab").focus();
}

window.onload = function(){
    document.onkeydown=function(event){
        var code = event.keyCode;
        if(code ==13){ //这是键盘的enter监听事件
            //绑定焦点，有可能不成功，需要多试试一些标签 
            search();
        }
    }
    document.getElementById('vertical_nav_bar').setAttribute("style","display: none");
    document.getElementById('vertical_null_bar').setAttribute("style","display: none");
    
    // home
    document.getElementById("pills-home-tab").addEventListener("click", function(){
        document.getElementById('vertical_nav_bar').setAttribute("style","display: none");
        document.getElementById('vertical_null_bar').setAttribute("style","display: none");
        document.getElementById('web_page').setAttribute("style","width: 100%; margin-top: auto");
    })
    // content
    document.getElementById("pills-contact-tab").addEventListener("click", function(){
        var xuwu = document.getElementById("xuwu");
        if(xuwu){
            return;
        }
        document.getElementById('vertical_nav_bar').setAttribute("style","display: false");
        document.getElementById('vertical_null_bar').setAttribute("style","display: false");
        document.getElementById('web_page').setAttribute("style","width: 87%; margin-top: auto");
    })
    // upload
    document.getElementById("pills-upload-tab").addEventListener("click", function(){
        document.getElementById('vertical_nav_bar').setAttribute("style","display: none");
        document.getElementById('vertical_null_bar').setAttribute("style","display: none");
        document.getElementById('web_page').setAttribute("style","width: 100%; margin-top: auto");
    })
    

}

function upload(){
    var formData = new FormData();
    formData.append('file',$('#customFile')[0].files[0]);
    $.ajax({
        url: './upload.php',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function(res) {
        alert(res);
        $('#customFile')[0].value = '';
    }).fail(function(res) {
        console.log(res);
    });
    // formData.append('file', $('#customFile')[0].files.forEach);
    
}

function navNullSwitch(){
    // if vav is open, close it
    if(NAV_STATE){
        document.getElementById('vertical_nav_bar').setAttribute("style","display: none");
        document.getElementById('web_page').setAttribute("style","width: 99%;margin-top: auto");
        document.getElementById('nav_null_icon').setAttribute("src","./statics/icon/right.svg");
        NAV_STATE = false;
    // if nav is close, open it
    }else{
        document.getElementById('vertical_nav_bar').setAttribute("style","display: false");
        document.getElementById('web_page').setAttribute("style","width: 87%;margin-top: auto");
        document.getElementById('nav_null_icon').setAttribute("src","./statics/icon/left.svg");
        NAV_STATE = true;
    }
}

function showNavNullContent(element,i){
    var node = document.createElement("a");
    node.setAttribute("id","nav_"+element);
    // node.setAttribute("style","height:80px; cursor:pointer");
    node.setAttribute("onclick","toPage('"+transferQuotes(element)+"')");
    if(i){
        node.setAttribute("class",'nav_content nav-link');
    }else{
        node.setAttribute("class",'nav_content nav-link active');
    }
    node.setAttribute("href",'#v-pills-home');
    node.setAttribute("data-toggle",'pill');
    node.setAttribute("role",'tab');
    node.setAttribute("aria-controls",'v-pills-home');
    node.setAttribute("aria-selected",'true');
    node.innerText = element;
    document.getElementById("v-pills-tab").appendChild(node);

    // var temp = '<a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" onclick="toPage(\''+element+'\')">Home</a>';
}

function transferQuotes(article){
    return article.replace("'","\\'");
}