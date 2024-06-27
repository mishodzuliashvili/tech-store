import { z } from "zod";

const updateCurrentUserSchema = z.object({
  givenName: z.string(),
  // SOME OTHER FIELDS...
});

export default updateCurrentUserSchema;
