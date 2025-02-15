import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

/** Format Date */
export const getFormattedDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

/** Estimated Reading time */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    data.astro.frontmatter.estReadingTime = readingTime.minutes;
  };
}

/** ✅ Improved Check if an Image Path is Relative or Absolute */
export const checkImageUrl = (image, url) => {
  if (!image || typeof image !== "string") {
    return new URL("/opengraph.jpg", url).toString(); // ✅ Fallback image
  }

  try {
    // ✅ Ensure valid absolute URL and encode special characters
    const validUrl = new URL(image);
    return encodeURI(validUrl.toString());
  } catch (error) {
    // ✅ Handle relative paths correctly
    return encodeURI(new URL(image, url).toString());
  }
};
