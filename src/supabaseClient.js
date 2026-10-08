import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mqhepfnkdgkzopjxqxhc.supabase.co";

const supabaseAnonKey =
  "sb_publishable_m60s5yON2NuMk2G11119sg_saD2USsZ";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);