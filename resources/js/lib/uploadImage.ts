import { supabase } from "@/lib/supabase";

/**
 * Supabase Storageに画像をアップロードして公開URLを返す
 * @param bucket バケット名 ("avatars" or "post_images")
 * @param file Fileオブジェクト
 * @param userId ユーザーID
 */
export async function uploadImage(bucket: string, file: File, userId: string): Promise<string | null> {
    const fileName = `${userId}-${Date.now()}.${file.name.split(".").pop()}`;

    const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
    if (uploadError) {
        console.error("Upload failed:", uploadError);
        return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
}
