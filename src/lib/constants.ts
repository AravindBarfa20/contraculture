export const SUPPORTED_LOCALES = [
  { code: "ja", name: "Japanese", flag: "🇯🇵", country: "Japan" },
  { code: "de", name: "German", flag: "🇩🇪", country: "Germany" },
  { code: "pt-BR", name: "Portuguese (BR)", flag: "🇧🇷", country: "Brazil" },
  { code: "fr", name: "French", flag: "🇫🇷", country: "France" },
  { code: "es", name: "Spanish", flag: "🇪🇸", country: "Spain" },
] as const;

export const STRING_TYPES = [
  { value: "headline", label: "Headline" },
  { value: "subheadline", label: "Subheadline" },
  { value: "cta", label: "Call to Action" },
  { value: "value_prop", label: "Value Proposition" },
  { value: "social_proof", label: "Social Proof" },
  { value: "urgency", label: "Urgency" },
  { value: "trust_signal", label: "Trust Signal" },
  { value: "body", label: "Body Copy" },
] as const;

export const PERSUASION_CATEGORIES = [
  { value: "individualist", label: "Individualist", color: "bg-blue-500" },
  { value: "collectivist", label: "Collectivist", color: "bg-green-500" },
  { value: "authority", label: "Authority", color: "bg-purple-500" },
  { value: "scarcity", label: "Scarcity", color: "bg-red-500" },
  { value: "social_proof", label: "Social Proof", color: "bg-yellow-500" },
  { value: "uncertainty_reducing", label: "Uncertainty Reducing", color: "bg-teal-500" },
  { value: "achievement", label: "Achievement", color: "bg-orange-500" },
  { value: "indulgent", label: "Indulgent", color: "bg-pink-500" },
  { value: "restraint", label: "Restraint", color: "bg-gray-500" },
] as const;
