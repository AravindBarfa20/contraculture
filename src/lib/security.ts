export function validateStringLength(
  value: string,
  maxLength: number,
  fieldName: string
): string | null {
  if (value.length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or less`;
  }
  return null;
}

export function sanitizeString(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function validateProjectInput(body: {
  name?: string;
  description?: string;
  target_locales?: string[];
  copy_strings?: Array<{ content?: string }>;
}): string | null {
  if (body.name && body.name.length > 100) {
    return "Project name must be 100 characters or less";
  }

  if (body.description && body.description.length > 500) {
    return "Description must be 500 characters or less";
  }

  if (body.target_locales && body.target_locales.length > 10) {
    return "Maximum 10 target locales";
  }

  if (body.copy_strings) {
    if (body.copy_strings.length > 20) {
      return "Maximum 20 copy strings per project";
    }

    for (const s of body.copy_strings) {
      if (s.content && s.content.length > 1000) {
        return "Each copy string must be 1000 characters or less";
      }
    }
  }

  return null;
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 30,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}
