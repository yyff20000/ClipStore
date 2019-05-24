function search(){
    var keyword = document.getElementById("search_form").value;
    // console.log(keyword);
    if(!keyword){
        alert("search not null !");
        return ;
    }
    $.get("search.php?key="+keyword, function(data, status){
        // console.log(data);
        if(data['code']==-1){
            alert("代码写错了...");
        }else{
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
                    console.log(element);
                    // create new tr
                    var node = document.createElement("tr");
                    node.setAttribute("id","tr_"+i);
                    node.setAttribute("style","height:80px; cursor:pointer");
                    node.setAttribute("onclick","toPage('"+element+"')");
                    document.getElementById("tbody").appendChild(node);
                    var td = document.createElement("td");
                    
                    td.innerText = element;
                    // td.className = "text-center";
                    td.setAttribute("style","padding-left: 3%");
                    td.setAttribute("class","ml-25");
                    document.getElementById("tr_"+i).appendChild(td);

                    i++;
                });
            }
        }
    //   alert("Data: " + data + "\nStatus: " + status);
    });
}


function toPage(path){
    document.getElementById("pills-contact").innerHTML = "";

    basic_path = "./articles/";
    var iframe_node = document.createElement('iframe');
    iframe_node.setAttribute("src",basic_path+path);
    iframe_node.setAttribute("class",'w-100 h-100');
    document.getElementById("pills-contact").appendChild(iframe_node);
    $("#pills-contact-tab").click();
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
}

