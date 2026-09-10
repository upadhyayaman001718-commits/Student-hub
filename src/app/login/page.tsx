import AuthLayout from "@/shared/components/auth/AuthLayout";
import AuthCard from "@/shared/components/auth/AuthCard";
import AuthHeader from "@/shared/components/auth/AuthHeader";
import LoginForm from "@/shared/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome Back 👋"
          subtitle="Sign in to continue to Student Hub."
        />

        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}