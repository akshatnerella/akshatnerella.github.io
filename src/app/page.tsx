import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getGithubContributionsSvg } from "@/lib/github";
import { getLinkMeta } from "@/lib/link-preview";
import DotGrid from "./DotGrid";
import MapTile from "./MapTile";

export default async function Home() {
  const contributionsSvg = await getGithubContributionsSvg(
    siteConfig.githubUsername
  );
  const tilesMeta = await getLinkMeta("https://logspaceai.vercel.app");
  const amazonMeta = await getLinkMeta(
    "https://www.amazon.com/Struggle-Smile-self-help-people-books-ebook/dp/B0F3WN97TG"
  );
  const spotifyTracks = [
    "https://open.spotify.com/track/6zxSQJQZz3s0hnUbtDC2vc",
    "https://open.spotify.com/track/68RWNqKf0tUJMO3NKkBPKV",
    "https://open.spotify.com/track/4bZ0AQARqeoNYyoDGog0BG",
    "https://open.spotify.com/track/245xxNgkFGf4GZlWzWmZGC",
  ];
  const codeLinks = [
    "https://www.piwheels.org/project/pyladdersim/",
    "https://akshatnerella.notion.site/Controls-Engineering-Internship-2023-321bc3e996a54a2b9ec53ab2d7a7652b",
    "https://akshatnerella.notion.site/Autonomous-Robot-Arm-2023-dbe1066351644f1dbc2c73fb40f2996a",
    "https://akshatnerella.notion.site/Eye-Tracking-Cursor-Software-2023-0a220db3aeb0404c9d59acfa25d8f451",
  ];
  const codeMetas = await Promise.all(codeLinks.map((link) => getLinkMeta(link)));

  return (
    <main>
      <DotGrid />
      <div className="layout">
        <section className="profile">
          <div className="avatar">
            <Image
              src="/profile.png"
              alt="Akshat Nerella"
              width={140}
              height={140}
              sizes="(max-width: 640px) 110px, 140px"
            />
          </div>
          <h1>Akshat Nerella</h1>
          <p className="subtitle">man with a million hobbies</p>
          <p className="blurb">If you are working on something cool, lmk!</p>
          <details className="profile-app-suite profile-app-suite--desktop" open>
            <summary className="profile-heading">&#10038; app suite</summary>
            <div className="profile-tiles">
              <a
                className="profile-tile"
                href="https://logspaceai.vercel.app"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="profile-tile-title">
                  Tiles: Log your work, build in public
                </div>
                <div className="profile-tile-subtitle">logspaceai.vercel.app</div>
              </a>
              <a
                className="profile-tile"
                href="https://tiles-five.vercel.app"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="profile-tile-title">
                  Turn git repos in beautiful dashboards
                </div>
                <div className="profile-tile-subtitle">tiles-five.vercel.app</div>
              </a>
              <a
                className="profile-tile"
                href="https://conspiracyai.vercel.app"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="profile-tile-title">
                  Funny AI that generates conspiracy theories
                </div>
                <div className="profile-tile-subtitle">conspiracyai.vercel.app</div>
              </a>
            </div>
          </details>
        </section>
        <section className="tiles">
          <a
            className="tile tile-square tile-linkedin"
            href="https://linkedin.com/in/akshatnerella"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="tile-icon tile-icon--linkedin" aria-hidden="true">
              <FaLinkedinIn />
            </div>
            <div className="tile-title">Let&apos;s connect on LinkedIn</div>
            <div className="tile-subtitle">linkedin.com</div>
          </a>
          <a
            className="tile tile-wide tile-github"
            href="https://github.com/akshatnerella"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="tile-left">
              <div className="tile-icon tile-icon--github" aria-hidden="true">
                <FaGithub />
              </div>
              <div className="tile-title">
                a bunch of vibe coded projects
              </div>
              <div className="tile-button">Follow</div>
            </div>
            <div className="tile-heatmap">
              {contributionsSvg ? (
                <div
                  className="tile-heatmap-svg"
                  dangerouslySetInnerHTML={{ __html: contributionsSvg }}
                />
              ) : (
                <div className="tile-subtitle">Heatmap unavailable</div>
              )}
            </div>
          </a>
          <a
            className="tile tile-square tile-tiles"
            href={tilesMeta.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="tile-icon tile-icon--site" aria-hidden="true">
              {tilesMeta.faviconUrl ? (
                <Image
                  src={tilesMeta.faviconUrl}
                  alt=""
                  width={44}
                  height={44}
                  unoptimized
                />
              ) : (
                <span>{tilesMeta.hostInitial}</span>
              )}
            </div>
            <div className="tile-title">{tilesMeta.title}</div>
            <div className="tile-subtitle">{tilesMeta.hostname}</div>
          </a>
          <a
            className="tile tile-square tile-x"
            href="https://x.com/akshatnerella"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="tile-icon tile-icon--x" aria-hidden="true">
              <FaXTwitter />
            </div>
            <div className="tile-subtitle">@akshatnerella</div>
            <div className="tile-button">Follow</div>
          </a>
          <a
            className="tile tile-square tile-amazon"
            href={amazonMeta.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="tile-icon tile-icon--site" aria-hidden="true">
              {amazonMeta.faviconUrl ? (
                <Image
                  src={amazonMeta.faviconUrl}
                  alt=""
                  width={44}
                  height={44}
                  unoptimized
                />
              ) : (
                <span>{amazonMeta.hostInitial}</span>
              )}
            </div>
            <div className="tile-title">
              Kindle: Struggle with a Smile by Akshat Nerella
            </div>
            <div className="tile-subtitle">{amazonMeta.hostname}</div>
          </a>
          <div className="tile tile-square tile-map">
            <MapTile />
            <div className="tile-map-label">San Francisco, CA</div>
          </div>
          <div className="tile-heading">✦ I make music</div>
          {spotifyTracks.map((trackUrl) => {
            const trackId = trackUrl.split("/track/")[1]?.split("?")[0] ?? "";
            if (!trackId) return null;
            const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

            return (
              <div className="tile tile-spotify tile-spotify-wide" key={trackId}>
                <iframe
                  title={`Spotify track ${trackId}`}
                  src={embedUrl}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  style={{ height: "152px" }}
                />
              </div>
            );
          })}
          <div className="tile-heading">✦ I code stuff</div>
          {codeMetas.map((meta) => {
            const isPypi = meta.url.includes("piwheels.org/project/pyladdersim");
            const isControls = meta.url.includes(
              "akshatnerella.notion.site/Controls-Engineering-Internship-2023"
            );
            const isRobotArm = meta.url.includes(
              "akshatnerella.notion.site/Autonomous-Robot-Arm"
            );

            return (
            <a
              key={meta.url}
              className="tile tile-square tile-code"
              href={meta.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="tile-icon tile-icon--site" aria-hidden="true">
                {meta.faviconUrl ? (
                  <Image
                    src={meta.faviconUrl}
                    alt=""
                    width={44}
                    height={44}
                    unoptimized
                  />
                ) : (
                  <span>{meta.hostInitial}</span>
                )}
              </div>
              <div className="tile-title">
                {isPypi
                  ? "Pyladdersim - My open source library for python PLC simulation"
                  : isControls
                  ? "Controls Engineering Internship (H&P)"
                  : isRobotArm
                  ? "Autonomous Robot Arm (IEEE-HKN)"
                  : meta.title}
              </div>
              <div className="tile-subtitle">{meta.hostname}</div>
            </a>
            );
          })}
        </section>
        <details className="profile-app-suite profile-app-suite--mobile" open>
          <summary className="profile-heading">&#10038; app suite</summary>
          <div className="profile-tiles">
            <a
              className="profile-tile"
              href="https://logspaceai.vercel.app"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="profile-tile-title">
                Tiles: Log your work, build in public
              </div>
              <div className="profile-tile-subtitle">logspaceai.vercel.app</div>
            </a>
            <a
              className="profile-tile"
              href="https://tiles-five.vercel.app"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="profile-tile-title">
                Turn git repos in beautiful dashboards
              </div>
              <div className="profile-tile-subtitle">tiles-five.vercel.app</div>
            </a>
            <a
              className="profile-tile"
              href="https://conspiracyai.vercel.app"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="profile-tile-title">
                Funny AI that generates conspiracy theories
              </div>
              <div className="profile-tile-subtitle">conspiracyai.vercel.app</div>
            </a>
          </div>
        </details>
      </div>
    </main>
  );
}

