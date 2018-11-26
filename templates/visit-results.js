const view = (data) => {
    const firstObj = data[Object.keys(data)[0]][0];

    console.log({x: firstObj})
    const date = new Date(firstObj.visit_created_at);
    
    const patientName = firstObj.patient_name;
    const patientGender = firstObj.patient_gender.replace(/\b\w/g, l => l.toUpperCase());


    const visitDate = date.getDate()+  '/' + (date.getMonth()+1) + '/' + date.getFullYear();
    const visitTime = date.getHours() + ':' + date.getMinutes();


    const labName = data.labName || "معمل الحياة";
    return `
        <h1 style="text-align:center">${labName}<//h1>
        <table border="1">
            <tr>
                <td>Visit date</td>
                <td>${visitDate}</td>
                <td>Visit time</td>
                <td>${visitTime}</td>
            </tr>
            <tr>
                <td>Patient name:</td>
                <td>${patientName}</td>
                <td>Gender</td>
                <td>${patientGender}</td>
            </tr>
        </table>
        <hr>
        <table border="1">
            <tr><td>Test name</td><td>Test items</td></tr>
            ${getTests(data)}
        </table>
    `;
}

function getTests(data){
    let res = '';
    Object.keys(data).forEach(key => {
        res += `<tr>`;

        res += `<td>` + data[key][0].test_name  +`</td>`

        res += `<td>${getItems(data[key])}</td>`;
        
        res +=`</tr>`;
    })
    return res;
}



/**
 * 
 * @param {Array} data items 
 */
function getItems(data){
    let res = `<table border='1'>
        <tr>
            <td>Item name</td>
            <td>result</td>
            <td>Normal range </td>
        </tr>
    `;

    data.forEach(item => {
        res += '<tr>';
        res +=  '<td>' +  item.item_name +'</td>'
        res +=  '<td>' +  (item.value || 'pending ..') +'</td>'
        res +=  '<td>' +  item.item_normal_range +'</td>'        
        res += '</tr>';
    })

    res += '</table>';

    return res;
}

module.exports = view;