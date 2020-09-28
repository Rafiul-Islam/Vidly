import Raven from "raven-js";

function init() {
    // Raven.config("https://7d6359e556e84c87b478c34df634005a@o447214.ingest.sentry.io/5426879", {
    //     release: "1.0.0",
    //     environment: "development-test"
    // }).install();
}

function log(error) {
    // Raven.captureException(error);
    console.error(error)
}

export default {
    init,
    log
}
