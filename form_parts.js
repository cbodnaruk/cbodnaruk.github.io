var form_pages = [
{
    "title": "Welcome",
    "condition": function(){return true}
},
{
    "title": "Union Membership",
    "condition": function(){return true}
},
{
    "title": "Weekly Sessions",
    "condition": function(){return true}
},
{
    "title": "PhD",
    "condition": function(){return true}
},
{
    "title":"Marking Level",
    "condition": function(){return true}
},
{
    "title":"Lecture Type",
    "condition": function(){if(inputs.lecture_number>0){return true}else{return false}}
},
{
    "title":"Tutor Type",
    "condition": function(){if(inputs.tute_number>0){return true}else{return false}}
},
{
    "title": "Confirmation",
    "condition": function(){return true}
}
]
var form_items = [
    {"name": "welcome_content",
    "page_id": 0,
    "content": '<span class="content_text">Welcome to the USyd Casual Schedule Self-Check tool. We\'ll ask you a few questions and try to estimate what paycodes you should have in your schedule. If, after using this tool, you think your schedule might not be correct, we\'ll also give you the opportunity to get in touch with an enforcement committe to look into it properly with you.</span>'
},
{"name": "weekly_sessions_question",
"page_id": 2,
"content": '<span class="content_text">How many weekly sessions for tutorials and lectures (individual lectures, and any repeats per lecture) are you teaching each week?</span>'

},
{
    "name":"weekly_sessions_input",
    "page_id": 2,
    "content":'<span class="content_text">Different Lectures:  </span><input type="number" id="lecture_number"></input><br><span class="content_text">Repeats per Lecture:  </span><input type="number" id="lecture_rpt_number"></input><br><span class="content_text">Tutorials:  </span><input type="number" id="tute_number"></input>',
    "input_ids": ["lecture_number","tute_number","lecture_rpt_number"]
},
{
    "name":"weekly_sessions_note",
    "page_id":2,
    "content":'<span class="content_text">Repeats per lecture does not include the initial lecture.</span>'
},
{
    "name":"phd_question",
    "page_id": 3,
    "content":'<span class="content_text">Do you have a PhD?  </span><select id="phd_check"><option value="Yes">Yes</option><option value="No">No</option></select>',
    "input_ids": ["phd_check"]
},
{
    "name":"marking_hours_text",
    "page_id": 4,
    "content":'<span class="content_text">Marking for casuals is split into two categories. The higher category, "Supervisory Examiner" marking is, according to the latest guidelines from management, to be used when marking requires you to "exercise a significant level of academic judgement". It specifically lists two main scenarios, providing detailed feedback on work written at an honours or postgraduate level (4xxx and above), as well as working as the lead marker in a group of markers, or moderating the marking of an assessment (typically only necessary in much larger units). <br /> The other category, "Routine" marking, covers the rest of cases, namely all marking at 3xxx level and below. <br /> The union is fighting to expand the coverage of the higher category.</span>'
},
{  
    "name":"marking_hours_question",
    "page_id": 4,
    "content":'<span class="content_text">Based on the above description, which category do you believe your marking will fit into? </span><br><select id="marking_level"><option value="Routine">Routine</option><option value="Supervisor">Supervisor</option></select>',
    "input_ids":["marking_level"]
},
{
"name":"union_question",
"page_id": 1,
"content":'<span class="content_text">Are you a member of the NTEU?  </span><select id="union_check"><option value="Yes">Yes</option><option value="No">No</option></select>',
"input_ids": ["union_check"]
},
{
    "name":"lecute_type_text",
    "page_id": 5,
    "content": '<span class="content_text">There are two levels of pay for lectures that will likely be of relevance to casuals. The higher level covers the "Significant responsibility" category and "Developed lecture" category, and covers cases where a lecturer has unit coordination responsiblities, responsiblity for at least 50% of developing and delivering a unit of study, or a large part of a unit, as well as lecturing. Lecturing outside this is considered "Standard".</span>'
},{
    "name":"lecture_type_question",
    "page_id": 5,
    "content": '<span class="content_text">Based on the above description, which category do you believe your lecturing will fit into? </span><br><select id="lect_level"><option value="Standard">Standard</option><option value="Significant/Developed">Significant/Developed</option></select>',
    "input_ids":["lect_level"]
},
{
    "name":"tute_type_text",
    "page_id": 6,
    "content": '<span class="content_text">There are two levels of pay for instructors in small groups, Tutors and Demonstrators. Generally, supervision of practical exercises such as in labs, where no outside preparation (other than equipment setup) is required, will be classified at the Demonstrator rate. Classes where you are required to prepare content in advance, and will be teaching and expanding upon materials discussed in the lectures are paid at the Tutor rate. This includes classes where, for instance, problem sets are provided by the coordinator in advance. The NTEU believes there has been a substantial level of misclassification of casual in some parts of the university, who have been classified as Demonstrators where they should have been Tutors.</span>'
},{
    "name":"tute_type_question",
    "page_id": 6,
    "content": '<span class="content_text">Based on the above description, which category do you believe your teaching will fit into? </span><br><select id="tute_level"><option value="Tutor">Tutor</option><option value="Demonstrator">Demonstrator</option></select>',
    "input_ids":["tute_level"]
}
]

var marking_notes = "Notes on marking hours go here"
var contact_call = "If the results of this tool are different to your actual schedule, consider contacting the NTEU enforcement committee (add email?)"