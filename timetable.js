

let page_1 = " \
<style> \
    body{ background-image: url(\"https://www.topuniversities.com/sites/default/files/styles/articles_inline/public/articles/lead-images/10_exam_preparation_tips.jpg.webp\");}\
    </style>\
    <div id=\"center\">\
        <br><br><br>\
        <h1 style=\"font-size:60px;color:rgb(10, 10, 10)\">Timetable Generator</h1>\
        <br>\
        <p id=\"details-adder\"></p>\
        <br>\
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
let page_3 = " <input type=\"button\" value=\"Edit\" onclick=\"restart()\"> <div id='calendar'></div> "


document.getElementById("page").innerHTML = page_1


function show_load() {
    document.getElementById("page").innerHTML = page_2

    setTimeout(function() {
        document.getElementById("page").innerHTML = page_3
    }, 3000);

}


let num_of_details = -1;
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

    if (num_of_details>0) {
        
        details_in_adder = ""
        for (index = 0; index<num_of_details; index++) { 
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
            if (index == 0) {
               details_in_adder = details_in_adder + "<br>"
            }
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
let timetable = []
let extra_dates = []
let days_wanted = []



//--------------------------------
let today = new Date();
today.setHours(0,0,0,0); //<== withouth this, the getTime function will get the exact current time instead of the time at midnight
//--------------------------------



function rearange_dates(){

    let add_cycle = 0
    let date_push = document.getElementById("sub-" + add_cycle + "-d").value.slice()
    let sub_push = document.getElementById("sub-" + add_cycle + "-n").value.slice()
    let dif_push = document.getElementById("sub-" + add_cycle + "-dif").value.slice()

    let date_sub_array = []
    
    while (add_cycle <= num_of_details) {

        date_push = document.getElementById("sub-" + add_cycle + "-d").value.slice()
        sub_push = document.getElementById("sub-" + add_cycle + "-n").value.slice()
        dif_push = document.getElementById("sub-" + add_cycle + "-dif").value.slice()
        
        date_sub_array[0] = date_push
        date_sub_array[1] = sub_push
        date_sub_array[2] = dif_push

        dates[add_cycle] = date_sub_array.slice() 

        add_cycle = add_cycle + 1
    }
   
    dates.sort();

    days_to_last_exam = (new Date (new Date(dates[num_of_details][0]).setHours(0,0,0,0)).getTime() - (today.getTime() + mil_sec_in_day)) / mil_sec_in_day
    days_to_last_exam = Math.round(days_to_last_exam)


    //make_basic_tt()
    find_days_for_each()
    
}

//input date should be in date format
function find_sub_remaining(input_date) {

    let index
    let push
    let temp,temp_2

    sub_remaining = []

    for (index = 0; index < dates.length; index++) { 
        temp = new Date(dates[index][0]).setHours(0,0,0,0)
        temp_2 = input_date.getTime()

        if (  temp > input_date.getTime() ) {
   

            push = dates[index]
            sub_remaining.push(push)

        }

    }

} 



function find_days_for_each() {

    find_sub_remaining(today)

    let total_dif = 0
    let x = 0
    let push_list = []

    for (let index = 0; index < sub_remaining.length; index++) {
        total_dif = total_dif + Number (sub_remaining[index][2])
        
    }
    console.log("total_dif is = " + total_dif)

    x = days_to_last_exam / total_dif
    
    for (let index = 0; index < sub_remaining.length; index++) {
        push_list[0] = sub_remaining[index][1]
        push_list[1] = Math.round ( x * sub_remaining[index][2] );
        
        days_for_each[index] = push_list.slice()
    }
    console.log("days for each are  = " + days_for_each )

    assign_dates()
}


//function special_round(input) {
//    if (input < input+0.5) {
//        return( Math.round(input) )
//    } else {    
//       return(Math.round(input - 0.5)) 
//    }
//   
// }


function find_days_between(date_1, date_2) {
    


    if (date_1 == today) {
        return Math.round( (new Date(date_2).getTime() - today.getTime()) / mil_sec_in_day )
    } else {
        return Math.round( (new Date(date_2).getTime() - new Date(date_1).getTime()) / mil_sec_in_day )
    }
    
}

function assign_dates() {
    let day = 0
    let tt_push = []
    let extra = 0
    let debug_find_days
    let no_of_subjects = sub_remaining.length

    // the index below is for subject number
    for (let index = 0; index < no_of_subjects; index++) {

               
        // first index is for each subject. subject one will come when the index is at 1 etc.
        if (index == 0) {

             
            if ( find_days_between(today, new Date (sub_remaining[index][0]))  <=   (days_for_each[index][1]) )  {
                
                //mil sec in day subtracted so that it doesn't assign the subject on date of exam
              
                for (let index_2 = 0; day < new Date (new Date (sub_remaining[index][0]).getTime() - mil_sec_in_day).setHours(0,0,0,0); index_2++) {
                    

                    day = new Date (today.getTime() + index_2 * mil_sec_in_day)
                    tt_push[0] = day
                    tt_push[1] = sub_remaining[index][1]
                    timetable[index_2] = tt_push.slice()         
                }
                console.log("timetable is = " + timetable)

            } else {

                // extra variable finds out the number of extra days

                extra = extra + find_days_between(new Date (today.getTime() + mil_sec_in_day), new Date (sub_remaining[index][0])) - (days_for_each[index][1])
                

                //adds it into extra_dates
                day = new Date (today.getTime() + mil_sec_in_day)
                
                let testing123 = new Date (today.getTime() + mil_sec_in_day + ( (extra * mil_sec_in_day) ) )

                for (let index_4 = 0; day < new Date (today.getTime() + mil_sec_in_day + ( (extra * mil_sec_in_day) ) ); index_4++) {
                    
                    day = new Date (today.getTime() + mil_sec_in_day + (index_4 * mil_sec_in_day) )
                    extra_dates.push(day)
                    day = new Date (day.getTime() + mil_sec_in_day)
                } 
                console.log("extra dates are = " + extra_dates)
                //assigns days for study into timetable

                debug_find_days = new Date (new Date (sub_remaining[index][0]).getTime() - mil_sec_in_day)
                debug_find_days.setHours(0,0,0,0)
                for (let index_3 = extra; day < new Date (new Date (sub_remaining[index][0]).getTime() - mil_sec_in_day).setHours(0,0,0,0); index_3++) {
                    
                    day = new Date (today.getTime() + mil_sec_in_day + index_3 * mil_sec_in_day)
                    tt_push[0] = day
                    tt_push[1] = sub_remaining[index][1]
                    timetable[index_3-extra] = tt_push.slice()       
                }
                console.log("timetable is = " + timetable)
            }
            
            day = new Date (day.getTime() + mil_sec_in_day)

        }else {

           
            let wanted_sub_array = []
            
            if ( find_days_between(day, new Date (sub_remaining[index][0]))  <=   (days_for_each[index][1]) )  {
                
                if (find_days_between(day, new Date (sub_remaining[index][0]))  <   (days_for_each[index][1]) && extra_dates.length >= 1) {
                    wanted_sub_array[0] = sub_remaining[index][1]
                    wanted_sub_array[1] =  (days_for_each[index][1]) - find_days_between(day, new Date (sub_remaining[index][0]))
                    wanted_sub_array[2] = parseInt(sub_remaining[index][2])
                    wanted_sub_array[3] = sub_remaining[index][0]
                    //wanted_sub_array format: subject-name, days-wanted, difficulty, date-of-exam
                
                    days_wanted[ days_wanted.length ] = wanted_sub_array.slice()
                }

                //mil sec in day subtracted so that it doesn't assign the subject on date of exam           
                for (let index_2 = 0; day < new Date (new Date (sub_remaining[index][0]).getTime() - mil_sec_in_day).setHours(0,0,0,0); index_2++) {
                    
                    if (index_2==0) {
                        day = day

                    }else{
                        day = new Date (day.getTime() + mil_sec_in_day)
                    }
                    
                    tt_push[0] = day
                    tt_push[1] = sub_remaining[index][1]
                    timetable[timetable.length] = tt_push.slice()         
                }
                console.log("timetable is = " + timetable)

            } else {

                extra = find_days_between(day, new Date (sub_remaining[index][0])) - (days_for_each[index][1])
                
                if (index < sub_remaining.length - 1) {

                //adds it into extra_dates
                let extra_dates_end = new Date (day.getTime() + ( (extra * mil_sec_in_day) - mil_sec_in_day) )
                extra_dates_end.setHours(0,0,0,0)
                let og_day = day
                for (let index_4 = 0; day < new Date(extra_dates_end.getTime() + mil_sec_in_day); index_4++) {
                    
                    day = new Date (og_day.getTime() + (index_4 * mil_sec_in_day) )
                    extra_dates.push(day)
                    day = new Date (day.getTime() + mil_sec_in_day)

                } 
                console.log("extra dates are = " + extra_dates)  
                }else{
                    day = new Date (day.getTime() -  mil_sec_in_day)   
                }   
                
                //assigns days for study into timetable
                for (let index_3 = 1; day < new Date (new Date (sub_remaining[index][0]).getTime()).setHours(0,0,0,0); index_3++) {
                    
                    tt_push[0] = day
                    tt_push[1] = sub_remaining[index][1]
                    timetable[timetable.length] = tt_push.slice() 
                    day = new Date (day.getTime() +  mil_sec_in_day)   
                       
                }
                console.log("timetable is = " + timetable)

            }
            day = new Date (day.getTime() + mil_sec_in_day)

        }
    }
    assign_extra()
}

function find_if_extra(x_date) {
    let i = 0;
    while (i < extra_dates.length) {
      let date = extra_dates[i];
      if ( ( new Date (date.getTime()) ).setHours(0,0,0,0) == ( new Date (x_date.getTime()) ).setHours(0,0,0,0)) {
        return true;
      }
      i = i + 1;
    }
    return false;
}

function isSameDate(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

function assign_extra() {
    //rearange array in descending order of difficulty
    //check how many days the most difficult one neads
    //allot the available days closest to that subject to it (till it is sattisfied)
    //repeat 
    days_wanted.sort(function(a, b) {
        return b[2] - a[2];
    });
    
    for (; days_wanted.length >= 1 ;) {
        
        let boss = days_wanted[0][0]
        let boss_wants = days_wanted[0][1]
        let boss_exam_date = new Date(days_wanted[0][3]) 
        let check_date = new Date (boss_exam_date.setHours(0,0,0,0))

        for (let index = 1; index <= boss_wants; index++) {
            for (;find_if_extra(check_date) == false && check_date > new Date (today.getTime() + mil_sec_in_day);) {
            check_date = new Date(check_date.getTime() - mil_sec_in_day)
            }
            extra_dates = extra_dates.filter(date => !isSameDate(date, check_date))
            let tt_push_extra = []
            tt_push_extra[0] = check_date
            tt_push_extra[1] = boss
            timetable[timetable.length] = tt_push_extra.slice()
        }
        days_wanted.shift()

    }

    display_dates()
}

function formatDateToString(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Note: getMonth() returns 0-based index, so we add 1
    let day = date.getDate();

    // Pad single-digit months and days with a leading zero if necessary
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return year + '-' + month + '-' + day;
}

function getRandomLowSaturationColor() {
    // Define the base color in RGB
    let baseColor = [0x6c, 0xcc, 0x86]; // Equivalent to #6ccc86

    // Define a range for variation (e.g., +/- 20)
    let variation = 70;

    // Generate random values within the variation range
    let red = baseColor[0] + Math.floor(Math.random() * (variation * 2 + 1)) - variation;
    let green = baseColor[1] + Math.floor(Math.random() * (variation * 2 + 1)) - variation;
    let blue = baseColor[2] + Math.floor(Math.random() * (variation * 2 + 1)) - variation;

    // Ensure values are within valid RGB range (0-255)
    red = Math.max(0, Math.min(255, red));
    green = Math.max(0, Math.min(255, green));
    blue = Math.max(0, Math.min(255, blue));

    // Construct the color string in hexadecimal format
    let color = '#' + red.toString(16).padStart(2, '0') +
                        green.toString(16).padStart(2, '0') +
                        blue.toString(16).padStart(2, '0');

    return color;
}

let subjectColors = new Map();

// Function to get a subject's color
function getSubjectColor(subject) {
    // If the subject already has a color assigned, return it
    if (subjectColors.has(subject)) {
        return subjectColors.get(subject);
    } else {
        // Generate a random low saturation color for the subject
        let color = getRandomLowSaturationColor();
        // Store the color for the subject
        subjectColors.set(subject, color);
        return color;
    }
}

function display_dates() {
    show_load()
    setTimeout(function() { 
        console.log(formatDateToString(timetable[0][0]))
        var calendarEl = document.getElementById('calendar');

        let events_var =  []
        let events_push
        let previous_subject = timetable[0][1]
        
        //sub_remaining format: exam_date, name, difficulty
       for (let index = 0; index < sub_remaining.length; index++) {
        
        events_push = { 
            title: (sub_remaining[index][1]) + " Exam Today",
            start: sub_remaining[index][0],
            backgroundColor: "#f02222",
            borderColor: "#f02222",
        } 
    
        events_var.push({ ...events_push })
        previous_subject = timetable[index][1]
        
       }
       for (let index = 0; index < timetable.length; index++) {
        
        events_push = { 
            title: 'Study ' + (timetable[index][1]),
            start: formatDateToString(timetable[index][0]),
            backgroundColor: getSubjectColor(timetable[index][1]),
            borderColor: getSubjectColor(timetable[index][1]),
        } 
    
        events_var.push({ ...events_push })
        previous_subject = timetable[index][1]
        
       }
       
        
        var calendar = new FullCalendar.Calendar(calendarEl, {
          timeZone: 'IST',
      //    initialView: 'listMonth',
          initialView: 'dayGridMonth',
          // customize the button names,
          // otherwise they'd all just say "list"
          views: {
            listDay: { buttonText: 'list day' },
            listWeek: { buttonText: 'list week' },
            listMonth: { buttonText: 'list month' },
            listYear: { buttonText: 'list year'}
          },
      
          headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridDay,dayGridWeek,dayGridMonth,dayGridYear'
          },
          //events: 'https://fullcalendar.io/api/demo-feeds/events.json'
      
          
          events: events_var
        
      
      
        });
        calendar.render();

    }, 3000);
}

//useless currently
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
    document.getElementById("details-adder").innerHTML = details_in_adder
}

function make_timetable(){
    let vals_push = []
    let vals = []
    details_in_adder = ""
    for (index = 0; index<=num_of_details; index++) { 
       
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
        if (index == 0) {
            details_in_adder = details_in_adder + "<br>"
         }
    }

   // details_in_adder = ({ ...details_in_adder })
    dates = []
    sub_remaining = []
    days_for_each = []
    days_for_each = []
    timetable = []
    extra_dates = []
    days_wanted = []
    rearange_dates()
    //show_load()
    
}
