
import * as z from "zod";

export const themeFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  colorTheme: z.enum([
    "default",
    "professional-blue",
    "modern-green",
    "elegant-navy",
    "fresh-green",
    "warm-orange",
    "sleek-black",
    "luxury-black-gold"
  ]),
  primaryColor: z.string().regex(/^#([0-9A-F]{6})$/i, {
    message: "Must be a valid hex color code",
  }),
  accentColor: z.string().regex(/^#([0-9A-F]{6})$/i, {
    message: "Must be a valid hex color code",
  }),
  borderRadius: z.enum(["none", "small", "medium", "large"]),
  enableAnimations: z.boolean(),
  highContrastMode: z.boolean(),
  fontFamily: z.enum(["system", "inter", "roboto", "poppins"]),
  customLogo: z.boolean(),
  logoUrl: z.string().optional(),
  customFavicon: z.boolean(),
  faviconUrl: z.string().optional(),
});

export type ThemeFormValues = z.infer<typeof themeFormSchema>;

export type ColorThemeOption = {
  name: string;
  value: string;
  primaryColor: string;
  accentColor: string;
  description: string;
};

export const colorThemeOptions: ColorThemeOption[] = [
  {
    name: "Default",
    value: "default",
    primaryColor: "#2563eb",
    accentColor: "#60a5fa",
    description: "Standard theme with a classic blue palette"
  },
  {
    name: "Professional Blue & White",
    value: "professional-blue",
    primaryColor: "#1a56db",
    accentColor: "#3b82f6",
    description: "Symbolizes trust, reliability, and professionalism"
  },
  {
    name: "Modern Green & Gray",
    value: "modern-green",
    primaryColor: "#10b981",
    accentColor: "#6b7280",
    description: "Associated with growth, safety, and eco-friendliness"
  },
  {
    name: "Elegant Navy & Gold",
    value: "elegant-navy",
    primaryColor: "#1e3a8a",
    accentColor: "#fbbf24",
    description: "Conveys authority, security, with a touch of luxury"
  },
  {
    name: "Fresh Green & Light Gray",
    value: "fresh-green",
    primaryColor: "#34d399",
    accentColor: "#e5e7eb",
    description: "Promotes harmony, health, renewal, and calm"
  },
  {
    name: "Warm Orange & Neutral Brown",
    value: "warm-orange",
    primaryColor: "#f97316",
    accentColor: "#92400e",
    description: "Energizes, stimulates creativity, feels warm"
  },
  {
    name: "Sleek Black & Silver",
    value: "sleek-black",
    primaryColor: "#111827",
    accentColor: "#94a3b8",
    description: "Symbolizes sophistication, power, and innovation"
  },
  {
    name: "Luxury Black & Gold",
    value: "luxury-black-gold",
    primaryColor: "#18181b",
    accentColor: "#eab308",
    description: "Exudes elegance, luxury, and premium quality"
  }
];
