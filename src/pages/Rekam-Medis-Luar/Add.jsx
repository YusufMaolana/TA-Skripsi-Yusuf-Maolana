import React, { useState } from "react";
import { InputForm, Button, Textarea } from "../../components";
import { Row, Col } from "react-bootstrap";
import { defaultImg } from "../../assets/index";
import { useParams } from "react-router-dom";
import { storage } from "../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useInsertDiagnosaLuar } from "../../hooks";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const { id_user } = useParams();
  const { nama } = useParams();
  const { insertDiagnosaLuar } = useInsertDiagnosaLuar();

  const [data, setData] = useState({
    id_user: id_user,
    nama: nama,
    tanggal: "",
    diagnosa: "",
    img_link: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };
  const INPUTFORM = [
    {
      label: "Nama Pasien",
      name: "nama",
      type: "text",
      onChange: handleInputChange,
      disabled: true,
      value: data.nama,
    },
    {
      label: "Tanggal Pemeriksaan",
      name: "tanggal",
      type: "date",
      onChange: handleInputChange,
      value: data.tanggal,
    },
  ];

  const TEXTAREA = {
    label: "Diagnosa",
    name: "diagnosa",
    placeholder: "Masukan Diagnosa",
    onChange: handleInputChange,
    value: data.diagnosa,
  };

  const propsButton = {
    name: "Tambah",
  };

  // state input file
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  // set file yang diuolaoad
  const handleFileUpload = async (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setProgresspercent(0);
    }
  };

  const [progresspercent, setProgresspercent] = useState(0);

  const handleUpload = async (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setURL(downloadURL);
          setData({
            ...data,
            img_link: downloadURL,
          });
          setFile(null);
        });
      }
    );
  };

  const handleAddMedisLuar = (e) => {
    e.preventDefault();
    insertDiagnosaLuar({
      variables: {
        objects: data,
      },
    })
      .then(({ data }) => {
        const affected_rows = data.insert_diagnosa.affected_rows;
        if (affected_rows) {
          swal("Berhasil", "Data Berhasil Ditambahkan", "success", {
            button: true,
          });
          navigate(`/rekam-medis/${id_user}`);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="px-3 form-input">
        <h4 className="font-primary fw-bold text-dark-blue mb-3 mt-2 text-capitalize">
          Tambah Riwayat Medis Luar
        </h4>
        <form onSubmit={handleAddMedisLuar}>
          {INPUTFORM.map((item, i) => (
            <InputForm props={item} key={i} />
          ))}
          <Textarea props={TEXTAREA} />

          <Row className="mt-4">
            <Col md={4}>
              {url ? (
                <img src={url} alt="gambar" className="img-fluid " />
              ) : (
                <img src={defaultImg} alt="gambar" className="img-fluid " />
              )}
            </Col>
            <Col md={8}>
              <label htmlFor="upload" className="form-label fw-semibold ">
                Upload Gambar Pemeriksaan
              </label>

              <div className="input-group">
                <input
                  type="file"
                  id="gambar"
                  className="form-control"
                  onChange={handleFileUpload}
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Tombol Upload tidak akan berfungsi jika belum dipilih gambar"
                  accept="image/x-png,image/gif,image/jpeg, image/jpg, image/svg"
                />
              </div>
              <button
                className={`input-group-text mt-3 ${
                  file ? "bg-success text-white" : "not-allowed"
                } ${progresspercent === 100 ? "bg-success text-white" : ""}`}
                disabled={!file}
                onClick={handleUpload}
              >
                {progresspercent === 0 && !file
                  ? "Gambar Belum Dipilih"
                  : progresspercent > 0 && progresspercent < 100
                  ? `Upload ${progresspercent}%`
                  : progresspercent === 100
                  ? "Selesai"
                  : file && progresspercent === 0
                  ? "Klik untuk Upload"
                  : ""}
              </button>
            </Col>
          </Row>
          <Button props={propsButton} />
        </form>
      </div>
    </>
  );
};

export default Add;
