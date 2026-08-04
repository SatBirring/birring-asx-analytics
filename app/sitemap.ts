import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://birringanalytics.com",
      lastModified: new Date(),
    },
    {
      url: "https://birringanalytics.com/categories",
      lastModified: new Date(),
    },
    {
      url: "https://birringanalytics.com/macro",
      lastModified: new Date(),
    },
    {
      url: "https://birringanalytics.com/lookup",
      lastModified: new Date(),
    },
  ];
}
