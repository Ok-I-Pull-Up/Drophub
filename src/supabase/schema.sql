-- Utworzenie publicznej tabeli profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  username TEXT,
  website TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Ustawienie polityki bezpieczeństwa RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Tworzenie polityk dostępu
-- Publiczny dostęp do odczytu profili
CREATE POLICY "Publiczny dostęp do odczytu profili" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

-- Umożliwienie użytkownikom aktualizacji swoich profili
CREATE POLICY "Użytkownicy mogą aktualizować swoje profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Umożliwienie użytkownikom wstawiania swoich profili
CREATE POLICY "Użytkownicy mogą wstawiać swoje profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Funkcja do automatycznej aktualizacji pola updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger dla funkcji handle_updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Funkcja do automatycznego tworzenia profilu użytkownika
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger do automatycznego tworzenia profilu po rejestracji
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user(); 