// color design tokens export
export const tokensDark = {
  primary: {
    // blue
    100: "#FFFFFF",
    200: "#F5F1E8",
    300: "#F4F1EA",
    400: "#D7D9D9",
    500: "#9FA9AF",
    600: "#B4BABD",
    700: "#808B90",
    800: "#17394C",
    900: "#03293C",
  }
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = () => {
  return {
    palette: {
            // palette values for dark mode
      primary: {
              main: tokensDark.primary[400],
              light: tokensDark.primary[200],
            },
      background: {
              default: tokensDark.primary[200],
              alt: tokensDark.primary[500],
            
        
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    }
  }
}
}