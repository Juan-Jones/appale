import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import { remarkReadingTime } from "./src/utils/all";
import rehypePluginImageNativeLazyLoading from "rehype-plugin-image-native-lazy-loading";
import rehypeExternalLinks from "rehype-external-links"; // ✅ Import rehypeExternalLinks

import favicons from "astro-favicons";

export default defineConfig({
  site: "https://earnonlinemoney.org",
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypePluginImageNativeLazyLoading,
      [rehypeExternalLinks, { target: "_blank", rel: ["nofollow", "noopener", "noreferrer"] }] // ✅ Added here
    ],
    extendDefaultPlugins: true,
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => page !== "https://earnonlinmoney.org/admin",
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        "https://earnonlinmoney.org/blog",
        "https://earnonlinmoney.org/about",
        "https://earnonlinmoney.org/contact",
      ],
    }),
    icon(),
    favicons(),
  ],
});
