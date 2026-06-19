import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    await request.jwtVerify();

    (request as any).user = {
      id: (request as any).user.id,
      phone: (request as any).user.phone,
      role: (request as any).user.role,
    };
  } catch (err) {
    return reply.status(401).send({
      error: {
        code: "UNAUTHORIZED",
        message: "Invalid or missing authentication token",
      },
    });
  }
}

export function requirePatient(
  request: FastifyRequest,
  reply: FastifyReply
): boolean {
  const userRole = (request as any).user?.role;

  if (userRole !== "patient") {
    reply.status(403).send({
      error: {
        code: "FORBIDDEN",
        message: "Only patients can access this resource",
      },
    });
    return false;
  }

  return true;
}

export function requireDoctor(
  request: FastifyRequest,
  reply: FastifyReply
): boolean {
  const userRole = (request as any).user?.role;

  if (userRole !== "doctor") {
    reply.status(403).send({
      error: {
        code: "FORBIDDEN",
        message: "Only doctors can access this resource",
      },
    });
    return false;
  }

  return true;
}

export function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply
): boolean {
  const userRole = (request as any).user?.role;

  if (userRole !== "admin") {
    reply.status(403).send({
      error: {
        code: "FORBIDDEN",
        message: "Only admins can access this resource",
      },
    });
    return false;
  }

  return true;
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+91|0][6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateMCINumber(mciNumber: string): boolean {
  const mciRegex = /^MCI-\d{6}$/;
  return mciRegex.test(mciNumber);
}

export function sendError(
  reply: FastifyReply,
  statusCode: number,
  errorCode: string,
  message: string,
  details?: Record<string, any>
): void {
  reply.status(statusCode).send({
    error: {
      code: errorCode,
      message,
      ...(details && { details }),
    },
  });
}

export function getPaginationParams(
  query: any
): { page: number; limit: number; offset: number } {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.max(Math.min(parseInt(query.limit) || 10, 100), 1);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export function logRequest(request: FastifyRequest): void {
  const method = request.method;
  const url = request.url;
  const userId = (request as any).user?.id;
  const userRole = (request as any).user?.role;

  request.log.info({
    method,
    url,
    userId,
    userRole,
    timestamp: new Date().toISOString(),
  });
}

export function formatResponse<T>(
  data: T,
  message?: string,
  meta?: Record<string, any>
): { data: T; message?: string; meta?: Record<string, any> } {
  return {
    data,
    ...(message && { message }),
    ...(meta && { meta }),
  };
}

export function formatPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): {
  data: T[];
  meta: { page: number; limit: number; total: number; pages: number };
} {
  return {
    data,
    meta: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export default {
  authenticate,
  requirePatient,
  requireDoctor,
  requireAdmin,
  validatePhone,
  validateEmail,
  validateMCINumber,
  sendError,
  getPaginationParams,
  logRequest,
  formatResponse,
  formatPaginatedResponse,
};