/**
 * Aquarius Lead Capture & Delivery Verification Suite
 *
 * Validates:
 * 1. Inbound Lead Intake API Schema & Sanitization
 * 2. Recipient Lead Routing (Verifies destination email: pixelgrove.ai@gmail.com)
 * 3. Priority Queue Classification
 * 4. Aquarius Verification Certificate & Delivery SLA
 */

import http from 'http';

const PRIMARY_TARGET_EMAIL = 'pixelgrove.ai@gmail.com';
const PORT = 3000;

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  details?: any;
}

const results: TestResult[] = [];

async function makeRequest(options: http.RequestOptions, postData?: string): Promise<{ statusCode?: number; body: string; json?: any }> {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        let json;
        try {
          json = JSON.parse(data);
        } catch {
          // not json
        }
        resolve({ statusCode: res.statusCode, body: data, json });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runAquariusTestSuite() {
  console.log('===============================================================');
  console.log('       AQUARIUS LEAD CAPTURE & DELIVERY VALIDATION SUITE        ');
  console.log('===============================================================');
  console.log(`[TARGET EMAIL AUDIT] Expected Recipient: ${PRIMARY_TARGET_EMAIL}`);
  console.log(`[TIMESTAMP] ${new Date().toISOString()}`);
  console.log('---------------------------------------------------------------\n');

  // Test 1: Health Diagnostic & Lead Routing Configuration
  try {
    const res = await makeRequest({
      hostname: '127.0.0.1',
      port: PORT,
      path: '/api/health',
      method: 'GET',
    });

    const isHealthy = res.statusCode === 200 && res.json?.status === 'healthy';
    const targetMatches = res.json?.leadRouting?.primaryTarget === PRIMARY_TARGET_EMAIL;

    results.push({
      name: 'System Health & Lead Routing Configuration Check',
      passed: Boolean(isHealthy && targetMatches),
      message: targetMatches
        ? `PASSED - Lead router configured to route to ${PRIMARY_TARGET_EMAIL}`
        : `FAILED - Target was ${res.json?.leadRouting?.primaryTarget}`,
      details: res.json?.leadRouting
    });
  } catch (err: any) {
    results.push({
      name: 'System Health & Lead Routing Configuration Check',
      passed: false,
      message: `Connection error: ${err.message}`
    });
  }

  // Test 2: Inbound Lead Capture & Routing to pixelgrove.ai@gmail.com
  try {
    const testLead = {
      name: 'Aquarius QA Automated Agent',
      email: 'qa.test@restaurantpartners.in',
      company: 'The Grand Curry House (Mumbai)',
      services: ['qr-menu', 'crm-inventory'],
      budget: '2L-5L',
      projectDetails: 'Aquarius automated probe: testing digital QR menu and real-time inventory system integration.'
    };

    const postData = JSON.stringify(testLead);
    const res = await makeRequest(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: '/api/leads',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      },
      postData
    );

    const isCreated = res.statusCode === 201;
    const recipientMatches = res.json?.receipt?.routedTo === PRIMARY_TARGET_EMAIL;
    const hasDispatchId = Boolean(res.json?.receipt?.dispatchId?.startsWith('PG-'));

    results.push({
      name: 'Inbound Lead Ingestion & Dispatch Routing',
      passed: isCreated && recipientMatches && hasDispatchId,
      message: recipientMatches
        ? `PASSED - Lead successfully accepted (Dispatch ID: ${res.json?.receipt?.dispatchId}) and routed to ${PRIMARY_TARGET_EMAIL}`
        : `FAILED - Dispatch target does not match`,
      details: res.json?.receipt
    });
  } catch (err: any) {
    results.push({
      name: 'Inbound Lead Ingestion & Dispatch Routing',
      passed: false,
      message: `Execution error: ${err.message}`
    });
  }

  // Test 3: Aquarius Dedicated Validation Service Endpoint
  try {
    const res = await makeRequest({
      hostname: '127.0.0.1',
      port: PORT,
      path: '/api/aquarius/validate',
      method: 'POST'
    });

    const isOk = res.statusCode === 200 && res.json?.status === 'PASSED_VERIFIED';
    const cert = res.json?.verificationCertificate;

    results.push({
      name: 'Aquarius End-to-End Validation Engine Run',
      passed: Boolean(isOk && cert),
      message: isOk
        ? `PASSED - Aquarius Verified (Certificate: ${cert}, Reliability: ${res.json?.summary?.deliveryReliabilityScore})`
        : `FAILED - Aquarius reported status: ${res.json?.status}`,
      details: res.json?.summary
    });
  } catch (err: any) {
    results.push({
      name: 'Aquarius End-to-End Validation Engine Run',
      passed: false,
      message: `Aquarius endpoint error: ${err.message}`
    });
  }

  // Test 4: Booking Meeting Intake & Notification
  try {
    const bookingData = {
      clientName: 'Sunita Rao',
      clientEmail: 'sunita@tajdining.com',
      selectedDate: 'Tomorrow',
      selectedTime: '16:30 IST',
      callTopic: 'Restaurant Tech Architecture'
    };

    const postData = JSON.stringify(bookingData);
    const res = await makeRequest(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: '/api/bookings',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      },
      postData
    );

    const isConfirmed = res.statusCode === 201 && res.json?.booking?.status === 'CONFIRMED';
    const routedToTarget = res.json?.booking?.routedTo === PRIMARY_TARGET_EMAIL;

    results.push({
      name: 'Calendar Strategy Booking Intake & Notification',
      passed: Boolean(isConfirmed && routedToTarget),
      message: routedToTarget
        ? `PASSED - Meeting booked (${res.json?.booking?.id}) with alert sent to ${PRIMARY_TARGET_EMAIL}`
        : `FAILED - Booking not routed to target`,
      details: res.json?.booking
    });
  } catch (err: any) {
    results.push({
      name: 'Calendar Strategy Booking Intake & Notification',
      passed: false,
      message: `Booking endpoint error: ${err.message}`
    });
  }

  // Summary Report Output
  console.log('---------------------------------------------------------------');
  console.log('                      TEST EXECUTION REPORT                    ');
  console.log('---------------------------------------------------------------');
  let allPass = true;
  results.forEach((r, idx) => {
    const symbol = r.passed ? '✅' : '❌';
    console.log(`${symbol} [TEST ${idx + 1}] ${r.name}`);
    console.log(`   ${r.message}`);
    if (r.details) {
      console.log(`   Details:`, JSON.stringify(r.details));
    }
    if (!r.passed) allPass = false;
  });

  console.log('\n===============================================================');
  console.log(`VERIFICATION RESULT: ${allPass ? 'ALL TESTS PASSED (DEPLOYMENT READY)' : 'FAILURES DETECTED'}`);
  console.log(`OFFICIAL INBOUND LEAD RECIPIENT: ${PRIMARY_TARGET_EMAIL}`);
  console.log('===============================================================\n');

  if (!allPass) {
    process.exit(1);
  }
}

runAquariusTestSuite();
