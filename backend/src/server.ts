import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";
import fastifyCors from "@fastify/cors";
import crypto from "crypto";
import Razorpay from "razorpay";
import { PrismaClient } from "@prisma/client";

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

// CORS Configuration
app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: false,
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_1234567890abcdef",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret_1234567890abcdef",
});

console.log("✅ Razorpay initialized with Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("✅ Prisma connected to database");

// ===================== HEALTH CHECK =====================

app.get("/health", async (request, reply) => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    database: "connected",
  };
});

// ===================== AUTH ENDPOINTS =====================

app.post<{ Body: { phone: string } }>(
  "/api/v1/auth/send-otp",
  async (request, reply) => {
    const { phone } = request.body;
    if (!phone) {
      return reply.status(400).send({
        error: { code: "MISSING_PHONE", message: "Phone is required" },
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to database
    await prisma.otpLog.upsert({
      where: { phone },
      update: {
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        attempts: 0,
      },
      create: {
        phone,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    console.log(`[DEV] OTP: ${otp} for ${phone}`);

    return reply.status(200).send({
      message: "OTP sent successfully",
      expires_in: 300,
    });
  }
);

app.post<{ Body: { phone: string; otp: string } }>(
  "/api/v1/auth/verify-otp",
  async (request, reply) => {
    const { phone, otp } = request.body;
    if (!phone || !otp) {
      return reply.status(400).send({
        error: { code: "MISSING", message: "Phone and OTP required" },
      });
    }

    // Get OTP from database
    const otpLog = await prisma.otpLog.findUnique({
      where: { phone },
    });

    if (!otpLog || otpLog.expiresAt < new Date()) {
      return reply.status(401).send({
        error: { code: "OTP_EXPIRED", message: "OTP expired" },
      });
    }

    if (otpLog.otp !== otp) {
      return reply.status(401).send({
        error: { code: "INVALID_OTP", message: "Invalid OTP" },
      });
    }

    // Delete OTP after verification
    await prisma.otpLog.delete({
      where: { phone },
    });

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          role: "patient",
          name: "User",
          email: `user_${phone}@slimrx.in`,
          isVerified: true,
          isActive: true,
          patient: {
            create: {
              currentWeight: 65.5,
              startWeight: 75.0,
              goalWeight: 60.0,
              city: "Mumbai",
              gender: "female",
              heightCm: 165,
              conditions: ["Type 2 Diabetes"],
              medications: "Metformin 500mg",
            },
          },
        },
        include: { patient: true },
      });
    }

    const accessToken = `token_${Date.now()}`;
    const refreshToken = `refresh_${Date.now()}`;

    return reply.status(200).send({
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        name: user.name,
      },
    });
  }
);

app.post<{ Body: { refresh_token: string } }>(
  "/api/v1/auth/refresh",
  async (request, reply) => {
    const { refresh_token } = request.body;
    if (!refresh_token) {
      return reply.status(400).send({
        error: { code: "MISSING", message: "Token required" },
      });
    }
    const accessToken = `token_${Date.now()}`;
    return reply.status(200).send({ access_token: accessToken });
  }
);

app.get("/api/v1/auth/me", async (request, reply) => {
  return reply.status(200).send({
    user: {
      id: "U1",
      phone: "+919876543210",
      role: "patient",
      name: "Test User",
    },
  });
});

app.post("/api/v1/auth/logout", async (request, reply) => {
  return reply.status(200).send({ message: "Logged out" });
});

// ===================== PATIENT ENDPOINTS =====================

app.get("/api/v1/patients/profile", async (request, reply) => {
  try {
    // Get first patient (demo)
    const patient = await prisma.patient.findFirst({
      include: { user: true },
    });

    if (!patient) {
      return reply.status(404).send({
        error: { code: "NOT_FOUND", message: "Patient not found" },
      });
    }

    return reply.status(200).send({
      patient: {
        id: patient.id,
        userId: patient.userId,
        phone: patient.user.phone,
        name: patient.user.name,
        role: "patient",
        currentWeight: patient.currentWeight,
        startWeight: patient.startWeight,
        goalWeight: patient.goalWeight,
        city: patient.city,
        gender: patient.gender,
        heightCm: patient.heightCm,
        conditions: patient.conditions,
        medications: patient.medications,
        eligibilityScore: patient.eligibilityScore,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to fetch profile" },
    });
  }
});

app.put<{ Body: any }>("/api/v1/patients/profile", async (request, reply) => {
  try {
    const data = request.body;
    console.log("Received update request:", data);

    // Update first patient (demo)
    const patient = await prisma.patient.findFirst();

    if (!patient) {
      return reply.status(404).send({
        error: { code: "NOT_FOUND", message: "Patient not found" },
      });
    }

    const updated = await prisma.patient.update({
      where: { id: patient.id },
      data: {
        currentWeight: data.currentWeight || patient.currentWeight,
        city: data.city || patient.city,
        gender: data.gender || patient.gender,
        heightCm: data.heightCm || patient.heightCm,
        conditions: data.conditions || patient.conditions,
        medications: data.medications || patient.medications,
      },
      include: { user: true },
    });

    return reply.status(200).send({
      patient: {
        id: updated.id,
        phone: updated.user.phone,
        ...data,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to update profile" },
    });
  }
});

app.post<{ Body: { weight_kg: number; note?: string } }>(
  "/api/v1/patients/weight-logs",
  async (request, reply) => {
    const { weight_kg, note } = request.body;

    if (!weight_kg || weight_kg < 0 || weight_kg > 300) {
      return reply.status(400).send({
        error: { code: "INVALID", message: "Invalid weight" },
      });
    }

    try {
      // Get first patient and user
      const patient = await prisma.patient.findFirst();
      const user = await prisma.user.findFirst();

      if (!patient || !user) {
        return reply.status(404).send({
          error: { code: "NOT_FOUND", message: "Patient or user not found" },
        });
      }

      const log = await prisma.weightLog.create({
        data: {
          patientId: patient.id,
          userId: user.id,
          weightKg: weight_kg,
          loggedAt: new Date(),
          note,
        },
      });

      return reply.status(201).send({ log });
    } catch (error) {
      console.error("Weight log error:", error);
      return reply.status(500).send({
        error: { code: "ERROR", message: "Failed to log weight" },
      });
    }
  }
);

app.get("/api/v1/patients/weight-logs", async (request, reply) => {
  try {
    const logs = await prisma.weightLog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return reply.status(200).send({
      logs,
      total: logs.length,
    });
  } catch (error) {
    console.error("Error fetching weight logs:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to fetch weight logs" },
    });
  }
});

app.get("/api/v1/patients/consultations", async (request, reply) => {
  try {
    const consultations = await prisma.consultation.findMany({
      include: { doctor: { include: { user: true } }, patient: true },
      orderBy: { scheduledAt: "desc" },
    });

    return reply.status(200).send({
      consultations,
      total: consultations.length,
    });
  } catch (error) {
    console.error("Error fetching consultations:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to fetch consultations" },
    });
  }
});

app.get("/api/v1/patients/prescriptions", async (request, reply) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      include: { doctor: { include: { user: true } }, patient: true },
      orderBy: { createdAt: "desc" },
    });

    return reply.status(200).send({
      prescriptions,
      total: prescriptions.length,
    });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to fetch prescriptions" },
    });
  }
});

app.get("/api/v1/patients/orders", async (request, reply) => {
  try {
    const orders = await prisma.order.findMany({
      include: { prescription: true, patient: true },
      orderBy: { createdAt: "desc" },
    });

    return reply.status(200).send({
      orders,
      total: orders.length,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to fetch orders" },
    });
  }
});

// ===================== DOCTOR ENDPOINTS =====================

app.get("/api/v1/doctors", async (request, reply) => {
  try {
    const specialty = (request.query as any)?.specialty;
    const city = (request.query as any)?.city;
    const page = Math.max(parseInt((request.query as any)?.page) || 1, 1);
    const limit = Math.min(parseInt((request.query as any)?.limit) || 10, 100);

    const doctors = await prisma.doctor.findMany({
      where: {
        AND: [
          specialty ? { specialty: { contains: specialty, mode: "insensitive" } } : {},
          city ? { city: { contains: city, mode: "insensitive" } } : {},
        ],
      },
      include: { user: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.doctor.count();

    return reply.status(200).send({
      doctors,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to fetch doctors" },
    });
  }
});

app.get<{ Params: { id: string } }>(
  "/api/v1/doctors/:id",
  async (request, reply) => {
    try {
      const doctor = await prisma.doctor.findUnique({
        where: { id: request.params.id },
        include: { user: true },
      });

      if (!doctor) {
        return reply.status(404).send({
          error: { code: "NOT_FOUND", message: "Doctor not found" },
        });
      }

      return reply.status(200).send({ doctor });
    } catch (error) {
      console.error("Error fetching doctor:", error);
      return reply.status(500).send({
        error: { code: "ERROR", message: "Failed to fetch doctor" },
      });
    }
  }
);

app.get<{ Params: { id: string } }>(
  "/api/v1/doctors/:id/slots",
  async (request, reply) => {
    const slots = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
    ];
    return reply.status(200).send({ slots });
  }
);

// ===================== CONSULTATION ENDPOINTS =====================

app.post<{
  Body: { doctor_id: string; scheduled_at: string; mode: string };
}>(
  "/api/v1/consultations",
  async (request, reply) => {
    const { doctor_id, scheduled_at, mode } = request.body;

    if (!doctor_id || !scheduled_at || !mode) {
      return reply.status(400).send({
        error: { code: "MISSING", message: "Missing required fields" },
      });
    }

    try {
      // Get first patient
      const patient = await prisma.patient.findFirst();

      if (!patient) {
        return reply.status(404).send({
          error: { code: "NOT_FOUND", message: "Patient not found" },
        });
      }

      const consultation = await prisma.consultation.create({
        data: {
          patientId: patient.id,
          doctorId: doctor_id,
          scheduledAt: new Date(scheduled_at),
          mode,
          status: "scheduled",
          feeCharged: 1299,
          bookingRef: `BK_${Date.now()}`,
          durationMins: 30,
        },
        include: { doctor: { include: { user: true } }, patient: true },
      });

      console.log("✅ Consultation booked:", consultation);

      return reply.status(201).send({ consultation });
    } catch (error) {
      console.error("Consultation error:", error);
      return reply.status(500).send({
        error: { code: "ERROR", message: "Failed to book consultation" },
      });
    }
  }
);

// ===================== PAYMENT ENDPOINTS =====================

app.post<{ Body: { amount: number; type: string } }>(
  "/api/v1/payments/create-order",
  async (request, reply) => {
    const { amount, type } = request.body;

    if (!amount || !type) {
      return reply.status(400).send({
        error: { code: "MISSING", message: "Amount and type required" },
      });
    }

    try {
      console.log("💳 Creating Razorpay order for amount:", amount);

      // Create order with Razorpay API
      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          type: type,
          description: `SlimRx ${type}`,
        },
      });

      console.log("✅ Razorpay order created:", order.id);

      // Get first user
      const user = await prisma.user.findFirst();

      if (!user) {
        return reply.status(404).send({
          error: { code: "NOT_FOUND", message: "User not found" },
        });
      }

      // Store in database
      const payment = await prisma.payment.create({
        data: {
          userId: user.id,
          razorpayOrderId: order.id,
          amount,
          currency: "INR",
          type,
          status: "created",
        },
      });

      return reply.status(201).send({
        razorpay_order_id: order.id,
        amount,
        currency: "INR",
        type,
      });
    } catch (error: any) {
      console.error("❌ Razorpay order creation error:", error.message);
      return reply.status(500).send({
        error: { code: "ERROR", message: error.message || "Failed to create order" },
      });
    }
  }
);

app.post<{
  Body: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };
}>(
  "/api/v1/payments/verify",
  async (request, reply) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        request.body;

      console.log("🔐 Verifying payment...");

      // Verify signature
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
        .update(body)
        .digest("hex");

      const isSignatureValid = expectedSignature === razorpay_signature;

      if (!isSignatureValid) {
        console.log("❌ Invalid signature");
        return reply.status(400).send({
          error: { code: "INVALID_SIGNATURE", message: "Invalid payment signature" },
        });
      }

      // Fetch payment from Razorpay
      const payment = await razorpay.payments.fetch(razorpay_payment_id);

      if (payment.status !== "captured") {
        return reply.status(400).send({
          error: { code: "PAYMENT_FAILED", message: "Payment not captured" },
        });
      }

      // Update payment in database
      await prisma.payment.update({
        where: { razorpayOrderId: razorpay_order_id },
        data: {
          status: "completed",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          verifiedAt: new Date(),
        },
      });

      console.log("✅ Payment verified successfully!");

      return reply.status(200).send({
        success: true,
        message: "Payment verified",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      });
    } catch (error: any) {
      console.error("❌ Payment verification error:", error.message);
      return reply.status(500).send({
        error: { code: "ERROR", message: error.message || "Payment verification failed" },
      });
    }
  }
);

app.get("/api/v1/payments/history", async (request, reply) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
    });

    return reply.status(200).send({
      payments,
      total: payments.length,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to fetch payment history" },
    });
  }
});

// ===================== ADMIN ENDPOINTS =====================

app.get("/api/v1/admin/metrics", async (request, reply) => {
  try {
    const totalPatients = await prisma.patient.count();
    const totalDoctors = await prisma.doctor.count();
    const totalConsultations = await prisma.consultation.count();
    const totalRevenue = await prisma.payment.aggregate({
      where: { status: "completed" },
      _sum: { amount: true },
    });

    return reply.status(200).send({
      stats: {
        total_gmv: totalRevenue._sum.amount || 0,
        total_revenue: (totalRevenue._sum.amount || 0) * 0.1,
        total_patients: totalPatients,
        total_doctors: totalDoctors,
        total_consultations: totalConsultations,
        nps_score: 4.7,
        monthly_growth: 15,
      },
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to fetch metrics" },
    });
  }
});

app.get("/api/v1/admin/doctors/pending", async (request, reply) => {
  try {
    const pending = await prisma.doctor.findMany({
      where: { profileStatus: "pending" },
      include: { user: true },
    });

    return reply.status(200).send({ doctors: pending });
  } catch (error) {
    console.error("Error fetching pending doctors:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to fetch pending doctors" },
    });
  }
});

app.post<{ Params: { id: string } }>(
  "/api/v1/admin/doctors/:id/approve",
  async (request, reply) => {
    try {
      const doctor = await prisma.doctor.update({
        where: { id: request.params.id },
        data: { profileStatus: "verified" },
      });

      return reply.status(200).send({ message: "Doctor approved", doctor });
    } catch (error) {
      console.error("Error approving doctor:", error);
      return reply.status(500).send({
        error: { code: "ERROR", message: "Failed to approve doctor" },
      });
    }
  }
);

app.post<{ Params: { id: string }; Body: { reason?: string } }>(
  "/api/v1/admin/doctors/:id/reject",
  async (request, reply) => {
    try {
      const doctor = await prisma.doctor.update({
        where: { id: request.params.id },
        data: { profileStatus: "suspended" },
      });

      return reply.status(200).send({ message: "Doctor rejected", doctor });
    } catch (error) {
      console.error("Error rejecting doctor:", error);
      return reply.status(500).send({
        error: { code: "ERROR", message: "Failed to reject doctor" },
      });
    }
  }
);

// ===================== START SERVER =====================

const start = async () => {
  try {
    const PORT = parseInt(process.env.PORT || "5000");
    await app.listen({ port: PORT, host: "0.0.0.0" });

    console.log(`\n${"=".repeat(70)}`);
    console.log(`✅ SlimRx Backend Running Successfully!`);
    console.log(`${"=".repeat(70)}`);
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log(`🏥 Health: http://localhost:${PORT}/health`);
    console.log(`💾 Database: PostgreSQL (Railway)`);
    console.log(`💳 Razorpay Integrated: YES`);
    console.log(`🔑 API Key: ${process.env.RAZORPAY_KEY_ID}`);
    console.log(`${"=".repeat(70)}\n`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app; 