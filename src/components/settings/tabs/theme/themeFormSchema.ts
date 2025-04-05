
import * as z from "zod";

export const themeFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
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
