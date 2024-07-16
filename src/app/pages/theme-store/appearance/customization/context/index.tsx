import { createContext } from "react";


export interface ThemeType {
  themeData: any;
  onSave: (key: "general_setting" | "store_info" | "header" | "footer" | "logo" | "hotline" | "locations" | any, value: any, type: 'theme' | 'static') => void;
  onStateUpdate: (key: "general_setting" | "store_info" | "header" | "footer" | "logo" | "hotline" | "locations" | any, value: any, type: 'theme' | 'static') => void;
}

const ThemeContext = createContext<ThemeType | undefined>(undefined);

export default ThemeContext;
