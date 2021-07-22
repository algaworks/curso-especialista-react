import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    pageBackground: string;
    pageForeground: string;
    primaryBackground: string;
    primaryForeground: string;
    activeElementBackground: string;
    activeElementForeground: string;
    inactiveElementBackground: string;
    inactiveElementForeground: string;
    inactiveElementOpacity: number;
    borderRadius: string;
  }
}
