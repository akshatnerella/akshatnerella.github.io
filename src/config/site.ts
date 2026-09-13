const githubUsername = "akshatnerella";

export const siteConfig = {
  name: "Akshat Nerella",
  tagline: "man with a million hobbies",
  blurb: "If you are working on something cool, lmk!",
  cta: "Open to collabs + coffees.",
  locationLabel: "San Francisco, CA, USA",
  locationCoords: {
    lat: Number(process.env.LOCATION_LAT ?? 37.7749),
    lng: Number(process.env.LOCATION_LNG ?? -122.4194),
  },
  githubUsername,
  githubProfileUrl:
    process.env.GITHUB_PROFILE_URL ?? `https://github.com/${githubUsername}`,
  linkedinUrl: process.env.LINKEDIN_URL ?? "https://linkedin.com",
  twitterUrl: process.env.TWITTER_URL ?? "https://x.com",
  mapboxToken: process.env.MAPBOX_TOKEN ?? "",
};
