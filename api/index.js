require('dotenv/config');
const polka = require("polka");
const data = require('./../src/data');

const app = polka();

app.get("/", (req, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("access-control-allow-origin", "*");
  let [status, msg, resData] = [false, "Data berhasil didapatkan", []];
  const nis = req.query.nis;

  if (nis) {
    const findSiswa = data.filter((el) => el.nis == nis);

    if (findSiswa.length > 0) {
      status = true;
      resData = findSiswa[0];
    } else {
      msg = "Data dengan NIS tersebut tidak ditemukan";
    }
  } else {
    msg = "Parameter NIS kosong";
  }

  res.end(
    JSON.stringify({
      status,
      msg,
      data: resData,
    })
  );
});

module.exports = app;


module.exports = app;