import { rest } from 'msw';
import { API_URL } from '../app/constants';

export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
      const character = req.url.searchParams.get("character");
      if (character === "afsd") {
        return res(ctx.json([]));
      }
      if (character === "homer") {
        return res(
          ctx.json([
            {
              quote: "I believe the children are the future... Unless we stop them now!",
              character: "Homer Simpson",
              image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
              characterDirection: "Right",
            },
          ])
        );
      } else if (character === "bart") {
        return res(
          ctx.json([
            {
              quote: "You're turning me into a criminal when all I want to be is a petty thug.",
              character: "Bart Simpson",
              image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638",
              characterDirection: "Right",
            },
          ])
        );
      } 
    }),
  ];