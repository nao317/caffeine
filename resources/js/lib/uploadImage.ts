import { supabase } from "@/lib/supabase";

/**
 * Supabase Storageに画像をアップロードして公開URLを返す
 * @param bucket バケット名 ("avatars" or "post_images")
 * @param file Fileオブジェクト
 * @param userId ユーザーID
 */
export async function uploadImage(bucket: string, file: File, userId: string): Promise<string | null> {
    try {
        console.log(`アップロード開始: bucket=${bucket}, userId=${userId}, fileSize=${file.size}`);
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        
        console.log(`ファイル名: ${fileName}`);

        // バケットリストの確認はスキップして、直接アップロードを試行
        console.log(`バケット '${bucket}' への直接アップロードを試行します...`);

        // ファイルアップロード
        const { data, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error("アップロードエラー:", uploadError);
            console.error("エラー詳細:", JSON.stringify(uploadError, null, 2));
            
            // avatarsバケットでエラーが発生した場合、post_imagesを試行
            if (bucket === "avatars") {
                console.log("avatarsバケットでエラー。post_imagesバケットを試行します...");
                return uploadImage("post_images", file, userId);
            }
            
            return null;
        }

        console.log("アップロード成功:", data);

        // 公開URLを取得
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
        console.log("公開URL:", urlData.publicUrl);
        
        return urlData.publicUrl;
        
    } catch (error) {
        console.error("予期しないエラー:", error);
        return null;
    }
}
