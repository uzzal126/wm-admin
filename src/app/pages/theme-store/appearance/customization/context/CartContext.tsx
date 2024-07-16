
import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useGetThemeDataMutation, useThemeUpdateMutation, useUpdateSettingMutation } from "../../../../../../_metronic/redux/slices/appearance";
import Context from "./index";

type Key = "general_setting" | "store_info" | "header" | "footer" | "logo" | "hotline" | "locations" | undefined | string;
type ControlType = {
  id?: string;
  type?: Key
}

const ThemeProvider = ({ children, data }: { children: React.ReactNode, data: any }) => {
  const [themeData, setTheme] = useState<any>({})
  const [getTheme] = useGetThemeDataMutation()
  const [themeUpdate] = useThemeUpdateMutation()
  const [updateSetting] = useUpdateSettingMutation()

  useEffect(() => {
    const getData = async () => {
      const post: any = { tid: data.tid || "" }
      const response = await getTheme(post).unwrap()
      setTheme(response)
    }
    if (data.tid) {
      getData()
    }
    else {
      toast.error('Theme not found')
    }
  }, [data.tid, getTheme])

  const onSave = async (key: Key, value: any, type: 'theme' | 'static') => {
    if (type === 'static') {
      onSaveHandler({ type: key }, value)
      const newValue: any = { ...themeData }
      if (key && newValue[key] && key && value) {
        newValue[key] = value
        setTheme(newValue)
      }
    } else if (type === 'theme') {
      const newThemeData = { ...themeData?.theme_data }
      if (key && newThemeData[key] && key && value) {
        newThemeData[key] = value
      }
      const newData = {
        ...themeData,
        theme_data: newThemeData
      }
      setTheme(newData)
      onSaveHandler({ id: key }, value)
    }
  }
  const onStateUpdate = (key: Key, value: any, type: 'theme' | 'static') => {

    if (type === 'theme') {
      const newThemeData = { ...themeData?.theme_data }
      if (key && newThemeData[key] && key && value) {
        newThemeData[key] = value
      }
      const newData = {
        ...themeData,
        theme_data: newThemeData
      }
      setTheme(newData)
    } else if (type === 'static') {
      const newValue: any = { ...themeData }
      if (key && newValue[key] && key && value) {
        newValue[key] = value
        setTheme(newValue)
      }
    }

  }

  const onSaveHandler = async (control: ControlType, value: any) => {
    let res
    if (control?.id && value) {
      const post = {
        component_name: control?.id,
        component_data: value,
        component_previous_position: null,
        component_current_position: null,
        tid: data.tid,
      }
      res = await themeUpdate(post).unwrap()
    } else {
      let post = {
        setting_name: '',
        setting_data: {},
      }
      if (control?.type && control?.type.includes('general_setting')) {
        post = {
          setting_name: 'general_settings',
          setting_data: value
        }
      }
      if (control?.type && control?.type.includes('store_info')) {
        post = {
          setting_name: 'store_info',
          setting_data: value
        }
      }
      if (control?.type && control?.type.includes('header')) {
        post = {
          setting_name: 'header',
          setting_data: value
        }
      }
      if (control?.type && control?.type.includes('footer')) {
        post = {
          setting_name: 'footer',
          setting_data: value
        }
      }
      if (control?.type && control?.type.includes('logo')) {
        post = {
          setting_name: 'logo',
          setting_data: value
        }
      }
      if (control?.type && control?.type.includes('hotline')) {
        post = {
          setting_name: 'hotline',
          setting_data: value
        }
      }
      if (control?.type && control?.type.includes('locations')) {
        post = {
          setting_name: 'locations',
          setting_data: value
        }
      }
      if (post.setting_name !== '' && Object.keys(post.setting_data).length > 0)
        res = await updateSetting(post).unwrap()
    }
    if (res.success && res.status_code === 200) {
      toast.success(res?.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.success(res?.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <Context.Provider
      value={{ themeData, onSave, onStateUpdate }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useTheme must be used within an Cart Provider");
  }
  return context;
};

export default ThemeProvider;
