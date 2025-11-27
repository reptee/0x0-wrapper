import { providers } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  return { providers };
};
