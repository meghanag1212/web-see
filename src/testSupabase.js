import { supabase } from "./lib/supabase";

export async function testSupabase() {
  const { data, error } = await supabase
    .from("facilities")
    .select("*");

  console.log("Supabase data:", data);
  console.log("Supabase error:", error);
}