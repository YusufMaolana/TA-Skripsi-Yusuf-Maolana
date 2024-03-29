import { Loading } from "../../components";
import DataTable from "react-data-table-component";
import { AiOutlineUser } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { customStyles, paginationComponentOptions } from "../../utils";
import { useState, useMemo } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSubscribeUser } from "../../hooks";
import { Link } from "react-router-dom";

function Index() {
  // Riwayat pasien berdasarkna user riwayat pasien aktif
  const { dataUser, loadingUser, errorUser } = useSubscribeUser();
  if (errorUser) console.error(errorUser);
  // console.log(dataUser);

  const [filterText, setFilterText] = useState("");
  const filteredPasien = dataUser?.user_medis.filter(
    (item) => item.user_role == "pasien"
  );
  const filteredItems = filteredPasien?.filter(
    (item) =>
      item.nama.toLowerCase().includes(filterText.toLowerCase()) ||
      item.no_rekam_medis.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <Form.Group as={Col} md="3" className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Cari Nama atau Nomor ID"
            onChange={(e) => setFilterText(e.target.value)}
          />
          <InputGroup.Text className="bg-warning">
            <AiOutlineUser />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
    );
  }, [filterText]);

  const columnsRiwayatPasien = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      maxWidth: "20%",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "Alamat",
      selector: (row) => row.alamat,
      maxWidth: "40%",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "Nomor ID",
      selector: (row) => <span className="px-3">{row.no_rekam_medis}</span>,
      maxWidth: "18%",
      center: true,
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "Rekam Medis",
      maxWidth: "20%",
      allowOverflow: true,
      wrap: true,
      center: true,
      cell: (row) => (
        <Link to={`/rekam-medis/${row.id}`}>
          <FaEdit className="text-primary fs-4 pointer" id={row.id} />
        </Link>
      ),
    },
  ];

  if (loadingUser) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="px-2">
          <DataTable
            striped={true}
            columns={columnsRiwayatPasien}
            data={filteredItems}
            customStyles={customStyles}
            pagination
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            paginationComponentOptions={paginationComponentOptions}
          />
        </div>
      </>
    );
  }
}

export default Index;
