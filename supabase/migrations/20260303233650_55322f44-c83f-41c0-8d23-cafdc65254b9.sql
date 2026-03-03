
-- Enum for user roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'editor', 'moderator');

-- Enum for article status
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');

-- Enum for complaint status
CREATE TYPE public.complaint_status AS ENUM ('received', 'in_review', 'investigating', 'resolved', 'rejected');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Articles table
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'Actualité',
  status content_status NOT NULL DEFAULT 'draft',
  author_id UUID REFERENCES auth.users(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Rapports',
  file_url TEXT,
  cover_url TEXT,
  file_size TEXT,
  file_type TEXT DEFAULT 'PDF',
  pages INTEGER,
  published_at TIMESTAMPTZ DEFAULT now(),
  status content_status NOT NULL DEFAULT 'published',
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Gallery photos table
CREATE TABLE public.gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  src TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Institutions',
  date TEXT,
  year INTEGER NOT NULL DEFAULT 2025,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Complaints table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  complainant_name TEXT,
  complainant_email TEXT,
  complainant_phone TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  status complaint_status NOT NULL DEFAULT 'received',
  admin_notes TEXT,
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pages table for custom content
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  meta_description TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to check if user is any admin/editor
CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('super_admin', 'editor', 'moderator')
  )
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Generate tracking number for complaints
CREATE OR REPLACE FUNCTION public.generate_tracking_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.tracking_number := 'PLT-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_tracking_number
  BEFORE INSERT ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.generate_tracking_number();

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE POLICY "Staff can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

-- USER_ROLES policies
CREATE POLICY "Super admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- ARTICLES policies
CREATE POLICY "Published articles are public" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Staff can manage articles" ON public.articles FOR ALL TO authenticated USING (public.is_staff(auth.uid()));

-- DOCUMENTS policies
CREATE POLICY "Published documents are public" ON public.documents FOR SELECT USING (status = 'published');
CREATE POLICY "Staff can manage documents" ON public.documents FOR ALL TO authenticated USING (public.is_staff(auth.uid()));

-- GALLERY policies
CREATE POLICY "Gallery photos are public" ON public.gallery_photos FOR SELECT USING (true);
CREATE POLICY "Staff can manage gallery" ON public.gallery_photos FOR ALL TO authenticated USING (public.is_staff(auth.uid()));

-- COMPLAINTS policies
CREATE POLICY "Anyone can submit complaints" ON public.complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can view complaints" ON public.complaints FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff can update complaints" ON public.complaints FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));

-- PAGES policies
CREATE POLICY "Published pages are public" ON public.pages FOR SELECT USING (status = 'published');
CREATE POLICY "Staff can manage pages" ON public.pages FOR ALL TO authenticated USING (public.is_staff(auth.uid()));

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('content', 'content', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('complaints', 'complaints', false);

-- Storage policies
CREATE POLICY "Content files are public" ON storage.objects FOR SELECT USING (bucket_id = 'content');
CREATE POLICY "Staff can upload content" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'content' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff can delete content" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'content' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff can view complaint files" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'complaints' AND public.is_staff(auth.uid()));
CREATE POLICY "Anyone can upload complaint files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'complaints');
