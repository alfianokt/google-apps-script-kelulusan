require('dotenv/config');
const polka = require("polka");
const { readFileSync } = require('fs')
const { join } = require('path')
const data = JSON.parse(readFileSync(join(__dirname, '..', '_files', 'data.json'), 'utf8'));

const app = polka();

app.use((req, res) => {
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