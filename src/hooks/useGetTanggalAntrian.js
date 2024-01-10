import { useQuery } from "@apollo/client";
import { GET_TANGGAL_ANTRIAN } from "../graphql/query";

export default function useGetTanggalAntrian() {
  const { data, error } = useQuery(GET_TANGGAL_ANTRIAN);
  return {
    data,
    error,
  };
}
