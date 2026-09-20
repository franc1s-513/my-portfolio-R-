const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait for the app to load
  await page.waitForTimeout(2000);
  
  // Try to click "TECH JOURNEY" to open it
  console.log("Looking for TECH JOURNEY...");
  // Evaluate click since it's inside R3F canvas / Html overlay
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    for (let b of buttons) {
      if (b.innerText.includes('TECH JOURNEY')) {
        b.click();
        return;
      }
    }
  });
  
  await page.waitForTimeout(2000);
  
  console.log("Looking for Saturn nodes...");
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    for (let b of buttons) {
      if (b.innerText.includes('The Genesis Spark')) {
        b.click();
        return;
      }
    }
  });
  
  await page.waitForTimeout(2000);
  
  console.log("Done checking.");
  await browser.close();
})();
