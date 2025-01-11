// Toggle sidebar
function toggleSidebar() {
    document.getElementById("sideMenu").classList.toggle("open");
    document.getElementById("content").classList.toggle("content-shifted");
}

// Close sidebar
function closeNav() {
    document.getElementById("sideMenu").classList.remove("open");
    document.getElementById("content").classList.remove("content-shifted");
}

// Copy code to clipboard
function copyCode(element) {
    var code = element.parentNode.querySelector("code").textContent;
    navigator.clipboard.writeText(code).then(function() {
        console.log("Code copied to clipboard");
    }, function(err) {
        console.error("Could not copy code: ", err);
    });
}

// Add event listeners to copy buttons
var copyButtons = document.querySelectorAll(".copy-button");
copyButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        copyCode(this);
    });
});
