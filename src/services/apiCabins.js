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

export async function createEditCabin(newCabin, id) {
  let imagePath;
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // 1. Determine image path
  if (hasImagePath) {
    imagePath = newCabin.image;
  } else if (newCabin.image) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 2. Create or Edit cabin
  let query = supabase.from("cabins");

  if (!id) {
    // A) Create new cabin
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    // B) Edit existing cabin
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created/edited");
  }

  // 3. Upload image if it's a new image
  if (!hasImagePath && newCabin.image) {
    const imageName = imagePath.split("/").pop(); // Extract image name from path
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 4. Delete cabin if image upload fails
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created/edited"
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
