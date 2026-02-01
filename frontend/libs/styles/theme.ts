import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const BulbyTheme = definePreset(Aura, {
  semantic: {
    primary: {
      400: '{violet.400}',
      800: '{violet.800}',
    },
    error: {
      900: '{pink.900}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.800}',
          inverseColor: '{primary.800}',
          hoverColor: '{primary.800}',
          activeColor: '{primary.800}',
        },
      },
    },
  },
  components: {
    message: {
      colorScheme: {
        light: {
          error: {
            simple: {
              color: '{error.900}',
            },
          },
        },
      },
    },
    floatlabel: {
      root: {
        focusColor: '{primary.800}',
      },
    },
  },
});
