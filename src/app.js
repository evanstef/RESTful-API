import { logger } from "./application/winston.js";
import { web } from "./application/web.js";

web.listen(3000, () => {
    logger.info("Listening on port 3000")
})