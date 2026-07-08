import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

/**
 * Fetches the logged-in parent's active children and tracks a selected child.
 * All parent pages use this so every query is scoped to the parent's own kids.
 */
export function useChildren() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("students")
        .select("id, full_name, class, roll_number")
        .eq("parent_id", user.id)
        .eq("status", "active")
        .order("full_name");
      if (!active) return;
      const list = data ?? [];
      setChildren(list);
      setSelectedId((prev) => prev || list[0]?.id || "");
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const selected = children.find((c) => c.id === selectedId) || null;
  return { children, selected, selectedId, setSelectedId, loading };
}
