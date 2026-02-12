import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserManager } from "oidc-client-ts";
import { useEffect } from "react";
import { oidcConfig } from "@/config/oidcConfig";

const mgr = new UserManager(oidcConfig);

export const Route = createFileRoute("/logout-callback")({
  component: LogoutCallbackPage,
});

function LogoutCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      mgr.removeUser();
    } catch (error) {
      console.error("사용자 정보 제거 중 에러 발생:", error);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      navigate({ to: "/" });
    }
  }, [navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>로그아웃 처리 중...</p>
    </div>
  );
}
