import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { Session, User } from "@supabase/supabase-js";

const ADMIN_ROLE = "admin";
const ADMIN_EMAIL = "luisarmando20092009@gmail.com";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  isAdmin: boolean;
  setSession: (session: Session | null) => void;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ error?: string; message?: string }>;
  signOut: () => Promise<void>;
}

function checkAdminRole(user: User | null): boolean {
  if (!user) return false;
  const hasAdminRole =
    user.app_metadata?.role === ADMIN_ROLE ||
    user.user_metadata?.role === ADMIN_ROLE;
  const isAdminEmail = user.email?.toLowerCase() === ADMIN_EMAIL;
  return hasAdminRole || isAdminEmail;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: false,
  isInitialized: false,
  isAdmin: false,

  setSession: (session) => {
    const user = session?.user ?? null;
    set({
      session,
      user,
      isInitialized: true,
      isAdmin: checkAdminRole(user),
    });
  },

  signIn: async (email, password) => {
    set({ isLoading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    set({ isLoading: false });

    if (error) {
      return { error: error.message };
    }

    get().setSession(data.session);
    return {};
  },

  signUp: async (email, password) => {
    set({ isLoading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    set({ isLoading: false });

    if (error) {
      return { error: error.message };
    }

    get().setSession(data.session);

    return {
      message: data.session
        ? "Registro exitoso"
        : "Revisa tu correo para confirmar tu cuenta",
    };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isAdmin: false });
  },
}));
