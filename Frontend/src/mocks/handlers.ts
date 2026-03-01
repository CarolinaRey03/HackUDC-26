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
      {
        id: "3",
        name: "don quijote de la mancha.pdf",
      },
      {
        id: "4",
        name: "imagen de perro.png",
      },
      {
        id: "5",
        name: "fichero1.txt",
      },
      {
        id: "6",
        name: "docu.docx",
      },
      {
        id: "7",
        name: "don quijote de la mancha.pdf",
      },
      {
        id: "8",
        name: "imagen de perro.png",
      },
      {
        id: "9",
        name: "fichero1.txt",
      },
      {
        id: "10",
        name: "docu.docx",
      },
      {
        id: "11",
        name: "don quijote de la mancha.pdf",
      },
      {
        id: "12",
        name: "imagen de perro.png",
      },
      {
        id: "13",
        name: "fichero1.txt",
      },
      {
        id: "14",
        name: "docu.docx",
      },
      {
        id: "15",
        name: "don quijote de la mancha.pdf",
      },
      {
        id: "16",
        name: "imagen de perro.png",
      },
    ]);
  }),

  http.get(`${BASE_URL}/docs/filtered`, () => {
    return HttpResponse.json([
      {
        id: "7",
        name: "filtered_thing.txt",
      },
    ]);
  }),
];
