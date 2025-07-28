import { create } from 'zustand';

type TokenState = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthStore = {
  spotify: TokenState;
  youtube: TokenState;
  appleMusic: TokenState;

  setSpotifyTokens: (accessToken: string, refreshToken: string) => void;
  setYoutubeTokens: (accessToken: string, refreshToken: string) => void;
  setAppleMusicTokens: (accessToken: string, refreshToken: string) => void;

  clearAllTokens: () => void;
};

export const useStore = create((set) => {});
