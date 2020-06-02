import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const data = JSON.parse(Deno.readTextFileSync("./quotes.json"));
const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";
import { getQuotes, addQuote, removeQuote, updateQuote, getQuotesByCharacter} from "./controllers/QuotesController.tsx";

const router = new Router();
router
  .get("/quotes", getQuotes)
  .post("/quotes", addQuote)
  .delete("quotes/:quote", removeQuote)
  .put("/quote/:name", updateQuote)
  .get("/quotes/:name", getQuotesByCharacter);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
