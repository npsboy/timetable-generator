

let page_1 = " \
<style> \
    body{ background-image: url(\"https://www.topuniversities.com/sites/default/files/styles/articles_inline/public/articles/lead-images/10_exam_preparation_tips.jpg.webp\");}\
    </style>\
    <div id=\"center\">\
        <br><br><br>\
        <h1 style=\"font-size:60px;color:rgb(10, 10, 10)\">Timetable Generator</h1>\
        <br>\
        <div id=\"details-0\">\
            <input type=\"text\" id=\"sub-0-n\" name=\"sub-0-n\" value=\"Subject-0\">\
            <input type=\"date\" id=\"sub-0-d\" name=\"sub-0-d\" >\
            <input type=\"range\" id=\"sub-0-dif\" name=\"sub-0-dif\" min=\"1\" max=\"5\">\
        </div>\
        <br> <br>\
        <p id=\"details-adder\"></p>\
\
        <input type=\"button\" value=\" + \" onclick=\"msg()\">\
        <br> <br>\
        <input type=\"button\" value=\"submit\" onclick=\"make_timetable()\">\
    </div>\
"
let page_2 = "\
<style> \
body{ background-image: url(\"https://cdn.pixabay.com/photo/2020/09/24/16/50/board-5599231_1280.png\");}\
</style>\
\
<div id=\"center\"> \
<br><br><br><br> <br><br><br><br><br><br><br>\
<p style=\"font-size:60px;font-weight: bold\">Loading</p>\
<img src=\"https://www.kksfmidwest.org/mr2017/img/loading.gif\" alt=\"loading\" style=\"width:150px; display: inline;\">\
</div>\
<div id=\"center\"><div id=\"display\"></div></div>\
"
let page_3 = "\
<style> \
body{ background-image: url(\"https://cdn.pixabay.com/photo/2020/09/24/16/50/board-5599231_1280.png\");}\
</style>\
<br> <br> <br> <br>\
<div id=\"center\">\
\
<div id=\"display\"></div>\
\
<br> <br> <input type=\"button\" value=\"Edit\" onclick=\"restart()\">\
</div>\
"


document.getElementById("page").innerHTML = page_1


function show_load() {
    document.getElementById("page").innerHTML = page_2

    setTimeout(function() {
        document.getElementById("page").innerHTML = page_3
    }, 3000);

}


let num_of_details = 0;
let details_in_adder = ""

let details = "\
\
<div id=\"details-" + num_of_details + "\">\
    \
    <input type=\"text\" id=\"sub-" + num_of_details + "-n\" name=\"sub-" + num_of_details + "-n\" value=\"Subject-" + num_of_details + "\">\
    \
    <input type=\"date\" id=\"sub-" + num_of_details + "-d\" name=\"sub-" + num_of_details + "-d\" >\
    \
    <input type=\"range\" id=\"sub-" + num_of_details + "-dif\" name=\"sub-" + num_of_details + "-dif\" min=\"1\" max=\"5\">\
    \
</div>\
    <br> \
";




function msg(){
    num_of_details = num_of_details + 1;
    let vals = []
    let vals_push = []
    let index

    if (num_of_details>1) {
        
    
        for (index = 1; index<num_of_details; index++) { 
            vals_push
            vals_push[0] = document.getElementById("sub-" + index + "-n").value
            vals_push[1] = document.getElementById("sub-" + index + "-d").value
            vals_push[2] = document.getElementById("sub-" + index + "-dif").value
            vals[index] = vals_push.slice()

            details_in_adder = details_in_adder + "\
            \
            <div id=\"details-" + index + "\">\
                \
                <input type=\"text\" id=\"sub-" + index + "-n\" name=\"sub-" + index + "-n\" value=\"" +  vals[index][0]  + "\">\
                \
                <input type=\"date\" id=\"sub-" + index + "-d\" name=\"sub-" + index + "-d\" value=\"" +  vals[index][1]  + "\" >\
                \
                <input type=\"range\" id=\"sub-" + index + "-dif\" name=\"sub-" + index + "-dif\" min=\"1\" max=\"5\"  value=\"" +  vals[index][2]  + "\" >\
                \
            </div>\
                <br> \
            ";
            console.log("index = " + index)
            console.log("sub = " + document.getElementById("sub-" + index + "-n").value)
        }
        console.log("vals = " + vals)

    }

    details = "\
\
<div id=\"details-" + num_of_details + "\">\
    \
    <input type=\"text\" id=\"sub-" + num_of_details + "-n\" name=\"sub-" + num_of_details + "-n\" value=\"Subject-" + num_of_details + "\">\
    \
    <input type=\"date\" id=\"sub-" + num_of_details + "-d\" name=\"sub-" + num_of_details + "-d\" >\
    \
    <input type=\"range\" id=\"sub-" + num_of_details + "-dif\" name=\"sub-" + num_of_details + "-dif\" min=\"1\" max=\"5\">\
    \
</div>\
    <br> \
";

    //details_in_adder = document.getElementById("details-adder").innerHTML ; 
    
    


    document.getElementById("details-adder").innerHTML = details_in_adder + details;

}

let dates = []
let days_to_last_exam = 0
var sub_remaining = []
const mil_sec_in_day = 86400000;
let days_for_each = []

//--------------------------------
let today = new Date();
today.setHours(0,0,0,0); //<== withouth this, the getTime function will get the exact current time instead of the time at midnight
//--------------------------------



function rearange_dates(){

    let add_cycle = 0
    let date_push = document.getElementById("sub-" + add_cycle + "-d").value.slice()
    let sub_push = document.getElementById("sub-" + add_cycle + "-n").value.slice()
    let date_sub_array = []
    
    while (add_cycle <= num_of_details) {

        date_push = document.getElementById("sub-" + add_cycle + "-d").value.slice()
        sub_push = document.getElementById("sub-" + add_cycle + "-n").value.slice()

        
        date_sub_array[0] = date_push
        date_sub_array[1] = sub_push

        dates[add_cycle] = date_sub_array.slice() 

        add_cycle = add_cycle + 1
    }
   
    dates.sort();

    days_to_last_exam = (new Date(dates[num_of_details][0]).getTime() - today.getTime()) / mil_sec_in_day
    days_to_last_exam = Math.round(days_to_last_exam)

    make_basic_tt()

}

function find_sub_remaining(input_date) {

    let index
    let push
    let temp,temp_2

    sub_remaining = []

    for (index = 0; index < dates.length; index++) { 
        temp = new Date(dates[index][0]).setHours(0,0,0,0)
        temp_2 = input_date.getTime()

        if (  temp > input_date.getTime() ) {
   

            push = dates[index][1]
            sub_remaining.push(push)

        }

    }

} 

function make_basic_tt() {
  
    let index
    let mil_sec_add = 0
    let x = new Date (today.getTime() + mil_sec_add)
    let y

    show_load()
    setTimeout(function() {
        for (index = 0; index < days_to_last_exam; index++) {
            mil_sec_add = mil_sec_in_day * index
            x = new Date (today.getTime() + mil_sec_add)
            find_sub_remaining(x)
            
            console.log("on day: " + x.toDateString() + "you need to study: " + sub_remaining[0])
            
            y = document.getElementById("display").innerHTML
            document.getElementById("display").innerHTML = y + "<p style=\"font-size:30px;\">" + ("on " + x.toDateString() + ", you need to study: " + sub_remaining[0]) + "</p>" + "<br>"
        }
    }, 3000);

    //document.getElementById("display").innerHTML = document.getElementById("display").innerHTML + "<br> <br>" + "<input type=\"button\" value=\"edit\" onclick=\"make_timetable()\">"
   
}

function restart() {
    document.getElementById("page").innerHTML = page_1
}

function make_timetable(){
    dates = []
    sub_remaining = []
    days_for_each = []
    rearange_dates()
    //show_load()
    
}
