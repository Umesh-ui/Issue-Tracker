document.getElementById('issueInputForm').addEventListener('submit', saveIssue);//reference of the form

function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;//referennce of description
    // console.log(issueDesc)
    var issueSevr = document.getElementById('issueType').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;

    var issueId = chance.guid();///library used to genarate random number (global universal identifier)
    var issueStatus = 'Open';

    var issue = {                   //issue object is created & key are given values to be assigned 
        id: issueId,
        description: issueDesc,
        severity: issueSevr,
        assignedTo: issueAssignedTo,
        status:issueStatus
    }

    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push[issue];
        localStorage.setItem('issues', JSON.stringify(issues));//object notation converted to string
    }
    else {
        var issues = JSON.parse(localStorage.getItem('issues'));//LS will get items inthe form of object
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));//O/P will be given in the form of strings
    }

    document.getElementById('issueInputForm').reset();
    fetchIssues();

    e.preventDefault();

}
// closing an issue

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++){
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

// deleting an issue
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++){
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}





 

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));//values converted to object notation
    var issueList = document.getElementById('issueList');

    issueList.innerHTML = "";

    for (var i = 0; i < issues.length; i++){
        var id = issues[i].id;
        var desc = issues[i].description;
        var sevr = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issueList.innerHTML += `<div class="well" style="background-color:#ccc; padding:10px ">` +
           ` <h6>Issue ID :` + id + `</h6>` +
            `<p ><span class="label label-info">` + status + `</span></p>` +
            `<h4>` + desc + `</h4>` +
            `<p><span >`+`⏲` + sevr + `</span></p>` +
                                
            `<p><span class="glyphicon glyph-user">`+` 🤵` + assignedTo + `</span></p>` +
            `<a href="#"  onclick="setStatusClosed(\`` + id + `\`)"  class="btn btn-warning ">Close</a>` +
            `<a href="#"  onclick="deleteIssue(\`` + id + `\`)" class="btn btn-danger">Delete</a>` +
            `</div> <br>`;

    }
}

