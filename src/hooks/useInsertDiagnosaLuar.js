import { useMutation } from "@apollo/client";
import { INSERT_DIAGNOSA_LUAR } from "../graphql/mutation";

export default function useInsertDiagnosaLuar() {
  const [insertDiagnosaLuar, { loading: loadingInsertDiagnosaLuar }] =
    useMutation(INSERT_DIAGNOSA_LUAR);

  return {
    insertDiagnosaLuar,
    loadingInsertDiagnosaLuar,
  };
}
