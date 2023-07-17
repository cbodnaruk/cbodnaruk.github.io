var current_page = 0
var inputs = {}
function initial_setup(){
    
for (let i = 0; i < form_items.length; i++){
    if (form_items[i].hasOwnProperty('input_ids')) {
    for (let j = 0; j < form_items[i].input_ids.length; j++){
    inputs[form_items[i].input_ids[j]] = ""
}}}

}

function load_page(){
var page_title = form_pages[current_page]["title"]
var page_content = ""
    for (let i = 0; i < form_items.length; i++) {
        if (form_items[i].page_id == current_page) {
            page_content += `<div>${form_items[i].content}</div>`
        }
    }


$("#q_heading").text(page_title)
$("#q_content").html(page_content)

load_values()
if (current_page == form_pages.length-1) {
    $("#next_back").html('<button onclick="form_back()">Back</button>')
    $("#next_back").append('<button onclick="form_submit()">Submit</button>')
}else if (current_page > 0){
    $("#next_back").html('<button onclick="form_back()">Back</button>')
    $("#next_back").append('<button onclick="form_next()">Next</button>')
} else {
    $("#next_back").html('<button onclick="form_next()">Next</button>')
}

}
function form_next(){
    save_values()
    console.log(form_pages[current_page+1].condition())
    if (form_pages[current_page+1].condition()){
        current_page -= 1
    }
    current_page += 2

    load_page()
}
function form_back(){
    save_values()
    if (form_pages[current_page-1].condition()){
        current_page += 1
    }
    current_page -= 2

    load_page()
}

function form_reset(){
    location.reload()
}

function form_submit(){
    save_values()
    var hourslist = calculate_hours()
    var hoursstring = ""
    for (i = 0; i < hourslist.length; i++){
        console.log(`${hourslist[i].paycode} x ${hourslist[i].count}`)
        hoursstring += `<p>${hourslist[i].paycode} x ${hourslist[i].count}</p>`
    }
load_results(hoursstring)
}
function load_results(content){
    var page_title = "Results"
    var page_content = ""
page_content = `<div><span class="results">${content}</span></div><div><span class="results_note">${marking_notes}</span></div><div><span class="results_note">${contact_call}</span></div>`
    
    $("#q_heading").text(page_title)
    $("#q_content").html(page_content)
    load_values()

    $("#next_back").html('<button onclick="form_reset()">Start Over</button>')

}

function save_values(){
    for (let i = 0; i < form_items.length; i++){
        if (form_items[i].page_id == current_page){
            if (form_items[i].hasOwnProperty('input_ids')) {
            for (let j = 0; j < form_items[i].input_ids.length; j++){
                inputs[form_items[i].input_ids[j]] = $(`#${form_items[i].input_ids[j]}`).val()
                console.log($(`#${form_items[i].input_ids[j]}`).val())
    }}}}

}
function load_values(){
    for (let i = 0; i < form_items.length; i++){
        if (form_items[i].page_id == current_page){
            if (form_items[i].hasOwnProperty('input_ids')) {
            for (let j = 0; j < form_items[i].input_ids.length; j++){
                 $(`#${form_items[i].input_ids[j]}`).val(inputs[form_items[i].input_ids[j]])
    }}}}
}
