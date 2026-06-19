import { FastifyRequest, FastifyReply } from "fastify";

export class PatientController {
  static async getProfile(request: FastifyRequest, reply: FastifyReply) {
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

      const patient = {
        id: userId,
        user_id: userId,
        phone: (request as any).user?.phone,
        role: "patient",
        name: "Priya Mehta",
        email: "priya@example.com",
        is_verified: true,
        is_active: true,
        date_of_birth: new Date("1995-05-15"),
        gender: "female",
        height_cm: 165,
        current_weight: 65.5,
        start_weight: 75.0,
        goal_weight: 60.0,
        city: "Mumbai",
        pincode: "400001",
        conditions: ["Type 2 Diabetes"],
        medications: "Metformin 500mg",
        eligibility_score: 85,
        assigned_doctor_id: "D001",
        created_at: new Date(),
        updated_at: new Date(),
      };

      return reply.status(200).send({ patient });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_PROFILE_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch profile",
        },
      });
    }
  }

  static async updateProfile(
    request: FastifyRequest<{ Body: any }>,
    reply: FastifyReply
  ) {
    try {
      const userId = (request as any).user?.id;
      const updateData = request.body;

      if (!userId) {
        return reply.status(401).send({
          error: {
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          },
        });
      }

      const patient = {
        id: userId,
        ...updateData,
        updated_at: new Date(),
      };

      return reply.status(200).send({ patient });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "UPDATE_PROFILE_FAILED",
          message: error instanceof Error ? error.message : "Failed to update profile",
        },
      });
    }
  }

  static async logWeight(
    request: FastifyRequest<{ Body: { weight_kg: number; note?: string; logged_at?: Date } }>,
    reply: FastifyReply
  ) {
    try {
      const userId = (request as any).user?.id;
      const { weight_kg, note, logged_at } = request.body;

      if (!userId) {
        return reply.status(401).send({
          error: {
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          },
        });
      }

      if (!weight_kg || weight_kg < 0 || weight_kg > 300) {
        return reply.status(400).send({
          error: {
            code: "INVALID_WEIGHT",
            message: "Weight must be between 0 and 300 kg",
          },
        });
      }

      const log = {
        id: `WL_${Date.now()}`,
        patient_id: userId,
        weight_kg,
        logged_at: logged_at || new Date(),
        note,
        created_at: new Date(),
      };

      return reply.status(201).send({ log });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "LOG_WEIGHT_FAILED",
          message: error instanceof Error ? error.message : "Failed to log weight",
        },
      });
    }
  }

  static async getWeightLogs(
    request: FastifyRequest<{ Querystring: { limit?: string; offset?: string } }>,
    reply: FastifyReply
  ) {
    try {
      const userId = (request as any).user?.id;
      const limit = parseInt(request.query.limit || "10");
      const offset = parseInt(request.query.offset || "0");

      if (!userId) {
        return reply.status(401).send({
          error: {
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          },
        });
      }

      const logs = [
        {
          id: "WL_001",
          patient_id: userId,
          weight_kg: 65.5,
          logged_at: new Date(),
          note: "After workout",
          created_at: new Date(),
        },
      ];

      return reply.status(200).send({ logs, total: 1 });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_LOGS_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch weight logs",
        },
      });
    }
  }

  static async getConsultations(
    request: FastifyRequest<{ Querystring: { status?: string; limit?: string; page?: string } }>,
    reply: FastifyReply
  ) {
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

      const consultations = [
        {
          id: "C001",
          patient_id: userId,
          doctor_id: "D001",
          scheduled_at: new Date("2025-06-15T14:00:00Z"),
          mode: "video",
          status: "scheduled",
          fee_charged: 1299,
          booking_ref: "BK001",
          video_room_id: undefined,
          duration_mins: 30,
          doctor_notes: undefined,
          patient_reason: "Weight loss consultation",
          payment_id: "PAY001",
          reminder_sent: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      return reply.status(200).send({ consultations, total: 1 });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_CONSULTATIONS_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch consultations",
        },
      });
    }
  }

  static async getPrescriptions(
    request: FastifyRequest<{ Querystring: { status?: string; limit?: string } }>,
    reply: FastifyReply
  ) {
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

      const prescriptions = [
        {
          id: "RX001",
          rx_number: "RX-2025-001",
          consultation_id: "C001",
          doctor_id: "D001",
          patient_id: userId,
          medication_id: "MED001",
          medication_name: "SemaSlim™ 7mg",
          dose: "7mg once daily",
          frequency: "daily",
          duration_days: 30,
          refills_allowed: 3,
          refills_used: 0,
          issued_at: new Date(),
          valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          status: "active",
          digital_signature: "sig_123",
          pdf_url: "https://example.com/rx001.pdf",
          created_at: new Date(),
        },
      ];

      return reply.status(200).send({ prescriptions, total: 1 });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_PRESCRIPTIONS_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch prescriptions",
        },
      });
    }
  }

  static async getOrders(
    request: FastifyRequest<{ Querystring: { status?: string; limit?: string } }>,
    reply: FastifyReply
  ) {
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

      const orders = [
        {
          id: "O001",
          patient_id: userId,
          prescription_id: "RX001",
          payment_id: "PAY001",
          order_number: "ORD-2025-001",
          medication_id: "MED001",
          quantity: 1,
          amount: 1299,
          status: "dispatched",
          delivery_address: {
            full_name: "Priya Mehta",
            phone: "+919876543210",
            address_line1: "123 Main St",
            address_line2: "Apt 4B",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
          },
          tracking_number: "TRK123456789",
          courier: "FedEx",
          dispatched_at: new Date(),
          delivered_at: undefined,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      return reply.status(200).send({ orders, total: 1 });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_ORDERS_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch orders",
        },
      });
    }
  }
}

export default PatientController;