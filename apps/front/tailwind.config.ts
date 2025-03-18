import type { Config } from "tailwindcss";

export default {
  // 配置 Tailwind CSS 的暗黑模式支持。表示可以通过添加 class 类名或设置 data-theme="dark" 属性来启用暗黑模式。
  darkMode: ["class", "[data-theme='dark']"],
  // content 定义了 Tailwind CSS 需要扫描的文件路径，用于提取使用的类名。
  // "**"" 表示递归匹配所有子目录，*.{js,ts,jsx,tsx,mdx} 表示匹配所有以这些扩展名结尾的文件。
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // theme 用于定制 Tailwind CSS 的默认主题。可以定义颜色、字体、间距、边框半径等样式。
  theme: {
    // extend 表示在默认主题的基础上进行扩展，而不是完全覆盖默认主题。
    extend: {
      // colors 用于扩展 Tailwind CSS 的颜色调色板。可以定义背景色、前景色、卡片颜色、弹出框颜色等。
      // 使用 hsl(var(--...)) 语法引用 CSS 变量，这样可以在不同的主题中动态改变颜色。
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      // borderRadius 用于扩展 Tailwind CSS 的边框半径类。可以定义大、中、小三种不同的边框半径。
      // 使用 CSS 变量 var(--radius) 来动态设置边框半径，md 和 sm 是在 lg 的基础上进行计算得到的。
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // 引入了 tailwindcss-animate 插件，该插件可以为 Tailwind CSS 提供动画效果。
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

// satisfies Config：使用 satisfies 运算符确保配置对象符合 Config 类型定义。
