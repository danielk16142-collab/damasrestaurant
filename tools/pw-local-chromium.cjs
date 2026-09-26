// Preload for the kit's scripts/check_type.mjs in this cloud container: the
// installed Playwright expects a newer browser build than the one provided, so
// point chromium.launch at the pre-installed Chromium. Not needed on a normal machine.
//   node -r ./tools/pw-local-chromium.cjs premium-site-kit/scripts/check_type.mjs http://localhost:4321
const pw = require(require.resolve('playwright', { paths: [process.cwd()] }));
const launch = pw.chromium.launch.bind(pw.chromium);
pw.chromium.launch = (opts = {}) => launch({ executablePath: '/opt/pw-browsers/chromium', ...opts });
