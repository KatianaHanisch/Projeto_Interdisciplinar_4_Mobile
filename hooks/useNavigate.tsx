import { useRouter } from "expo-router";

export const useNavigate = () => {
  const router = useRouter();

  const navigate = (name: string) => {
    router.navigate(name);
  };

  return navigate;
};
