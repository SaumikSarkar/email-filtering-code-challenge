var emailIDs;
var displayedEmails;
var isEnabledChecked;

function onLoad() {
    emailIDs = [];
    isEnabledChecked = false;
    document.getElementById('sec_table_section').style.display = 'none';
    document.getElementById('btn_add_email').disabled = true;
    document.getElementById('spn_err_email').innerHTML = null;
}

function addEmail(event) {
    let elementValue = document.getElementById('txt_email').value;
    if (emailIDs.length > 0) {
        mapAllEmail(emailIDs);
        document.getElementById('txt_email_search').value = null;
        document.getElementById('chk_show_enabled').checked = false;
    }
    let emailObj = {
        value: elementValue,
        enabled: false
    }
    emailIDs.push(emailObj);
    displayedEmails = emailIDs.slice(0);
    addRow(emailIDs, elementValue);
}

function addRow(emailArray, email) {
    let emails = emailArray.slice(0);
    let tableElement = document.getElementById('tbl_output_email');
    let rows = tableElement.rows;
    let row = tableElement.insertRow(rows.length);

    let cell1 = row.insertCell(0);
    let el1 = document.createElement("input");
    el1.type = "checkbox";
    el1.id = `chk_email_output_${rows.length - 1}`;
    cell1.appendChild(el1);

    let cell2 = row.insertCell(1);
    cell2.innerHTML = emails[rows.length - 2].value;

    let cell3 = row.insertCell(2);
    let el2 = document.createElement("button");
    el2.id = `btn_delete_email_${rows.length - 1}`;
    el2.classList.add('delete-email-button');
    el2.innerHTML = 'Delete';
    cell3.appendChild(el2);

    document.getElementById(`btn_delete_email_${rows.length - 1}`).addEventListener('click', () => {
        deleteRow(email, 'deleteCell');
    });

    document.getElementById(`chk_email_output_${rows.length - 1}`).addEventListener('click', (event) => {
        enableEmail(event, email);
    });

    document.getElementById(`chk_email_output_${rows.length - 1}`).checked = emails[rows.length - 2].enabled;

    document.getElementById('sec_table_section').style.display = 'block';
    document.getElementById('btn_add_email').disabled = true;
    document.getElementById('txt_email').value = null;
}

function deleteRow(value, callType) {
    let tableElement = document.getElementById('tbl_output_email');
    let rows = tableElement.rows;

    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        if (row.cells[1].innerHTML == value) {
            tableElement.deleteRow(i);
            if (callType == 'deleteCell') {
                emailIDs.forEach((data, index) => {
                    if (data.value == value) {
                        emailIDs.splice(index, 1);
                    }
                });
                displayedEmails.forEach((data, index) => {
                    if (data.value == value) {
                        displayedEmails.splice(index, 1);
                    }
                });
            }
            break;
        }
    }

    if (emailIDs.length == 0) {
        document.getElementById('sec_table_section').style.display = 'none';
    }
}

function searchEmail() {
    let searchText = document.getElementById('txt_email_search').value;
    searchLogic(searchText);
}

function searchLogic(searchText) {
    if (searchText) {
        let filteredArray = [];
        let mappingArray = [];
        let filteredEnabledArray = [];
        let arrayForFiltering = emailIDs.slice(0);
        if (isEnabledChecked) {
            filteredEnabledArray = displayedEmails.filter(data => data.enabled == true);
            arrayForFiltering = filteredEnabledArray.slice(0);
        }
        filteredArray = arrayForFiltering.filter(data => data.value.includes(searchText));
        displayedEmails = filteredArray.slice(0);
        emailIDs.forEach(data => {
            deleteRow(data.value, 'search');
        });
        filteredArray.forEach(data => {
            mappingArray.push(data);
            addRow(mappingArray, data.value);
        });
    }
    else {
        if (isEnabledChecked) {
            let displayArray = emailIDs.slice(0);
            displayArray = emailIDs.filter(data => data.enabled == true);
            mapAllEmail(displayArray);
            displayedEmails = displayArray.slice(0);
        }
        else {
            mapAllEmail(emailIDs);
            displayedEmails = emailIDs.slice(0);
        }
    }
}

function mapAllEmail(dataArray) {
    let mappingArray = [];
    emailIDs.forEach(data => {
        deleteRow(data.value, 'search');
    });
    dataArray.forEach(data => {
        mappingArray.push(data);
        addRow(mappingArray, data.value);
    });
}

function enableEmail(event, value) {
    emailIDs.forEach(data => {
        if (data.value == value) {
            data.enabled = event.target.checked;
        }
    });
}

function showEnabledEmail(event) {
    if (event.target.checked) {
        isEnabledChecked = true;
    }
    else {
        isEnabledChecked = false;
    }
    searchEmail();
}

function checkEmailValidation(inputID) {
    let value = document.getElementById(inputID).value;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(value)) {
        document.getElementById('btn_add_email').disabled = false;
        document.getElementById('spn_err_email').innerHTML = null;
    }
    else {
        document.getElementById('btn_add_email').disabled = true;
        document.getElementById('spn_err_email').innerHTML = '*Input should be in email format';
    }
}