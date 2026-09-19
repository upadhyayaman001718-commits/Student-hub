import AuthLayout from "@/shared/components/auth/AuthLayout";
import AuthCard from "@/shared/components/auth/AuthCard";
import AuthHeader from "@/shared/components/auth/AuthHeader";
import RegisterForm from "@/shared/components/auth/RegisterForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create Account 🎓"
          subtitle="Join Student Hub to upload & discover academic study materials."
        />

        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}
