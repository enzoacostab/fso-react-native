import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      appBar: '#24292e',
      white: 'white',
      err: '#d73a4a'
    },

    fontSizes: {
      body: 14,
      subheading: 16,
    },

    fonts: {
      main: Platform.select({
        'android': 'Roboto',
        'ios': 'Arial',
        'default': 'System'
      }),
    },
    
    fontWeights: {
      normal: '400',
      bold: '700',
    },

    logo: {
      borderRadius: 5,
      width: 66,
      height: 58,
    },
  };
  
  export default theme;