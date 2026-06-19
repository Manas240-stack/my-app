import { FastifyRequest, FastifyReply } from "fastify";

export class DoctorController {
  static async searchDoctors(
    request: FastifyRequest<{ Querystring: any }>,
    reply: FastifyReply
  ) {
    try {
      const { specialty, city, available = true, page = 1, limit = 10 } = request.query;

      const doctors = [
        {
          id: "D001",
          user_id: "U_D001",
          phone: "+919876543210",
          email: "kavitha@slimrx.in",
          role: "doctor",
          name: "Dr. Kavitha Rajan",
          avatar: undefined,
          is_verified: true,
          is_active: true,
          mci_number: "MCI-234521",
          specialty: "Endocrinology",
          experience_years: 12,
          consult_fee: 999,
          languages: ["English", "Hindi", "Tamil"],
          bio: "Specialist in metabolic disorders and weight management",
          avatar_url: "https://example.com/avatar.jpg",
          rating: 4.8,
          total_reviews: 245,
          total_patients: 1200,
          is_available: true,
          profile_status: "verified",
          city: "Mumbai",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      return reply.status(200).send({
        doctors,
        total: 1,
        page,
        limit,
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "SEARCH_DOCTORS_FAILED",
          message: error instanceof Error ? error.message : "Failed to search doctors",
        },
      });
    }
  }

  static async getDoctorProfile(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      const doctor = {
        id,
        user_id: `U_${id}`,
        phone: "+919876543210",
        email: "kavitha@slimrx.in",
        role: "doctor",
        name: "Dr. Kavitha Rajan",
        avatar: undefined,
        is_verified: true,
        is_active: true,
        mci_number: "MCI-234521",
        specialty: "Endocrinology",
        experience_years: 12,
        consult_fee: 999,
        languages: ["English", "Hindi", "Tamil"],
        bio: "Specialist in metabolic disorders and weight management",
        avatar_url: "https://example.com/avatar.jpg",
        rating: 4.8,
        total_reviews: 245,
        total_patients: 1200,
        is_available: true,
        profile_status: "verified",
        city: "Mumbai",
        created_at: new Date(),
        updated_at: new Date(),
      };

      return reply.status(200).send({ doctor });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_DOCTOR_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch doctor profile",
        },
      });
    }
  }

  static async getAvailableSlots(
    request: FastifyRequest<{ Params: { id: string }; Querystring: { date?: string } }>,
    reply: FastifyReply
  ) {
    try {
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
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_SLOTS_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch time slots",
        },
      });
    }
  }

  static async registerDoctor(
    request: FastifyRequest<{ Body: any }>,
    reply: FastifyReply
  ) {
    try {
      const userId = (request as any).user?.id;
      const {
        mci_number,
        specialty,
        experience_years,
        consult_fee,
        languages,
        bio,
      } = request.body;

      if (!userId) {
        return reply.status(401).send({
          error: {
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          },
        });
      }

      if (!mci_number || !specialty || !experience_years || !consult_fee) {
        return reply.status(400).send({
          error: {
            code: "MISSING_FIELDS",
            message: "All required fields must be provided",
          },
        });
      }

      if (!/^MCI-\d+$/.test(mci_number)) {
        return reply.status(400).send({
          error: {
            code: "INVALID_MCI",
            message: "Invalid MCI number format",
          },
        });
      }

      const doctor = {
        id: `D_${Date.now()}`,
        user_id: userId,
        phone: (request as any).user?.phone,
        email: `doctor_${userId}@slimrx.in`,
        role: "doctor",
        name: "New Doctor",
        avatar: undefined,
        is_verified: false,
        is_active: true,
        mci_number,
        specialty,
        experience_years,
        consult_fee,
        languages,
        bio,
        avatar_url: undefined,
        rating: 0,
        total_reviews: 0,
        total_patients: 0,
        is_available: true,
        profile_status: "pending",
        city: undefined,
        created_at: new Date(),
        updated_at: new Date(),
      };

      return reply.status(201).send({ doctor });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "REGISTRATION_FAILED",
          message: error instanceof Error ? error.message : "Failed to register doctor",
        },
      });
    }
  }

  static async getDoctorDashboard(request: FastifyRequest, reply: FastifyReply) {
    try {
      const doctorId = (request as any).user?.id;

      if (!doctorId) {
        return reply.status(401).send({
          error: {
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          },
        });
      }

      const stats = {
        total_patients: 245,
        total_consultations: 1200,
        total_revenue: 1199000,
        average_rating: 4.8,
        pending_consultations: 5,
        this_month_earnings: 45000,
        consultations_this_week: 12,
        prescription_count: 156,
      };

      return reply.status(200).send({ stats });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_DASHBOARD_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch dashboard stats",
        },
      });
    }
  }

  static async getConsultationQueue(
    request: FastifyRequest<{ Querystring: { status?: string } }>,
    reply: FastifyReply
  ) {
    try {
      const doctorId = (request as any).user?.id;

      if (!doctorId) {
        return reply.status(401).send({
          error: {
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          },
        });
      }

      const queue = [
        {
          id: "C001",
          patient_name: "Priya Mehta",
          scheduled_at: new Date(),
          mode: "video",
          status: "scheduled",
          patient_reason: "Weight loss consultation",
          fee_charged: 999,
        },
      ];

      return reply.status(200).send({ queue });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: {
          code: "FETCH_QUEUE_FAILED",
          message: error instanceof Error ? error.message : "Failed to fetch consultation queue",
        },
      });
    }
  }
}

export default DoctorController;