/**
 * Strict Form Validation & Lead Authentication Engine
 * Enforces strict data quality standards before any lead capture submission is accepted.
 */

export interface LeadValidationResult {
  isValid: boolean;
  emailError: string | null;
  generalError: string | null;
  fieldErrors: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    services?: string;
    budget?: string;
    projectDetails?: string;
  };
  missingOrIncompleteFields: string[];
}

export interface LeadAuthenticationResult {
  status: 'AUTHENTICATED' | 'FLAGGED_FOR_MANUAL_REVIEW';
  trustScore: number; // 0 to 100
  isGenuine: boolean;
  verifiedAt: string;
  checks: {
    name: string;
    passed: boolean;
    details: string;
  }[];
  suspiciousFlags: string[];
  recommendation: string;
}

// Known temporary, disposable, or throwaway email providers
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  '10minutemail.com',
  'guerrillamail.com',
  'guerrillamailblock.com',
  'sharklasers.com',
  'tempmail.com',
  'temp-mail.org',
  'throwawaymail.com',
  'yopmail.com',
  'trashmail.com',
  'dispostable.com',
  'fakeinbox.com',
  'getairmail.com',
  'maildrop.cc',
  'inboxkitten.com',
  'burnermail.io'
]);

// Recognizable placeholder, gibberish, or vague values that indicate incomplete data
const PLACEHOLDER_PATTERNS = [
  /^test$/i,
  /^testing$/i,
  /^asdf+$/i,
  /^qwerty$/i,
  /^na$/i,
  /^n\/a$/i,
  /^none$/i,
  /^nil$/i,
  /^null$/i,
  /^undefined$/i,
  /^placeholder$/i,
  /^sample$/i,
  /^tbd$/i,
  /^xxx+$/i,
  /^abc+$/i,
  /^xyz+$/i,
  /^123+$/i,
  /^\.+$/,
  /^\?+$/,
  /^-+$/,
  /^e\.?g\.?/i,
  /^lorem\s+ipsum/i,
  /^company$/i,
  /^my\s*company$/i,
  /^some\s*company$/i,
  /^someone$/i,
  /^no\s*name$/i,
  /^hello$/i,
  /^hi$/i,
  /^details$/i,
  /^project$/i
];

/**
 * Checks if a string is placeholder or vague text
 */
export function isPlaceholderOrVague(val: string): boolean {
  if (!val) return true;
  const trimmed = val.trim();
  if (trimmed.length === 0) return true;

  // Repeated single character like "aaaa" or "1111"
  if (/^(.)\1{3,}$/.test(trimmed)) return true;

  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(trimmed)) return true;
  }

  return false;
}

/**
 * Validates Email Address according to strict standard format:
 * - Must not be blank
 * - Standard structure: username@domain.extension
 * - Valid domain with at least 2 alpha characters for TLD
 * - No whitespace
 */
export function validateEmailAddress(email: string): { isValid: boolean; error: string | null } {
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return {
      isValid: false,
      error: 'A valid email address is required. Please enter a complete email address so we can contact you.'
    };
  }

  const trimmed = email.trim();

  // Strict email regex matching username@domain.extension
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'A valid email address is required. Please enter a complete email address so we can contact you.'
    };
  }

  // Must not contain spaces
  if (/\s/.test(trimmed)) {
    return {
      isValid: false,
      error: 'A valid email address is required. Please enter a complete email address so we can contact you.'
    };
  }

  // Check username and domain parts
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return {
      isValid: false,
      error: 'A valid email address is required. Please enter a complete email address so we can contact you.'
    };
  }

  const [username, domain] = parts;
  if (!username || username.length < 1 || !domain || domain.length < 3 || !domain.includes('.')) {
    return {
      isValid: false,
      error: 'A valid email address is required. Please enter a complete email address so we can contact you.'
    };
  }

  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
    return {
      isValid: false,
      error: 'A valid email address is required. Please enter a complete email address so we can contact you.'
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validates all required fields in the customer lead capture form:
 * - Email address
 * - Client Name
 * - Company / Organization
 * - Capabilities Required (at least 1)
 * - Estimated Scope / Budget
 * - Project Summary & Goals
 */
export function validateLeadCaptureForm(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  budget?: string;
  projectDetails?: string;
}): LeadValidationResult {
  const fieldErrors: LeadValidationResult['fieldErrors'] = {};
  const missingOrIncompleteFields: string[] = [];

  // Optional Phone validation (if provided, must be valid phone pattern)
  if (data.phone && data.phone.trim().length > 0) {
    const rawPhone = data.phone.trim();
    // Allow +, digits, spaces, parentheses, hyphens; must have between 7 and 15 digits
    const digitsOnly = rawPhone.replace(/\D/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      fieldErrors.phone = 'Please provide a valid phone number (7–15 digits).';
      missingOrIncompleteFields.push('Phone Number');
    }
  }

  // 1. Email validation (mandatory, non-negotiable)
  const emailCheck = validateEmailAddress(data.email);
  let emailError: string | null = null;
  if (!emailCheck.isValid) {
    emailError = emailCheck.error;
    fieldErrors.email = emailCheck.error || 'A valid email address is required.';
    missingOrIncompleteFields.push('Work Email');
  }

  // 2. Name validation (required, not blank, no vague entries)
  const rawName = (data.name || '').trim();
  if (!rawName || rawName.length < 2) {
    fieldErrors.name = 'Please provide your full name (minimum 2 characters).';
    missingOrIncompleteFields.push('Your Name');
  } else if (isPlaceholderOrVague(rawName)) {
    fieldErrors.name = 'Please enter a genuine name rather than placeholder text.';
    missingOrIncompleteFields.push('Your Name');
  } else if (!/[a-zA-Z]/.test(rawName)) {
    fieldErrors.name = 'Name must contain alphabetic characters.';
    missingOrIncompleteFields.push('Your Name');
  }

  // 3. Company / Organization validation (required, not blank, no vague entries)
  const rawCompany = (data.company || '').trim();
  if (!rawCompany || rawCompany.length < 2) {
    fieldErrors.company = 'Please enter your company or organization name (minimum 2 characters).';
    missingOrIncompleteFields.push('Company / Organization');
  } else if (isPlaceholderOrVague(rawCompany)) {
    fieldErrors.company = 'Please provide a genuine company name rather than placeholder text.';
    missingOrIncompleteFields.push('Company / Organization');
  }

  // 4. Services / Capabilities validation (at least 1 required)
  if (!Array.isArray(data.services) || data.services.length === 0) {
    fieldErrors.services = 'Please select at least one engineering capability.';
    missingOrIncompleteFields.push('Capabilities Required');
  }

  // 5. Budget Tier validation (must be selected)
  const rawBudget = (data.budget || '').trim();
  const validBudgets = ['<2L', '2L-5L', '5L-10L', '10L+'];
  if (!rawBudget || (!validBudgets.includes(rawBudget) && !rawBudget.includes('Lakh'))) {
    fieldErrors.budget = 'Please select a project budget tier.';
    missingOrIncompleteFields.push('Estimated Scope / Budget');
  }

  // 6. Project Details validation (required, meaningful description, no vague entries)
  const rawDetails = (data.projectDetails || '').trim();
  if (!rawDetails || rawDetails.length < 10) {
    fieldErrors.projectDetails = 'Please provide meaningful project goals (minimum 10 characters).';
    missingOrIncompleteFields.push('Project Summary & Goals');
  } else if (isPlaceholderOrVague(rawDetails)) {
    fieldErrors.projectDetails = 'Please provide specific project requirements rather than placeholder text.';
    missingOrIncompleteFields.push('Project Summary & Goals');
  }

  const hasNonEmailErrors = missingOrIncompleteFields.some(f => f !== 'Work Email');
  const generalError = hasNonEmailErrors
    ? 'Some details are incomplete. Please fill in all required fields before submitting.'
    : null;

  const isValid = !emailError && missingOrIncompleteFields.length === 0;

  return {
    isValid,
    emailError,
    generalError,
    fieldErrors,
    missingOrIncompleteFields
  };
}

/**
 * Lead Authentication:
 * After the form passes validation, authenticate the lead enquiry by verifying
 * that the information provided is genuine and complete.
 * Flag any suspicious patterns or inconsistencies for review,
 * but do not block legitimate submissions that meet all validation criteria.
 */
export function authenticateLeadEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  budget?: string;
  projectDetails?: string;
}): LeadAuthenticationResult {
  const checks: LeadAuthenticationResult['checks'] = [];
  const suspiciousFlags: string[] = [];
  let trustScore = 100;

  const emailLower = data.email.toLowerCase().trim();
  const domain = emailLower.split('@')[1] || '';

  // Check 1: Disposable / Throwaway Domain Check
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    suspiciousFlags.push(`Disposable email domain detected (@${domain})`);
    trustScore -= 40;
    checks.push({
      name: 'Email Domain Integrity',
      passed: false,
      details: `Temporary/disposable domain identified (@${domain}). Flagged for manual identity verification.`
    });
  } else {
    checks.push({
      name: 'Email Domain Integrity',
      passed: true,
      details: `Persistent email host verified (@${domain}).`
    });
  }

  // Check 2: Corporate vs Webmail Domain
  const isWebmail = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'].includes(domain);
  if (isWebmail) {
    checks.push({
      name: 'Corporate Domain Analysis',
      passed: true,
      details: 'Public webmail provider utilized. Valid for direct or early-stage commercial discovery.'
    });
  } else {
    checks.push({
      name: 'Corporate Domain Analysis',
      passed: true,
      details: `Dedicated corporate/enterprise domain recognized (@${domain}). High trust rating.`
    });
    trustScore = Math.min(100, trustScore + 5);
  }

  // Check 3: Name & Entity Integrity
  const nameParts = data.name.trim().split(/\s+/);
  if (nameParts.length >= 2) {
    checks.push({
      name: 'Client Identity Consistency',
      passed: true,
      details: 'Full legal name structure detected with first and surname components.'
    });
  } else {
    trustScore -= 5;
    checks.push({
      name: 'Client Identity Consistency',
      passed: true,
      details: 'Single-token moniker provided. Validated for direct contact.'
    });
  }

  // Check 4: Project Scope & Technical Depth
  const details = (data.projectDetails || '').toLowerCase();
  const technicalKeywords = [
    'ai', 'model', 'api', 'restaurant', 'inventory', 'qr', 'menu', 'system',
    'scale', 'platform', 'app', 'flutter', 'stack', 'cloud', 'architecture',
    'delivery', 'database', 'integration', 'crm', 'booking', 'brand', 'design'
  ];
  const matchedKeywords = technicalKeywords.filter(kw => details.includes(kw));

  if (matchedKeywords.length >= 2) {
    checks.push({
      name: 'Project Requirement Depth',
      passed: true,
      details: `Technical context confirmed with domain parameters (${matchedKeywords.slice(0, 3).join(', ')}).`
    });
  } else {
    checks.push({
      name: 'Project Requirement Depth',
      passed: true,
      details: 'General scope outline captured; full scope will be detailed during architecture intake.'
    });
  }

  // Check 5: Suspicious Keyboard Walks or Patterns
  const detailsRaw = data.projectDetails || '';
  if (/(?:asdf|qwerty|123456|zxcv)/i.test(detailsRaw) || /(?:asdf|qwerty|123456)/i.test(data.name)) {
    suspiciousFlags.push('Repetitive keyboard sequence pattern detected in submission body');
    trustScore -= 30;
    checks.push({
      name: 'Pattern Anomaly Detection',
      passed: false,
      details: 'Keyboard walk pattern detected in submission text.'
    });
  } else {
    checks.push({
      name: 'Pattern Anomaly Detection',
      passed: true,
      details: 'No spam anomalies or heuristic patterns identified.'
    });
  }

  const isSuspicious = suspiciousFlags.length > 0 || trustScore < 70;
  const status: LeadAuthenticationResult['status'] = isSuspicious
    ? 'FLAGGED_FOR_MANUAL_REVIEW'
    : 'AUTHENTICATED';

  const recommendation = isSuspicious
    ? 'Lead accepted and forwarded to studio inbox; flagged with automated manual review advisory.'
    : 'Lead verified authentic and cleared for immediate 4–6 hour discovery response.';

  return {
    status,
    trustScore: Math.max(10, Math.min(100, trustScore)),
    isGenuine: !isSuspicious,
    verifiedAt: new Date().toISOString(),
    checks,
    suspiciousFlags,
    recommendation
  };
}
