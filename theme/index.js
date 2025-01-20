const fontFamilyList = {
  OpenSans_Light: "OpenSans-Light",
  OpenSans_Regular: "OpenSans-Regular",
  OpenSans_Medium: "OpenSans-Medium",
  OpenSans_SemiBold: "OpenSans-SemiBold",
  OpenSans_Bold: "OpenSans-Bold",
  OpenSans_ExtraBold: "OpenSans-ExtraBold"
};

const fontWeights = {
  regular: 400,
  semiBold: 600,
  bold: 700,
};

const themeSettings = {
  palette: {
    baseColors: {
      black: "#121212",
      secondary: "#252525",
      light: "#DEDEDE",
      white: "#FFFFFF",
    },
  },
  typography: {
    textStyles: {
      headline: {
        fontFamily: fontFamilyList.OpenSans_SemiBold,
        fontWeight: fontWeights.semiBold,
        fontSize: 20,
        lineHeight: 32,
      },
      body: {
        fontFamily: fontFamilyList.OpenSans_Regular,
        fontWeight: fontWeights.regular,
        fontSize: 14,
        lineHeight: 24,
      },
    },
  },
};

export default themeSettings;