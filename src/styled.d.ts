import 'styled-components';
import { ThemeType } from './consts/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
