import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  // 1. Create unique image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  try {
    // 2. Upload image to supabase storage
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded");
    }

    // 3. Create cabin record in database
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

    if (error) {
      // If cabin creation fails, delete the uploaded image
      await supabase.storage.from("cabin-images").remove([imageName]);
      console.error(error);
      throw new Error("Cabin could not be created");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
