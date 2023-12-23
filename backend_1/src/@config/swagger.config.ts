import swaggerJsdoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Business Directory Backend APIs",
      version: "1.0.0",
      description: "Business directory api documentation",
    },
    servers: [
      {
        url: "http://localhost:8848",
      },
    ],
  },
  apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);

export default specs;
