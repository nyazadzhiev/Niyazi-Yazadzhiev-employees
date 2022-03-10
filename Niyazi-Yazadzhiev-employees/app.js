const file = document.getElementById("file");
const button = document.getElementById("confirm");
const employees = []; 

function calculateDays(start1, end1, start2, end2) {
    const startDate1 = new Date(start1);
    const endDate1 = new Date(end1);
    const startDate2 = new Date(start2);
    const endDate2 = new Date(end2);

    const start = startDate1 < startDate2 ? startDate2 : startDate1;
    const end = endDate1 < endDate2 ? endDate1 : endDate2;

    if(end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    return 0;
}

function getCouples(data) {
    let result = [];

    for(let i = 0; i < data[0].length; i++){
        for(let j = i + 1; j < data[0].length; j++){
            if(data[0][i].ProjectID == data[0][j].ProjectID) {
                let workedDays = calculateDays(data[0][i].DateFrom, data[0][i].DateTo, data[0][j].DateFrom, data[0][j].DateTo);
                const info = {
                    empl1: data[0][j].EmpID,
                    empl2: data[0][i].EmpID,
                    project: data[0][j].ProjectID,
                    days: workedDays
                };
                result.push(info);
                console.log(data[0][j].EmpID + " " + data[0][i].EmpID);
            }
        }
    }

    return result;
}

function nullCheck(data) {
    var today = new Date();

    for(let i = 0; i < data[0].length; i++){
        if(data[0][i].DateTo === " NULL") {
            data[0][i].DateTo = today.getFullYear()+'-'+(today.getMonth() > 9 ? today.getMonth()+1 : '0' + (today.getMonth()+1))+'-'+today.getDate();
        }
    }
}

button.addEventListener('click', () => {
    Papa.parse(file.files[0],
    {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(result){
            employees.push(result.data);
            nullCheck(employees);

            document.getElementById("res").innerHTML = `<p><strong>${JSON.stringify(getCouples(employees), undefined, '\n')}</strong></p>`
        }
    })
});