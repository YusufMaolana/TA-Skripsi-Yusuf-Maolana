import { useMutation } from "@apollo/client";
import { DELETE_DIAGNOSA_LUAR } from "../graphql/mutation";

export default function useDeleteDiagnosaLuar() {
  const [deleteDiagnosaLuar, { loading: loadingDeleteDiagnosaLuar }] =
    useMutation(DELETE_DIAGNOSA_LUAR);

  return {
    deleteDiagnosaLuar,
    loadingDeleteDiagnosaLuar,
  };
}
