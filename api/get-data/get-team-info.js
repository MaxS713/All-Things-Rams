const puppeteer = require("puppeteer");

module.exports = async function getTeamData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.espn.com/nfl/team/_/name/lar/los-angeles-rams`, {
    waitUntil: "domcontentloaded",
  });
  console.log(`Getting Team Data from ESPN...`);
  let teamStandings = await page.evaluate(() => {
    let data = document.querySelector(".TeamStandings");
    return data.innerHTML;
  });
  console.log(teamStandings)
};
