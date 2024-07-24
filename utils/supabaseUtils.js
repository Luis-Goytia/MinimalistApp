import { supabase } from '../config/supabaseClient';

export const uploadImageToSupabase = async (uri) => {
  try {
    console.log('Image URI:', uri);

    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }

    const blob = await response.blob();

    const arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });

    const { data, error } = await supabase.storage
      .from('ProductsImages')
      .upload(`${Date.now()}.jpg`, arrayBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/jpeg',
      });

    if (error) {
      console.error(`Error uploading image: ${error.message}`);
      alert(`Error uploading image: ${error.message}`);
      return null;
    } else {
      console.log('Upload data:', data);
    }

    const { data: publicUrlData, error: urlError } = await supabase.storage
      .from('ProductsImages')
      .getPublicUrl(data.path);

    if (urlError) {
      console.error(`Error getting public URL: ${urlError.message}`);
      alert(`Error getting public URL: ${urlError.message}`);
      return null;
    } else {
      console.log('Public URL:', publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    }

  } catch (error) {
    console.error('Error:', error.message);
    alert(`Error: ${error.message}`);
    return null;
  }
};
