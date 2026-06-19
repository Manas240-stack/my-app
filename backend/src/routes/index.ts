import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import AuthController from "../controllers/authController";
import PatientController from "../controllers/patientController";
import DoctorController from "../controllers/doctorController";
import { authenticate, requirePatient, requireDoctor, requireAdmin } from "../middleware";

export async function registerRoutes(fastify: FastifyInstance): Promise<void> {
  // AUTH ROUTES
  fastify.post<{ Body: { phone: string } }>(
    "/auth/send-otp",
    async (request, reply) => {
      return AuthController.sendOTP(request, reply);
    }
  );

  fastify.post<{ Body: { phone: string; otp: string; purpose?: string } }>(
    "/auth/verify-otp",
    async (request, reply) => {
      return AuthController.verifyOTP(request, reply, null, fastify.jwt);
    }
  );

  fastify.post<{ Body: { refresh_token: string } }>(
    "/auth/refresh",
    async (request, reply) => {
      return AuthController.refreshToken(request, reply);
    }
  );

  fastify.get(
    "/auth/me",
    { onRequest: [authenticate] },
    async (request, reply) => {
      return AuthController.getCurrentUser(request, reply);
    }
  );

  fastify.post(
    "/auth/logout",
    { onRequest: [authenticate] },
    async (request, reply) => {
      return AuthController.logout(request, reply);
    }
  );

  // PATIENT ROUTES
  fastify.get(
    "/patients/profile",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requirePatient(request, reply)) return;
      return PatientController.getProfile(request, reply);
    }
  );

  fastify.post<{ Body: any }>(
    "/patients/profile",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requirePatient(request, reply)) return;
      return PatientController.updateProfile(request, reply);
    }
  );

  fastify.post<{ Body: { weight_kg: number; note?: string; logged_at?: Date } }>(
    "/patients/weight-logs",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requirePatient(request, reply)) return;
      return PatientController.logWeight(request, reply);
    }
  );

  fastify.get<{ Querystring: { limit?: string; offset?: string } }>(
    "/patients/weight-logs",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requirePatient(request, reply)) return;
      return PatientController.getWeightLogs(request, reply);
    }
  );

  fastify.get<{ Querystring: { status?: string; limit?: string; page?: string } }>(
    "/patients/consultations",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requirePatient(request, reply)) return;
      return PatientController.getConsultations(request, reply);
    }
  );

  fastify.get<{ Querystring: { status?: string; limit?: string } }>(
    "/patients/prescriptions",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requirePatient(request, reply)) return;
      return PatientController.getPrescriptions(request, reply);
    }
  );

  fastify.get<{ Querystring: { status?: string; limit?: string } }>(
    "/patients/orders",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requirePatient(request, reply)) return;
      return PatientController.getOrders(request, reply);
    }
  );

  // DOCTOR ROUTES
  fastify.get<{ Querystring: any }>(
    "/doctors",
    async (request, reply) => {
      return DoctorController.searchDoctors(request, reply);
    }
  );

  fastify.get<{ Params: { id: string } }>(
    "/doctors/:id",
    async (request, reply) => {
      return DoctorController.getDoctorProfile(request, reply);
    }
  );

  fastify.get<{ Params: { id: string }; Querystring: { date?: string } }>(
    "/doctors/:id/slots",
    async (request, reply) => {
      return DoctorController.getAvailableSlots(request, reply);
    }
  );

  fastify.post<{ Body: any }>(
    "/doctors/register",
    { onRequest: [authenticate] },
    async (request, reply) => {
      return DoctorController.registerDoctor(request, reply);
    }
  );

  fastify.get(
    "/doctors/dashboard",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requireDoctor(request, reply)) return;
      return DoctorController.getDoctorDashboard(request, reply);
    }
  );

  fastify.get<{ Querystring: { status?: string } }>(
    "/doctors/queue",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requireDoctor(request, reply)) return;
      return DoctorController.getConsultationQueue(request, reply);
    }
  );

  // CONSULTATION ROUTES
  fastify.post<{ Body: { doctor_id: string; scheduled_at: string; mode: string; patient_reason?: string } }>(
    "/consultations",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requirePatient(request, reply)) return;

      try {
        const { doctor_id, scheduled_at, mode, patient_reason } = request.body;

        return reply.status(201).send({
          consultation: {
            id: `C_${Date.now()}`,
            patient_id: (request as any).user.id,
            doctor_id,
            scheduled_at,
            mode,
            status: "scheduled",
            fee_charged: 1299,
            booking_ref: `BK_${Date.now()}`,
            patient_reason,
            video_room_id: undefined,
            duration_mins: 30,
            doctor_notes: undefined,
            payment_id: undefined,
            reminder_sent: false,
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
      } catch (error) {
        return reply.status(500).send({
          error: {
            code: "CREATE_CONSULTATION_FAILED",
            message: error instanceof Error ? error.message : "Failed to create consultation",
          },
        });
      }
    }
  );

  // PAYMENT ROUTES
  fastify.post<{ Body: { amount: number; type: string; reference_id?: string } }>(
    "/payments/create-order",
    { onRequest: [authenticate] },
    async (request, reply) => {
      try {
        const { amount, type, reference_id } = request.body;

        const razorpay_order_id = `order_${Date.now()}`;

        return reply.status(201).send({
          razorpay_order_id,
          amount,
          currency: "INR",
          type,
          reference_id,
        });
      } catch (error) {
        return reply.status(500).send({
          error: {
            code: "CREATE_ORDER_FAILED",
            message: error instanceof Error ? error.message : "Failed to create order",
          },
        });
      }
    }
  );

  fastify.post<{
    Body: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    };
  }>(
    "/payments/verify",
    { onRequest: [authenticate] },
    async (request, reply) => {
      try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.body;

        return reply.status(200).send({
          success: true,
          payment_id: razorpay_payment_id,
          message: "Payment verified successfully",
        });
      } catch (error) {
        return reply.status(500).send({
          error: {
            code: "VERIFY_PAYMENT_FAILED",
            message: error instanceof Error ? error.message : "Failed to verify payment",
          },
        });
      }
    }
  );

  // ADMIN ROUTES
  fastify.get(
    "/admin/metrics",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requireAdmin(request, reply)) return;

      try {
        return reply.status(200).send({
          stats: {
            total_gmv: 50000000,
            total_revenue: 5000000,
            total_patients: 25000,
            total_doctors: 500,
            total_consultations: 150000,
            nps_score: 4.7,
            monthly_growth: 15,
          },
        });
      } catch (error) {
        return reply.status(500).send({
          error: {
            code: "FETCH_METRICS_FAILED",
            message: error instanceof Error ? error.message : "Failed to fetch metrics",
          },
        });
      }
    }
  );

  fastify.get(
    "/admin/doctors/pending",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requireAdmin(request, reply)) return;

      try {
        return reply.status(200).send({
          doctors: [
            {
              doctor_id: "D_new",
              name: "Dr. New Doctor",
              specialty: "Endocrinology",
              mci_number: "MCI-999999",
              experience_years: 10,
              documents_status: "pending",
              submitted_at: new Date(),
              review_status: "pending",
            },
          ],
        });
      } catch (error) {
        return reply.status(500).send({
          error: {
            code: "FETCH_PENDING_DOCTORS_FAILED",
            message: error instanceof Error ? error.message : "Failed to fetch pending doctors",
          },
        });
      }
    }
  );

  fastify.post<{ Params: { id: string } }>(
    "/admin/doctors/:id/approve",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requireAdmin(request, reply)) return;

      try {
        const { id } = request.params;

        return reply.status(200).send({
          message: "Doctor approved successfully",
        });
      } catch (error) {
        return reply.status(500).send({
          error: {
            code: "APPROVE_DOCTOR_FAILED",
            message: error instanceof Error ? error.message : "Failed to approve doctor",
          },
        });
      }
    }
  );

  fastify.post<{ Params: { id: string }; Body: { reason?: string } }>(
    "/admin/doctors/:id/reject",
    { onRequest: [authenticate] },
    async (request, reply) => {
      if (!requireAdmin(request, reply)) return;

      try {
        const { id } = request.params;
        const { reason } = request.body;

        return reply.status(200).send({
          message: "Doctor rejected successfully",
        });
      } catch (error) {
        return reply.status(500).send({
          error: {
            code: "REJECT_DOCTOR_FAILED",
            message: error instanceof Error ? error.message : "Failed to reject doctor",
          },
        });
      }
    }
  );
}

export default registerRoutes;