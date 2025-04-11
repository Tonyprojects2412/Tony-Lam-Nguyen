
-- Create public storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public', 'Public Storage', true)
ON CONFLICT (id) DO NOTHING;

-- Set up policy to allow public read access
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'public');

-- Set up policy to allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'public' AND auth.role() = 'authenticated');

-- Set up policy to allow users to update their own files
CREATE POLICY "Users can update their own files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'public' AND auth.uid() = owner);

-- Set up policy to allow users to delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (bucket_id = 'public' AND auth.uid() = owner);
