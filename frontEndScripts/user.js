const inputData = document.getElementById("input");
const btn = document.getElementById("btn");
let dataArr = [];

inputData.addEventListener("change", () => {
    dataArr.push(inputData.files[0]);
})

btn.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", dataArr[0]);

    // console.log(dataArr);
    // for (var key of formData.keys()) {
    //     console.log(key, formData.get(key));
    // }

    fetch("/api/upload", {
        method: "POST",        
        headers: {
            "Accept": "application/json",
            // "Content-Type": "multipart/form-data",
        },
        body: formData,
    })
        .then((response) => {                    
            return response.json();                    
        })
        .then((data) => {
            console.log(data.message);
        })
        .catch((err) => {
            console.log(err);
        })

})
