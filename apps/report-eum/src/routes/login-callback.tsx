import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserManager } from "oidc-client-ts";
import { useEffect, useState } from "react";
import { oidcConfig } from "@/config/oidcConfig";

const mgr = new UserManager(oidcConfig);

export const Route = createFileRoute("/login-callback")({
  component: LoginCallbackPage,
});

function LoginCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mgr
      .signinRedirectCallback()
      .then(() => {
        navigate({ to: "/" });
      })
      .catch((err) => {
        console.error("OIDC callback error:", err);
        setError(err.message || "로그인 처리 중 오류가 발생했습니다.");
      });
  }, [navigate]);

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2 style={{ color: "#dc3545" }}>로그인 실패</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate({ to: "/" })}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>로그인 처리 중...</h2>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
}
