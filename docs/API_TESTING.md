# API Testing Guide: Lead Enquiries & Supabase Endpoints

This document provides curl commands, payloads, and expected responses to test all lead ingestion, validation, Supabase integration, and Lucknow studio location endpoints.

---

## 1. Check System Health & Studio Location

Verifies that the backend is active, indicates the studio node in **Lucknow**, and reports Supabase integration status.

```bash
curl -X GET http://localhost:3000/api/health
```

### Expected Response:
```json
{
  "status": "healthy",
  "service": "pixelgrove-platform-api",
  "version": "1.4.0",
  "uptime": 45.2,
  "studio": {
    "location": "Lucknow, Uttar Pradesh, India",
    "node": "LKO-IST-01",
    "coordinates": "26.8467° N, 80.9462° E (Lucknow, Gomti Nagar)",
    "timezone": "Asia/Kolkata (IST)",
    "slaGuarantee": "4-6 hours"
  },
  "supabase": {
    "configured": true,
    "targetTable": "lead_enquiries",
    "schemaVersion": "20260914000000"
  },
  "leadRouting": {
    "active": true,
    "primaryTarget": "pixelgrove.ai@gmail.com",
    "secondaryTarget": "vinayak.grover@pixelgrove.ai",
    "timezone": "Asia/Kolkata (IST)",
    "emailDispatch": {
      "smtpAvailable": false,
      "formSubmitFallback": true
    }
  }
}
```

---

## 2. Test Supabase Database Connectivity

Diagnoses direct communication with the Supabase PostgreSQL database and table availability.

```bash
curl -X GET http://localhost:3000/api/test/supabase
```

### Expected Response (Configured):
```json
{
  "status": "connected",
  "configured": true,
  "connected": true,
  "tableFound": true,
  "leadCount": 12,
  "studioLocation": "Lucknow, Uttar Pradesh, India",
  "node": "LKO-IST-01"
}
```

---

## 3. Submit a Complete Lead Enquiry (`POST /api/leads`)

Submits a new project inquiry with contact name, email, phone, company, services, budget, and project details.

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rohan Verma",
    "email": "rohan@vermatech.io",
    "phone": "+91 98765 43210",
    "company": "Verma Tech Solutions",
    "services": ["web", "restaurant-tech", "ai-stack"],
    "budget": "5L-10L",
    "projectDetails": "We require a high-throughput QR restaurant ordering system and autonomous inventory forecasting for our hospitality chain."
  }'
```

### Expected Response (201 Created):
```json
{
  "success": true,
  "message": "Inquiry successfully received, stored in database, authenticated (AUTHENTICATED), and email dispatched to pixelgrove.ai@gmail.com",
  "receipt": {
    "dispatchId": "PG-491024",
    "routedTo": "pixelgrove.ai@gmail.com",
    "backupTarget": "vinayak.grover@pixelgrove.ai",
    "leadName": "Rohan Verma",
    "email": "rohan@vermatech.io",
    "phone": "+91 98765 43210",
    "location": "Lucknow, Uttar Pradesh, India",
    "studioNode": "LKO-IST-01",
    "priority": "HIGH_VELOCITY_SPRINT",
    "authentication": {
      "status": "AUTHENTICATED",
      "trustScore": 100,
      "suspiciousFlags": []
    },
    "supabase": {
      "stored": true,
      "table": "lead_enquiries"
    },
    "emailDelivery": {
      "success": true,
      "method": "FormSubmit Gateway",
      "message": "The form was submitted successfully."
    },
    "expectedResponse": "Within 4–6 hours (IST)"
  }
}
```

---

## 4. Test Form Validation & Hard Block

Verify that incomplete submissions or invalid emails are blocked with strict, helpful validation error messages:

### Invalid Email Test:
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex",
    "email": "invalid-email-address",
    "company": "Test Co",
    "services": ["web"],
    "budget": "2L-5L",
    "projectDetails": "Building an AI assistant"
  }'
```
**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "A valid email address is required. Please enter a complete email address so we can contact you.",
  "emailError": "A valid email address is required. Please enter a complete email address so we can contact you."
}
```

---

## 5. Submit a Strategy Call Booking (`POST /api/bookings`)

Books an architecture session and persists to `booking_enquiries`.

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Aditi Sen",
    "clientEmail": "aditi.sen@innovate.co",
    "clientPhone": "+91 98111 22334",
    "selectedDate": "Tomorrow",
    "selectedTime": "16:30 IST",
    "callTopic": "Generative AI Video Pipeline Architecture"
  }'
```

### Expected Response (201 Created):
```json
{
  "success": true,
  "booking": {
    "id": "MEET-819203",
    "clientName": "Aditi Sen",
    "clientEmail": "aditi.sen@innovate.co",
    "clientPhone": "+91 98111 22334",
    "selectedDate": "Tomorrow",
    "selectedTime": "16:30 IST",
    "callTopic": "Generative AI Video Pipeline Architecture",
    "routedTo": "pixelgrove.ai@gmail.com",
    "meetUrl": "https://meet.google.com/pgr-lead-disc",
    "coordinator": "Vinayak Grover (Founder and CEO of pixelgrove.ai)",
    "studioLocation": "Lucknow, Uttar Pradesh, India",
    "status": "CONFIRMED"
  },
  "studioLocation": "Lucknow, Uttar Pradesh, India",
  "supabase": {
    "stored": true,
    "table": "booking_enquiries"
  }
}
```
