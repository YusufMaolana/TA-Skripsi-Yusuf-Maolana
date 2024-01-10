import { useMutation } from "@apollo/client";
import { UPDATE_DIAGNOSA_LUAR } from "../graphql/mutation";

export default function useUpdateDiagnosaLuar() {
  const [updateDiagnosaLuar, { loading }] = useMutation(UPDATE_DIAGNOSA_LUAR);

  return {
    updateDiagnosaLuar,
    loading,
  };
}
