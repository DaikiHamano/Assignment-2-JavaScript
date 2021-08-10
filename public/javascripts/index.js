

//to confirm the action
function confirmDeletion() {
    return confirm('Are you sure you want to delete this project?');    
}

// to show the suggesion
function foo() {
    var element = document.getElementById( "target" ) ;
    var radioNodeList = element.type;
    var value = radioNodeList.value ;
    if ( value === "normal" ) {
        document.getElementById("output").innerText = "";
    } else {
        document.getElementById("output").innerText = "";
    }
}