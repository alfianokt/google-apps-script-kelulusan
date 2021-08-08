const form = document.querySelector("#form");
const nis = document.querySelector("#nis");
const loading = document.querySelector("#loading");
const elAlert = document.querySelector("#alert");
const information = document.querySelector("#information");
const elName = document.querySelector("#name");
const elStatus = document.querySelector("#status");
const reset = document.querySelector("#reset");
const BASE_URL = "https://google-apps-script-kelulusan.vercel.app/api/";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // show loading
  loading.style.display = "block";

  fetch(`${BASE_URL}?nis=${nis.value}`)
    .then((r) => r.json())
    .then((json) => {
      if (json.status) {
        // hide error alert
        elAlert.style.display = "none";
        // hide form
        form.style.display = "none";
        // show information element
        information.style.display = "block";
        // show name and status
        elName.innerText = json.data.nama;
        elStatus.innerText = json.data.status;
        // set status color
        elStatus.style.color = {
          "Tidak Lulus": "var(--danger)",
          Lulus: "var(--success)",
        }[json.data.status];
      } else {
        // show error alert
        elAlert.style.display = "block";
        elAlert.innerText = json.msg;
      }
    })
    .catch((e) => {
      // show error alert
      elAlert.style.display = "block";
      elAlert.innerText = "Kesalahan tidak diketahui";
    })
    .finally(() => {
      // hide loading
      loading.style.display = "none";
    });
});

// reset form
reset.addEventListener("click", () => {
  nis.value = "";
  form.style.display = "flex";
  loading.style.display = "none";
  information.style.display = "none";
  elAlert.style.display = "none";
});
