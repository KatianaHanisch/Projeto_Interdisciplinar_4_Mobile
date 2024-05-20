import React, { useContext } from "react";

import { useNavigate } from "@/hooks/useNavigate";
import { AuthContext } from "@/context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { theme } from "@/constants";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, carregando } = useContext(AuthContext);
  const navigate = useNavigate();

  if (carregando) {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color={theme.colors.orangePrimaryDark}
        />
      </View>
    );
  }

  if (!isLoggedIn) {
    navigate("login");
    return null;
  }

  return <>{children}</>;
};
