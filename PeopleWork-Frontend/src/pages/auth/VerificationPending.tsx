import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailCheck, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/services/queries/useAuth";
import { Input } from "@/components/ui/input";

// OTP Input component
const OtpInput = ({
  length = 6,
  value,
  onChange,
}: {
  length: number;
  value: string;
  onChange: (value: string) => void;
}) => {
  const inputRefs = Array.from({ length }, () =>
    React.createRef<HTMLInputElement>()
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target.value;

    // Allow only digits
    if (!/^\d*$/.test(input)) return;

    // Create a new value array
    const newValue = value.split("");
    // Handle empty string case
    if (newValue.length < length) {
      newValue.length = length;
    }
    newValue[index] = input.slice(-1);

    // Join and pass the new value back
    const newOtp = newValue.join("").trim();
    onChange(newOtp);

    // Auto-focus next input if we entered a digit
    if (input && index < length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // On backspace, clear the current field and focus the previous one
    if (e.key === "Backspace") {
      if (value[index]) {
        // If current field has value, just clear it and don't move focus
        const newValue = value.split("");
        newValue[index] = "";
        onChange(newValue.join("").trim());
      } else if (index > 0) {
        // If current field is empty, focus the previous one
        inputRefs[index - 1].current?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move focus left on arrow key
      inputRefs[index - 1].current?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      // Move focus right on arrow key
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content are digits
    if (!/^\d+$/.test(pastedData)) return;

    // Take only the first 'length' digits
    const validOtp = pastedData.slice(0, length);
    onChange(validOtp);

    // Focus the field after the last pasted digit, or the last field
    const focusIndex = Math.min(validOtp.length, length - 1);
    inputRefs[focusIndex].current?.focus();
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }, (_, i) => (
        <Input
          key={i}
          ref={inputRefs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={i === 0 ? handlePaste : undefined} // Only allow paste on first input
          className="w-12 h-12 text-center text-xl font-semibold"
          autoComplete="one-time-code"
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
};

export default function VerificationPending() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email = "" } = location.state || {};
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<
    "idle" | "verifying" | "verified" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { resendVerificationMutation, verifyOtpMutation } = useAuth();

  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  const handleResendVerification = async () => {
    try {
      setStatus("idle");
      await resendVerificationMutation.mutateAsync({ email });
      setErrorMessage(null);
    } catch (err: unknown) {
      setStatus("error");
      type ErrorResponse = { response?: { data?: { message?: string } } };
      const errorResponse = (err as ErrorResponse)?.response?.data?.message;
      setErrorMessage(errorResponse || "Failed to resend verification code");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setStatus("error");
      setErrorMessage("Please enter the complete 6-digit code");
      return;
    }

    try {
      setStatus("verifying");
      setErrorMessage(null);
      await verifyOtpMutation.mutateAsync({ email, otp });
      setStatus("verified");

      // Redirect after successful verification
      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            message: "Email verified successfully. You can now log in.",
          },
        });
      }, 1500);
    } catch (err: unknown) {
      setStatus("error");
      type ErrorResponse = { response?: { data?: { message?: string } } };
      const errorResponse = (err as ErrorResponse)?.response?.data?.message;
      setErrorMessage(errorResponse || "Invalid verification code");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <MailCheck size={36} className="text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a verification code to{" "}
            <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground mb-4">
            Please enter the 6-digit code we sent to your email to complete your
            registration.
          </p>

          <OtpInput length={6} value={otp} onChange={setOtp} />

          {status === "error" && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {status === "verified" && (
            <Alert className="bg-green-50 border-green-200 text-green-800 mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Email verified successfully!</AlertDescription>
            </Alert>
          )}

          {resendVerificationMutation.isSuccess && (
            <Alert className="bg-green-50 border-green-200 text-green-800 mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Verification code has been resent!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            className="w-full"
            onClick={handleVerifyOtp}
            disabled={
              otp.length !== 6 ||
              status === "verifying" ||
              status === "verified"
            }
          >
            {status === "verifying" ? "Verifying..." : "Verify Email"}
          </Button>

          <div className="flex justify-between w-full">
            <Button
              variant="ghost"
              onClick={handleResendVerification}
              disabled={
                resendVerificationMutation.isPending || status === "verified"
              }
              size="sm"
            >
              {resendVerificationMutation.isPending
                ? "Sending..."
                : "Resend Code"}
            </Button>

            <Button variant="ghost" onClick={goToLogin} size="sm">
              Back to Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
