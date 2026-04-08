/**
 * TEMPORARY: Using Inter from Google Fonts as a stand-in for Uncut Sans.
 *
 * TO SWITCH TO UNCUT SANS (brand-correct):
 * 1. Download .woff2 files from https://github.com/kaspernordkvist/uncut_sans
 * 2. Place them in /public/fonts/uncut-sans/
 * 3. Swap this file to use localFont (the config is in git history / see ARCHITECTURE.md)
 *
 * Inter is visually similar (geometric sans-serif) and holds the same CSS variable
 * --font-uncut-sans so no other files need to change on the swap.
 */
import { Inter } from 'next/font/google';

export const uncutSans = Inter({
  subsets: ['latin'],
  variable: '--font-uncut-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});
