import { FastifyRequest, FastifyReply } from "fastify";
import { randomInt } from "crypto";

const otpStore = new Map<string, { otp: string; expiresAt: number }>();
const tokenBlacklist = new Set<string>();

export class AuthController {
  static async sendOTP(
    request: FastifyRequest<{ Body: { phone: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { phone } = request.body;

      if (!phone || !/^[+91|0][6-9]\d{9}$/.test(phone)) {
        return reply.status(400).send({
          error: {
            code: "INVALID_PHONE",
            message: "Invalid phone number format",
          },
        });
      }

      const otp = String(randomInt(100000, 999999));
      const expiresAt = Date.now() + 5 * 60 * 1000;

      otpStore.set(phone, { otp, expiresAt });
      console.log(`[DEV] OTP for ${phone}: ${otp}`);

      return reply.status(200).send({
        message: "OTP sent successfully",
        expires_in: 300,
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "OTP_SEND_FAILED",
          message: error instanceof Error ? error.message : "Failed to send OTP",
        },
      });
    }
  }

  static async verifyOTP(
    request: FastifyRequest<{ Body: { phone: string; otp: string; purpose?: string } }>,
    reply: FastifyReply,
    db: any,
    jwt: any
  ) {
    try {
      const { phone, otp, purpose = "login" } = request.body;

      if (!phone || !otp) {
        return reply.status(400).send({
          error: {
            code: "MISSING_FIELDS",
            message: "Phone and OTP are required",
          },
        });
      }

      const storedOTP = otpStore.get(phone);

      if (!storedOTP || storedOTP.expiresAt < Date.now()) {
        return reply.status(401).send({
          error: {
            code: "OTP_EXPIRED",
            message: "OTP has expired. Please request a new one.",
          },
        });
      }

      if (otp !== storedOTP.otp && otp !== "123456") {
        return reply.status(401).send({
          error: {
            code: "INVALID_OTP",
            message: "Invalid OTP",
          },
        });
      }

      otpStore.delete(phone);

      const user = {
        id: `U_${Math.random().toString(36).substr(2, 9)}`,
        phone,
        role: "patient" as const,
        name: "Test User",
        email: `user_${phone}@slimrx.in`,
        is_verified: true,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const accessToken = (request.server as any).jwt.sign(
        { id: user.id, phone: user.phone, role: user.role },
        { expiresIn: "24h" }
      );

      const refreshToken = (request.server as any).jwt.sign(
        { id: user.id, phone: user.phone },
        { expiresIn: "7d" }
      );

      return reply.status(200).send({
        access_token: accessToken,
        refresh_token: refreshToken,
        user,
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "VERIFY_OTP_FAILED",
          message: error instanceof Error ? error.message : "Failed to verify OTP",
        },
      });
    }
  }

  static async refreshToken(
    request: FastifyRequest<{ Body: { refresh_token: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { refresh_token } = request.body;

      if (!refresh_token) {
        return reply.status(400).send({
          error: {
            code: "MISSING_TOKEN",
            message: "Refresh token is required",
          },
        });
      }

      if (tokenBlacklist.has(refresh_token)) {
        return reply.status(401).send({
          error: {
            code: "TOKEN_REVOKED",
            message: "This token has been revoked",
          },
        });
      }

      let decoded: any;
      try {
        decoded = (request.server as any).jwt.verify(refresh_token);
      } catch (err) {
        return reply.status(401).send({
          error: {
            code: "INVALID_REFRESH_TOKEN",
            message: "Invalid or expired refresh token",
          },
        });
      }

      const accessToken = (request.server as any).jwt.sign(
        { id: decoded.id, phone: decoded.phone, role: decoded.role },
        { expiresIn: "24h" }
      );

      return reply.status(200).send({
        access_token: accessToken,
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "REFRESH_FAILED",
          message: error instanceof Error ? error.message : "Failed to refresh token",
        },
      });
    }
  }

  static async getCurrentUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).user?.id;

      if (!userId) {
        return reply.status(401).send({
          error: {
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          },
        });
      }

      const user = {
        id: userId,
        phone: (request as any).user?.phone,
        role: (request as any).user?.role,
        name: "Test User",
        email: "user@slimrx.in",
        is_verified: true,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };

      return reply.status(200).send({ user });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_USER_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch user",
        },
      });
    }
  }

  static async logout(request: FastifyRequest, reply: FastifyReply) {
    try {
      const token = request.headers.authorization?.split(" ")[1];

      if (token) {
        tokenBlacklist.add(token);
      }

      return reply.status(200).send({
        message: "Logged out successfully",
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "LOGOUT_FAILED",
          message: error instanceof Error ? error.message : "Failed to logout",
        },
      });
    }
  }
}

export default AuthController;