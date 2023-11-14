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

    details_in_adder = document.getElementById("details-adder").innerHTML ;     
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
    let date_push = document.getElementById("sub-" + add_cycle + "-d").value
    let sub_push = document.getElementById("sub-" + add_cycle + "-n").value
    let date_sub_array = []
    
    while (add_cycle <= num_of_details) {

        date_push = document.getElementById("sub-" + add_cycle + "-d").value
        sub_push = document.getElementById("sub-" + add_cycle + "-n").value

        
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


    for (index = 0; index < days_to_last_exam; index++) {
        mil_sec_add = mil_sec_in_day * index
        x = new Date (today.getTime() + mil_sec_add)
        find_sub_remaining(x)
    
        console.log("on day: " + x + "you need to study: " + sub_remaining[0])
    }
   
}

function make_timetable(){

    dates = []
    sub_remaining = []
    days_for_each = []
    rearange_dates()
    
}
