// src/services/admin/couplePhotosService.js

import { supabase } from "../supabase/supabaseClient";

/* =========================================================
   FETCH ADMIN
   Toutes les photos (même masquées)
========================================================= */
export const fetchAdminCouplePhotos = async () => {
  const { data, error } = await supabase
    .from("couple_photos")
    .select("*")
    .order("display_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
};

/* =========================================================
   FETCH PUBLIC
   Seulement visibles
========================================================= */
export const fetchPublicCouplePhotos = async () => {
  const { data, error } = await supabase
    .from("couple_photos")
    .select("*")
    .eq("is_active", true)
    .order("display_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
};

/* =========================================================
   CREATE
========================================================= */
export const createCouplePhoto = async (
  photo
) => {
  const { data, error } =
    await supabase
      .from("couple_photos")
      .insert([photo])
      .select()
      .single();

  if (error) throw error;

  return data;
};

/* =========================================================
   UPDATE
========================================================= */
export const updateCouplePhoto = async (
  id,
  updates
) => {
  const { data, error } =
    await supabase
      .from("couple_photos")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

  if (error) throw error;

  return data;
};

/* =========================================================
   DELETE
========================================================= */
export const deleteCouplePhoto = async (
  id
) => {
  const { error } =
    await supabase
      .from("couple_photos")
      .delete()
      .eq("id", id);

  if (error) throw error;
};

/* =========================================================
   TOGGLE ACTIVE
========================================================= */
export const toggleCouplePhoto =
  async (photo) => {
    const { data, error } =
      await supabase
        .from("couple_photos")
        .update({
          is_active:
            !photo.is_active,
        })
        .eq("id", photo.id)
        .select()
        .single();

    if (error) throw error;

    return data;
  };

/* =========================================================
   REORDER
   photos = tableau ordonné
========================================================= */
export const reorderCouplePhotos =
  async (photos) => {
    const updates = photos.map(
      (photo, index) => ({
        id: photo.id,
        display_order: index + 1,
      })
    );

    for (const item of updates) {
      const { error } =
        await supabase
          .from("couple_photos")
          .update({
            display_order:
              item.display_order,
          })
          .eq("id", item.id);

      if (error) throw error;
    }

    return true;
  };

/* =========================================================
   COUNT
========================================================= */
export const getCouplePhotosCount =
  async () => {
    const { count, error } =
      await supabase
        .from("couple_photos")
        .select("*", {
          count: "exact",
          head: true,
        });

    if (error) throw error;

    return count || 0;
  };

/* =========================================================
   COUNT ACTIVE
========================================================= */
export const getActiveCouplePhotosCount =
  async () => {
    const { count, error } =
      await supabase
        .from("couple_photos")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("is_active", true);

    if (error) throw error;

    return count || 0;
  };