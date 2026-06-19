const API_BASE_URL = "http://localhost:5000/api/v1";

export const authAPI = {
  sendOTP: async (phone: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    return response.json();
  },

  verifyOTP: async (phone: string, otp: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },
};

export const patientAPI = {
  getProfile: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/patients/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  updateProfile: async (token: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/patients/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },

  logWeight: async (token: string, weight_kg: number, note?: string) => {
    const response = await fetch(`${API_BASE_URL}/patients/weight-logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ weight_kg, note }),
    });
    return response.json();
  },

  getWeightLogs: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/patients/weight-logs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  getConsultations: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/patients/consultations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  getPrescriptions: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/patients/prescriptions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  getOrders: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/patients/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};

export const doctorAPI = {
  searchDoctors: async (specialty?: string, city?: string) => {
    let url = `${API_BASE_URL}/doctors`;
    const params = new URLSearchParams();
    if (specialty) params.append("specialty", specialty);
    if (city) params.append("city", city);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await fetch(url);
    return response.json();
  },

  getDoctorDetails: async (doctorId: string) => {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`);
    return response.json();
  },

  getDoctorSlots: async (doctorId: string) => {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}/slots`);
    return response.json();
  },
};

export const consultationAPI = {
  bookConsultation: async (
    token: string,
    doctor_id: string,
    scheduled_at: string,
    mode: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/consultations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ doctor_id, scheduled_at, mode }),
    });
    return response.json();
  },
};

export const paymentAPI = {
  createOrder: async (token: string, amount: number, type: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount, type }),
    });
    return response.json();
  },

  verifyPayment: async (
    token: string,
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/payments/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }),
    });
    return response.json();
  },
};

export const adminAPI = {
  getMetrics: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/metrics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  getPendingDoctors: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/doctors/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  approveDoctor: async (token: string, doctorId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/doctors/${doctorId}/approve`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.json();
  },

  rejectDoctor: async (token: string, doctorId: string, reason?: string) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/doctors/${doctorId}/reject`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      }
    );
    return response.json();
  },
};