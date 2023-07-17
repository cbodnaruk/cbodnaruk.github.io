const paycodes = {
    "tutorial":1,
    "tutorialrpt":3,
    "lect":2,
    "marking":4
}
function calculate_hours(){
    var has_phd = (inputs.phd_check == "Yes")
    var has_tute = (inputs.tute_number > 0)
    var has_lect = (inputs.lecture_number > 0)
    var hours = []
    var phd_subt = 0
    var lect_subt = 0
    //tutorial and lecture hours
    
    if (!has_phd){
        phd_subt = 1
    }
    if (inputs.lect_level == "Standard"){
        lect_subt = 1
    }
    if (has_tute & inputs.tute_level == "Tutor"){
        hours.push(new Payline(`TU${paycodes.tutorial+phd_subt}`,12))
        hours.push(new Payline(`TU${paycodes.tutorialrpt+phd_subt}`,12*(inputs.tute_number-1)))
    } else if (has_tute & inputs.tute_level == "Demonstrator") {
        hours.push(new Payline(`DE${paycodes.tutorial+phd_subt}`,inputs.tute_number))
    }
    if (has_lect){
        hours.push(new Payline(`P0${paycodes.lect+lect_subt}`,13*inputs.lecture_number))
        if (inputs.lecture_rpt_number > 0){
        hours.push(new Payline("P04",13*(parseInt(inputs.lecture_rpt_number)+1)*inputs.lecture_number))}}

    if (inputs.marking_level == "Routine"){
        hours.push(new Payline(`M0${paycodes.marking+phd_subt}`,"N/A (See below)"))
    } else {
        hours.push(new Payline("M03","N/A (See below)"))
    }
    return(hours)
}
class Payline {
    constructor(paycode, count) {
        this.paycode = paycode
        this.count = count
    }
}
