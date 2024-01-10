import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_DIAGNOSA_LUAR } from "../graphql/subscribe";

export default function useSubscriDiagnosaLuar(uuid) {
  const { data, loading, error } = useSubscription(SUBSCRIBE_DIAGNOSA_LUAR, {
    variables: {
      _eq: uuid,
    },
  });

  return {
    data,
    loading,
    error,
  };
}
