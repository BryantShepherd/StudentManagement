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

let orderByBtns = document.querySelectorAll(".order-by-btn");
let currentURL = new URL(window.location.href);
let search_params = new URLSearchParams(currentURL.search);
console.log(search_params.get('orderby'));
orderByBtns.forEach((item, index) => {
    item.addEventListener('click', () => {
        let orderBy = item.innerHTML;
        if (search_params.get('orderby')) search_params.set('orderby', orderBy);
        else search_params.append('orderby', orderBy);

        currentURL.search = search_params.toString();
        let newURL = currentURL.toString();
        window.location.replace(newURL);
    });
});