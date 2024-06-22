// /src/app/auth/error/page.tsx

import dynamic from "next/dynamic";

// Use dynamic import to load the component on the client side only
const AuthErrorComponent = dynamic(
  () => import("@/app/_components/Auth/Error"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

export default function ErrorPage() {
  return (
    <div>
      <AuthErrorComponent />
    </div>
  );
}
