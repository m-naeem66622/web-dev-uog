import { axiosClient } from "@/lib/axios";
import { User } from "@/types/user";
import { storage } from "@/utils/performance";

interface AuthResponse {
    token: string;
    user: User;
    message?: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    requestedRole?: string;
}

interface PasswordResetRequest {
    email: string;
}

interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}

interface ResendVerificationRequest {
    email: string;
}

interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export const authAPI = {
    async register(userData: RegisterRequest): Promise<AuthResponse> {
        const { data } = await axiosClient.post<AuthResponse>(
            "/api/auth/register",
            userData
        );
        return data;
    },

    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const { data } = await axiosClient.post<AuthResponse>(
            "/api/auth/login",
            credentials
        );

        if (data.token) {
            storage.set("authToken", data.token);
            storage.set("userRole", data.user.role);
            storage.set("user", data.user);
        }

        return data;
    },

    async verifyEmail(token: string): Promise<{ message: string }> {
        const { data } = await axiosClient.get("/api/auth/verify-email", {
            params: { token },
        });
        return data;
    },

    async verifyOtp(request: VerifyOtpRequest): Promise<AuthResponse> {
        const { data } = await axiosClient.post<AuthResponse>(
            "/api/auth/verify-otp",
            request
        );

        if (data.token) {
            storage.set("authToken", data.token);
            storage.set("userRole", data.user.role);
            storage.set("user", data.user);
        }

        return data;
    },

    async resendVerification(
        request: ResendVerificationRequest
    ): Promise<{ message: string }> {
        const { data } = await axiosClient.post("/api/auth/send-otp", request);
        return data;
    },

    async requestPasswordReset(
        request: PasswordResetRequest
    ): Promise<{ message: string }> {
        const { data } = await axiosClient.post("/api/auth/forgot", request);
        return data;
    },

    async resetPassword(
        resetData: ResetPasswordRequest
    ): Promise<{ message: string }> {
        const { data } = await axiosClient.post("/api/auth/reset", resetData);
        return data;
    },

    logout(): void {
        storage.remove("authToken");
        storage.remove("userRole");
        storage.remove("user");
    },

    isAuthenticated(): boolean {
        return !!storage.get("authToken");
    },

    currentUser(): User | null {
        return storage.get("user") ?? null;
    },
};
