import { create } from 'zustand';

interface HeaderState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  navActive: string;
  setNavActive: (navActive: string) => void;

}

// 3. Création du store Zustand
export const useHeaderStore = create<HeaderState>((set) => ({
  // États initiaux
  isMobileMenuOpen: false,
  navActive: "accueil",

  // Actions
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setNavActive: (navActive: string) => set({ navActive }),
}));