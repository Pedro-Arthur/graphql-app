const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const { typeDefs, resolvers } = require("./graphql");

const usersRouter = require("./routes/users");

const app = express();

const port = 3000;

app.use(cors());

app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/api/graphql" });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api/users", usersRouter);

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(
      `GraphQL disponível em http://localhost:${port}${server.graphqlPath}`
    );
  });
}

startServer();
