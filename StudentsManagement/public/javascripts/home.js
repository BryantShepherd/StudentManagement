let updateBtns = document.querySelectorAll(".update");
updateBtns.forEach((item, index) => {
    item.addEventListener('click', () => {
        let studentID = item.parentNode.childNodes[0].firstChild["data"];
        window.location.replace(`http://127.0.0.1:5000/students/update/${studentID}`)
    });
});

let deleteBtns = document.querySelectorAll(".delete");
deleteBtns.forEach((item, index) => {
    item.addEventListener('click', () => {
        let studentID = item.parentNode.childNodes[0].firstChild["data"];
        window.location.replace(`http://127.0.0.1:5000/students/delete/${studentID}`)
    });
});