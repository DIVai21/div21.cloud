-- ============================================================
-- DIV21.cloud - Esquema de Base de Datos
-- ============================================================
-- Ejecutar esto en Supabase Studio > SQL Editor
-- ============================================================

-- 1. Tabla de perfiles de usuario (vinculada a auth.users)
-- Se crea automaticamente cuando un usuario se registra via trigger
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'developer' CHECK (role IN ('admin', 'developer', 'viewer')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Trigger para crear perfil automaticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'developer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Eliminar trigger si ya existe y crearlo de nuevo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Row Level Security (RLS) - Seguridad a nivel de fila
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de seguridad
-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Solo admins pueden ver todos los perfiles
CREATE POLICY "Admins can view all profiles"
  ON public.user_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- COMO CREAR EL PRIMER USUARIO:
-- ============================================================
-- 1. Ve a Supabase Studio > Authentication > Users
-- 2. Click "Add User"
-- 3. Ingresa email y password
-- 4. El trigger creara automaticamente su perfil en user_profiles
-- 5. Si quieres que sea admin, actualiza manualmente:
--
--    UPDATE public.user_profiles
--    SET role = 'admin'
--    WHERE email = 'tu-email@div21.cloud';
-- ============================================================
