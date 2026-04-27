import { supabase } from "../supabase/supabaseClient";

/**
 * Track visit
 */
export const trackVisit = async (page = "/") => {
  await supabase.from("site_visits").insert([
    {
      page,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    },
  ]);
};

/**
 * Total visits
 */
export const getTotalVisits = async () => {
  const { count, error } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true });

  if (error) throw error;

  return count || 0;
};

/**
 * Today visits
 */
export const getTodayVisits = async () => {
  const today = new Date().toISOString().split("T")[0];

  const { count, error } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true })
    .gte("visited_at", today);

  if (error) throw error;

  return count || 0;
};

/**
 * Last 7 days visits
 */
export const getLast7DaysVisits = async () => {
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const start = new Date();
    start.setDate(start.getDate() - i);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    const { count, error } = await supabase
      .from("site_visits")
      .select("*", { count: "exact", head: true })
      .gte("visited_at", start.toISOString())
      .lte("visited_at", end.toISOString());

    if (error) throw error;

    result.push({
      day: start.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      }),
      visits: count || 0,
    });
  }

  return result;
};