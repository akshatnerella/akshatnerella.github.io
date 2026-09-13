type ContributionDay = {
  contributionCount: number;
  date: string;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

const githubToken = process.env.GITHUB_TOKEN ?? "";

function buildContributionSvg(weeks: ContributionWeek[]) {
  const recentWeeks = weeks.slice(-12);
  const square = 8;
  const gap = 2;
  const width = recentWeeks.length * (square + gap);
  const height = 7 * (square + gap);

  const rects: string[] = [];
  recentWeeks.forEach((week, xIndex) => {
    week.contributionDays.forEach((day, yIndex) => {
      const x = xIndex * (square + gap);
      const y = yIndex * (square + gap);
      const color = day.color || "#ebedf0";
      rects.push(
        `<rect x="${x}" y="${y}" width="${square}" height="${square}" rx="2" fill="${color}"><title>${day.date}: ${day.contributionCount} contributions</title></rect>`
      );
    });
  });

  return `<svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${rects.join(
    ""
  )}</svg>`;
}

async function getContributionsViaGraphQL(username: string) {
  if (!githubToken) return null;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    color
                  }
                }
              }
            }
          }
        }
      `,
      variables: { login: username },
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            weeks?: ContributionWeek[];
          };
        };
      };
    };
  };

  const weeks =
    data.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  if (!weeks.length) return null;
  return buildContributionSvg(weeks);
}

async function getContributionsViaScrape(username: string) {
  const response = await fetch(
    `https://github.com/users/${username}/contributions`,
    {
      headers: {
        "User-Agent": "nerellame",
      },
    }
  );

  if (!response.ok) return null;

  const html = await response.text();
  const svgMatch = html.match(/<svg[\s\S]*<\/svg>/i);
  if (!svgMatch) return null;

  let svg = svgMatch[0];
  svg = svg.replace(/<text[\s\S]*?<\/text>/gi, "");
  svg = svg.replace(/<a[\s\S]*?<\/a>/gi, "");
  svg = svg.replace(/<g[^>]*class="legend"[\s\S]*?<\/g>/gi, "");
  svg = svg.replace(/width="[^"]*"/i, 'width="100%"');
  svg = svg.replace(/height="[^"]*"/i, 'height="100%"');
  return svg;
}

export async function getGithubContributionsSvg(username: string) {
  if (!username) return null;

  const graphSvg = await getContributionsViaGraphQL(username);
  if (graphSvg) return graphSvg;

  return getContributionsViaScrape(username);
}
