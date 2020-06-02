import { Router } from "https://deno.land/x/oak/mod.ts";
import { getQuotes, addQuote, removeQuote, updateQuote, getQuotesByCharacter} from "../controllers/quotes_controller.tsx";

const router = new Router();
router
  .get("/quotes", getQuotes)
  .post("/quotes", addQuote)
  .delete("quotes/:quote", removeQuote)
  .put("/quote/:name", updateQuote)
  .get("/quotes/:name", getQuotesByCharacter);

  export default router;