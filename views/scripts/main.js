let misuratore = document.getElementById('misuratore')
let button = document.getElementById('submitBtn')
let dateFrom = document.getElementById('dateFrom')
let dateTo = document.getElementById('dateTo')
let isReport = document.getElementById('isReport')
let option = document.createElement("option");

option.value = "none"
option.text = "Seleziona un misuratore"
option.disabled = true
option.selected = true
option.hidden = true
misuratore.appendChild(option)

function checkForm() {
    if ((misuratore.value != "none" || isReport.checked) && dateFrom.value && dateTo.value)
        button.disabled = false

    if (isReport.checked) {
        misuratore.disabled = true
        option.text = "Report"
        isReport.value = "report"
    }
    else {
        isReport.value = "single"
        misuratore.disabled = false
        option.text = "Seleziona un misuratore"
    }

    if (!dateFrom.value || !dateTo.value)
        button.disabled = true
}

misuratore.addEventListener("change", checkForm)
dateFrom.addEventListener("change", checkForm)
dateTo.addEventListener("change", checkForm)
isReport.addEventListener("change", checkForm)