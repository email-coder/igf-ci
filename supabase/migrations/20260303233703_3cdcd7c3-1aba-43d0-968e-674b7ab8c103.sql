
-- Fix function search path for generate_tracking_number
CREATE OR REPLACE FUNCTION public.generate_tracking_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.tracking_number := 'PLT-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  RETURN NEW;
END;
$$;

-- Fix permissive RLS: restrict complaint inserts to require at least subject+description
DROP POLICY IF EXISTS "Anyone can submit complaints" ON public.complaints;
CREATE POLICY "Anyone can submit complaints" ON public.complaints FOR INSERT WITH CHECK (
  subject IS NOT NULL AND description IS NOT NULL AND length(subject) > 0 AND length(description) > 0
);

DROP POLICY IF EXISTS "Anyone can upload complaint files" ON storage.objects;
CREATE POLICY "Anyone can upload complaint files" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'complaints' AND (storage.foldername(name))[1] IS NOT NULL
);
