import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TANGGAL_ANTRIAN } from "../graphql/subscribe";

export default function useSubscribeTanggalAntrian() {
  const { data, error } = useSubscription(SUBSCRIBE_TANGGAL_ANTRIAN);

  return {
    data,
    error,
  };
}
