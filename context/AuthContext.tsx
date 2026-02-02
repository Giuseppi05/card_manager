// context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { User as PrismaUser, Role } from "@prisma/client";
import { useRouter } from "next/navigation";

type UserWithRole = PrismaUser & { role: Role };

interface AuthContextType {
  user: User | null;
  userData: UserWithRole | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAdmin: false,
  isAuthenticated: false,
  refreshSession: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserWithRole | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Función para obtener datos del usuario desde tu API
  const fetchUserData = async (userId: string) => {
    try {
      const res = await fetch(`/api/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error obteniendo datos del usuario:", error);
      setUserData(null);
    }
  };

  const refreshSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserData(session.user.id);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error verificando sesión:", error);
      setUser(null);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserData(null);
      router.push('/auth');
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    refreshSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserData(session.user.id);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = userData?.role.name === "ADMIN";
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData, 
      loading, 
      isAdmin, 
      isAuthenticated,
      refreshSession, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);