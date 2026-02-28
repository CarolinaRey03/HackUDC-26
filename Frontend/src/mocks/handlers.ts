import { BASE_URL } from "@/api";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(`${BASE_URL}/docs/all`, () => {
    return HttpResponse.json([
      {
        id: "1",
        name: "fichero1.txt",
      },
      {
        id: "2",
        name: "docu.docx",
      },
    ]);
  }),
];
