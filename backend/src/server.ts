import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import crypto from "crypto";
import Razorpay from "razorpay";

const app = Fastify({ logger: true });

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

// IN-MEMORY STORAGE
const otpStore = new Map<string, { otp: string; expiresAt: number }>();
const usersDb = new Map<string, any>();
const doctorsDb = new Map<string, any>();
const patientsDb = new Map<string, any>();
const consultationsDb = new Map<string, any>();
const prescriptionsDb = new Map<string, any>();
const ordersDb = new Map<string, any>();
const weightLogsDb = new Map<string, any>();
const paymentsDb = new Map<string, any>();

// MOCK DATA
const mockDoctors: any[] = [
  {
    id: "D001",
    phone: "+919876543210",
    email: "kavitha@slimrx.in",
    role: "doctor",
    name: "Dr. Kavitha Rajan",
    is_verified: true,
    is_active: true,
    mci_number: "MCI-234521",
    specialty: "Endocrinology",
    experience_years: 12,
    consult_fee: 999,
    rating: 4.8,
    total_reviews: 245,
    total_patients: 1200,
    is_available: true,
    profile_status: "verified",
    city: "Mumbai",
    languages: ["English", "Hindi", "Tamil"],
    bio: "Specialist in metabolic disorders",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "D002",
    phone: "+919876543211",
    email: "ramesh@slimrx.in",
    role: "doctor",
    name: "Dr. Ramesh Kumar",
    is_verified: true,
    is_active: true,
    mci_number: "MCI-234522",
    specialty: "Internal Medicine",
    experience_years: 15,
    consult_fee: 1199,
    rating: 4.9,
    total_reviews: 312,
    total_patients: 1500,
    is_available: true,
    profile_status: "verified",
    city: "Delhi",
    languages: ["English", "Hindi"],
    bio: "Expert in diabetes management",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "D003",
    phone: "+919876543212",
    email: "priya@slimrx.in",
    role: "doctor",
    name: "Dr. Priya Sharma",
    is_verified: true,
    is_active: true,
    mci_number: "MCI-234523",
    specialty: "Cardiology",
    experience_years: 10,
    consult_fee: 1299,
    rating: 4.7,
    total_reviews: 189,
    total_patients: 890,
    is_available: true,
    profile_status: "verified",
    city: "Bangalore",
    languages: ["English", "Kannada"],
    bio: "Cardiologist with lifestyle focus",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

mockDoctors.forEach((doc) => doctorsDb.set(doc.id, doc));

// ===================== HEALTH CHECK =====================

app.get("/health", async (request, reply) => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };
});

// ===================== AUTH ENDPOINTS =====================

app.post("/api/v1/auth/send-otp", async (request, reply) => {
  const body = request.body as { phone?: string };
  const { phone } = body;

  if (!phone) {
    return reply.status(400).send({
      error: { code: "MISSING_PHONE", message: "Phone is required" },
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
  console.log(`[DEV] OTP: ${otp} for ${phone}`);

  return reply.status(200).send({
    message: "OTP sent successfully",
    expires_in: 300,
  });
});

app.post("/api/v1/auth/verify-otp", async (request, reply) => {
  const body = request.body as { phone?: string; otp?: string };
  const { phone, otp } = body;

  if (!phone || !otp) {
    return reply.status(400).send({
      error: { code: "MISSING", message: "Phone and OTP required" },
    });
  }

  const stored = otpStore.get(phone);
  if (!stored || stored.expiresAt < Date.now()) {
    return reply.status(401).send({
      error: { code: "OTP_EXPIRED", message: "OTP expired" },
    });
  }

  if (stored.otp !== otp) {
    return reply.status(401).send({
      error: { code: "INVALID_OTP", message: "Invalid OTP" },
    });
  }

  otpStore.delete(phone);

  let user = Array.from(usersDb.values()).find((u: any) => u.phone === phone);

  if (!user) {
    user = {
      id: `U_${Date.now()}`,
      phone,
      role: "patient",
      name: "User",
      email: `user_${phone}@slimrx.in`,
      is_verified: true,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    usersDb.set(user.id, user);

    const patient = {
      ...user,
      current_weight: 65.5,
      start_weight: 75.0,
      goal_weight: 60.0,
      city: "Mumbai",
      gender: "female",
      height_cm: 165,
      conditions: ["Type 2 Diabetes"],
      medications: "Metformin 500mg",
    };
    patientsDb.set(user.id, patient);
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
});

app.post("/api/v1/auth/refresh", async (request, reply) => {
  const body = request.body as { refresh_token?: string };
  const { refresh_token } = body;

  if (!refresh_token) {
    return reply.status(400).send({
      error: { code: "MISSING", message: "Token required" },
    });
  }

  const accessToken = `token_${Date.now()}`;
  return reply.status(200).send({ access_token: accessToken });
});

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
  return reply.status(200).send({
    patient: {
      id: "U1",
      phone: "+919876543210",
      name: "Priya Mehta",
      role: "patient",
      current_weight: 65.5,
      start_weight: 75.0,
      goal_weight: 60.0,
      city: "Mumbai",
      gender: "female",
      height_cm: 165,
      conditions: ["Type 2 Diabetes"],
      medications: "Metformin 500mg",
      eligibility_score: 85,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
});

app.put("/api/v1/patients/profile", async (request, reply) => {
  try {
    const data = request.body as Record<string, unknown>;
    console.log("Received update request:", data);

    return reply.status(200).send({
      patient: {
        id: "U1",
        phone: "+919876543210",
        ...data,
        updated_at: new Date(),
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    return reply.status(500).send({
      error: { code: "ERROR", message: "Failed to update profile" },
    });
  }
});

app.post("/api/v1/patients/weight-logs", async (request, reply) => {
  const body = request.body as { weight_kg?: number; note?: string };
  const { weight_kg, note } = body;

  if (!weight_kg || weight_kg < 0 || weight_kg > 300) {
    return reply.status(400).send({
      error: { code: "INVALID", message: "Invalid weight" },
    });
  }

  const log = {
    id: `WL_${Date.now()}`,
    patient_id: "U1",
    weight_kg,
    logged_at: new Date(),
    note,
    created_at: new Date(),
  };

  weightLogsDb.set(log.id, log);
  return reply.status(201).send({ log });
});

app.get("/api/v1/patients/weight-logs", async (request, reply) => {
  const logs = Array.from(weightLogsDb.values());
  return reply.status(200).send({
    logs: logs.length > 0 ? logs : [],
    total: logs.length,
  });
});

app.get("/api/v1/patients/consultations", async (request, reply) => {
  const consultations = Array.from(consultationsDb.values());
  return reply.status(200).send({
    consultations: consultations.length > 0 ? consultations : [],
    total: consultations.length,
  });
});

app.get("/api/v1/patients/prescriptions", async (request, reply) => {
  const prescriptions = Array.from(prescriptionsDb.values());
  return reply.status(200).send({
    prescriptions: prescriptions.length > 0 ? prescriptions : [],
    total: prescriptions.length,
  });
});

app.get("/api/v1/patients/orders", async (request, reply) => {
  const orders = Array.from(ordersDb.values());
  return reply.status(200).send({
    orders: orders.length > 0 ? orders : [],
    total: orders.length,
  });
});

// ===================== DOCTOR ENDPOINTS =====================

app.get("/api/v1/doctors", async (request, reply) => {
  const query = request.query as {
    specialty?: string;
    city?: string;
    page?: string;
    limit?: string;
  };
  const specialty = query?.specialty;
  const city = query?.city;
  const page = Math.max(parseInt(query?.page || "1"), 1);
  const limit = Math.min(parseInt(query?.limit || "10"), 100);

  let doctors = Array.from(doctorsDb.values());

  if (specialty) {
    doctors = doctors.filter((d: any) =>
      d.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
  }

  if (city) {
    doctors = doctors.filter((d: any) =>
      d.city?.toLowerCase().includes(city.toLowerCase())
    );
  }

  const offset = (page - 1) * limit;
  const paginated = doctors.slice(offset, offset + limit);

  return reply.status(200).send({
    doctors: paginated,
    total: doctors.length,
    page,
    limit,
  });
});

app.get("/api/v1/doctors/:id", async (request, reply) => {
  const params = request.params as { id: string };
  const doctor = doctorsDb.get(params.id);

  if (!doctor) {
    return reply.status(404).send({
      error: { code: "NOT_FOUND", message: "Doctor not found" },
    });
  }

  return reply.status(200).send({ doctor });
});

app.get("/api/v1/doctors/:id/slots", async (request, reply) => {
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
});

// ===================== CONSULTATION ENDPOINTS =====================

app.post("/api/v1/consultations", async (request, reply) => {
  const body = request.body as {
    doctor_id?: string;
    scheduled_at?: string;
    mode?: string;
  };
  const { doctor_id, scheduled_at, mode } = body;

  if (!doctor_id || !scheduled_at || !mode) {
    return reply.status(400).send({
      error: { code: "MISSING", message: "Missing required fields" },
    });
  }

  const consultation = {
    id: `C_${Date.now()}`,
    patient_id: "U1",
    doctor_id,
    scheduled_at: new Date(scheduled_at),
    mode,
    status: "scheduled",
    fee_charged: 1299,
    booking_ref: `BK_${Date.now()}`,
    duration_mins: 30,
    created_at: new Date(),
    updated_at: new Date(),
  };

  consultationsDb.set(consultation.id, consultation);
  console.log("✅ Consultation booked:", consultation);

  return reply.status(201).send({ consultation });
});

// ===================== PAYMENT ENDPOINTS =====================

app.post("/api/v1/payments/create-order", async (request, reply) => {
  const body = request.body as { amount?: number; type?: string };
  const { amount, type } = body;

  if (!amount || !type) {
    return reply.status(400).send({
      error: { code: "MISSING", message: "Amount and type required" },
    });
  }

  try {
    console.log("💳 Creating Razorpay order for amount:", amount);
    console.log("   Using Key ID:", process.env.RAZORPAY_KEY_ID);

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

    console.log("✅ Razorpay order created successfully:", order.id);

    // Store in database
    const payment = {
      id: order.id,
      razorpay_order_id: order.id,
      amount,
      currency: "INR",
      type,
      status: "created",
      created_at: new Date(),
    };

    paymentsDb.set(order.id, payment);

    return reply.status(201).send({
      razorpay_order_id: order.id,
      amount,
      currency: "INR",
      type,
    });
  } catch (error: any) {
    console.error("❌ Razorpay order creation error:", error.message);
    return reply.status(500).send({
      error: {
        code: "ERROR",
        message: error.message || "Failed to create order",
      },
    });
  }
});

app.post("/api/v1/payments/verify", async (request, reply) => {
  try {
    const body = request.body as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
    };
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return reply.status(400).send({
        error: { code: "MISSING", message: "Missing payment details" },
      });
    }

    console.log("🔐 Verifying payment...");
    console.log("   Order ID:", razorpay_order_id);
    console.log("   Payment ID:", razorpay_payment_id);

    // Verify signature
    const body_str = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body_str)
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;
    console.log("   Signature valid:", isSignatureValid);

    if (!isSignatureValid) {
      console.log("❌ Invalid signature");
      return reply.status(400).send({
        error: {
          code: "INVALID_SIGNATURE",
          message: "Invalid payment signature",
        },
      });
    }

    // Fetch payment from Razorpay to verify
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    console.log("   Payment status from Razorpay:", payment.status);

    if (payment.status !== "captured") {
      console.log("❌ Payment not captured");
      return reply.status(400).send({
        error: { code: "PAYMENT_FAILED", message: "Payment not captured" },
      });
    }

    // Update payment in database
    const orderData = paymentsDb.get(razorpay_order_id);
    if (orderData) {
      orderData.status = "completed";
      orderData.payment_id = razorpay_payment_id;
      orderData.verified_at = new Date();
      paymentsDb.set(razorpay_order_id, orderData);
    }

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
      error: {
        code: "ERROR",
        message: error.message || "Payment verification failed",
      },
    });
  }
});

app.get("/api/v1/payments/history", async (request, reply) => {
  const payments = Array.from(paymentsDb.values());
  return reply.status(200).send({
    payments: payments.length > 0 ? payments : [],
    total: payments.length,
  });
});

// ===================== ADMIN ENDPOINTS =====================

app.get("/api/v1/admin/metrics", async (request, reply) => {
  return reply.status(200).send({
    stats: {
      total_gmv: 50000000,
      total_revenue: 5000000,
      total_patients: usersDb.size,
      total_doctors: doctorsDb.size,
      total_consultations: consultationsDb.size,
      nps_score: 4.7,
      monthly_growth: 15,
    },
  });
});

app.get("/api/v1/admin/doctors/pending", async (request, reply) => {
  const pending = Array.from(doctorsDb.values()).filter(
    (d: any) => d.profile_status === "pending"
  );
  return reply.status(200).send({ doctors: pending });
});

app.post("/api/v1/admin/doctors/:id/approve", async (request, reply) => {
  const params = request.params as { id: string };
  const { id } = params;
  const doctor = doctorsDb.get(id);

  if (!doctor) {
    return reply.status(404).send({
      error: { code: "NOT_FOUND", message: "Doctor not found" },
    });
  }

  doctor.profile_status = "verified";
  doctorsDb.set(id, doctor);

  return reply.status(200).send({ message: "Doctor approved" });
});

app.post("/api/v1/admin/doctors/:id/reject", async (request, reply) => {
  const params = request.params as { id: string };
  const { id } = params;
  const doctor = doctorsDb.get(id);

  if (!doctor) {
    return reply.status(404).send({
      error: { code: "NOT_FOUND", message: "Doctor not found" },
    });
  }

  doctor.profile_status = "suspended";
  doctorsDb.set(id, doctor);

  return reply.status(200).send({ message: "Doctor rejected" });
});

// ===================== START SERVER =====================

const start = async () => {
  try {
    const PORT = parseInt(process.env.PORT || "5000");
    await app.listen({ port: PORT, host: "0.0.0.0" });

    console.log(`\n${"=".repeat(70)}`);
    console.log(`✅ SlimRx Backend Running Successfully!`);
    console.log(`${"=".repeat(70)}`);
    console.log(`🚀 Server: http://my-app-production-ac5b.up.railway.app:${5000}`);
    console.log(`🏥 Health: http://my-app-production-ac5b.up.railway.app:${5000}/health`);
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
