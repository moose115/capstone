export module '@mui/material/styles' {
  interface Palette {
    primary: Palette['primary'];
  }

  interface PaletteOptions {
    primary?: PaletteOptions['primary'];
  }

  interface PaletteColor extends ColorRange {}

  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }
}
