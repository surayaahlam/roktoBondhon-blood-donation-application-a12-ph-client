import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: userData = [], isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure(`/users/${user?.email}`);
      return response.data;
    },
  });

  const role = userData?.role;

  return [role, userData, isLoading, refetch];
};

export default useRole;