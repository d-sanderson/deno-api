const data = JSON.parse(Deno.readTextFileSync("./quotes.json"));
import { Quote } from "../models/quote.tsx";

let quotes: Array<Quote> = data;

export const getQuotes = ({ response }: { response: any }) => {
  response.body = quotes;
};

export const getQuotesByCharacter = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const filtered = quotes.filter((quote) => quote.character === params.name);
  if (quotes.length) {
    response.status = 200;
    response.body = filtered;
    return;
  }
  response.status = 400;
  response.body = { msg: `Cannot find character ${params.name}` };
};

export const addQuote = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const {
    quote,
    character,
    episode,
  }: { quote: string; character: string; episode: string } = body.value;
  const obj = {
    quote: quote,
    character: character,
    episode: episode,
  };
  quotes.push(obj);
  response.body = { msg: "OK", quote: obj };
  response.status = 200;
};

export const updateQuote = async ({
  params,
  request,
  response,
}: {
  params: {
    name: string;
  };
  request: any;
  response: any;
}) => {
  const temp = quotes.filter((el) => el.quote === params.name);
  const body = await request.body();
  const { quote }: { quote: string } = body.value;

  if (temp.length) {
    temp[0].quote = quote;
    response.status = 200;
    response.body = { msg: "OK" };
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find quote ${params.name}` };
};

export const removeQuote = ({
  params,
  response,
}: {
  params: {
    quote: string;
  };
  response: any;
}) => {
  const lengthBefore = quotes.length;
  quotes = quotes.filter((quote) => quote.quote !== params.quote);

  if (quotes.length === lengthBefore) {
    response.status = 400;
    response.body = { msg: `Cannot find quote ${params.quote}` };
    return;
  }

  response.body = { msg: "OK" };
  response.status = 200;
};
