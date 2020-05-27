let title = document.getElementById("title");
let inst = document.getElementById("inst");
let images = document.getElementById("images");
let btnSumbit = document.getElementById("btnSumbit");
let cedvelinIci = document.getElementById("cedvelinIci");
let kurs, kurslar;

function ilkYukleme() {
    if (localStorage.getItem("kurslar") === null) {
        kurslar = []
    } else {
        kurslar = JSON.parse(localStorage.getItem("kurslar"));
    }
    kurslar.forEach(element => {
        let html = ` <tr>
    <td><img width="100" height="80" src="img/${element.images}"></td>
    <td>${element.title}</td>
    <td>${element.inst}</td>
    <td><button type="button" data-id="${element.kursID}" class="btn btn-danger delete">Delete</button></td>
  </tr>
`;
        cedvelinIci.innerHTML += html;
    });
}

btnSumbit.addEventListener("click", submit);

function submit(e) {


    let alert = document.getElementById("alert");

    if (images.value == "" || title.value == "" || inst.value == "") {
        alert.style.display = "block"
        alert.className = "alert alert-warning"
        alert.innerText = "⚠️ You cannot pass empty fields";
        setTimeout(function() {
            alert.style.display = "none"
        }, 3000)
        return;
    } else {
        alert.style.display = "block"
        alert.className = "alert alert-success"
        alert.innerText = "✅ Addition complete";
        setTimeout(function() {
            alert.style.display = "none"
        }, 3000)
    }
    // Save to localStorage
    kurs = {
        title: title.value,
        inst: inst.value,
        images: images.value,
        kursID: Math.floor(Math.random() * 100000)
    }
    kurslar.push(kurs);
    localStorage.setItem("kurslar", JSON.stringify(kurslar));



    let html = ` <tr>
                <td><img width="100" height="80" src="img/${images.value}"></td>
                <td>${title.value}</td>
                <td>${inst.value}</td>
                <td><button type="button" data-id="${kurs.kursID}" class="btn btn-danger delete">Delete</button></td>
              </tr>
            `;
    cedvelinIci.innerHTML += html;
    images.value = "";
    title.value = "";
    inst.value = "";
    e.preventDefault()
}
let id;
cedvelinIci.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {
        id = e.target.getAttribute("data-id")
        e.target.parentElement.parentElement.remove()
    }


    kurslar = JSON.parse(localStorage.getItem("kurslar"));
    kurslar.forEach((element, index) => {
        if (element.kursID == id) {
            kurslar.splice(index, 1);
        }
    })
    localStorage.setItem("kurslar", JSON.stringify(kurslar))
})