import { prisma } from "./prisma-client";

// A `main` function so that we can use async/await
async function main() {
  // Create a new user called `Alice`
  const newUser = await prisma.createTodo({ title: "Alice" });
  // tslint:disable:no-console
  console.log(`Created new user: ${newUser.title} (ID: ${newUser.id})`);

  // Read all users from the database and print them to the console
  const allTodos = await prisma.todoes();
  console.log(allTodos);
}

main().catch(e => console.error(e));
