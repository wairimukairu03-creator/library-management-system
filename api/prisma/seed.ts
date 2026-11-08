import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Optional clean up before seeding
  await prisma.review.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.genre.deleteMany({});

  // 1. Insert 4 distinct Genres
  const sciFi = await prisma.genre.create({ data: { name: 'Science Fiction' } });
  const fantasy = await prisma.genre.create({ data: { name: 'Fantasy' } });
  const mystery = await prisma.genre.create({ data: { name: 'Mystery' } });
  const biography = await prisma.genre.create({ data: { name: 'Biography' } });

  // 2. Insert 15 books distributed across those genres
  await prisma.book.createMany({
    data: [
      // Science Fiction
      { title: 'Dune', author: 'Frank Herbert', genreId: sciFi.id },
      { title: 'Neuromancer', author: 'William Gibson', genreId: sciFi.id },
      { title: 'Foundation', author: 'Isaac Asimov', genreId: sciFi.id },
      { title: 'Snow Crash', author: 'Neal Stephenson', genreId: sciFi.id },
      
      // Fantasy
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', genreId: fantasy.id },
      { title: 'A Game of Thrones', author: 'George R.R. Martin', genreId: fantasy.id },
      { title: 'The Way of Kings', author: 'Brandon Sanderson', genreId: fantasy.id },
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', genreId: fantasy.id },

      // Mystery
      { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genreId: mystery.id },
      { title: 'Gone Girl', author: 'Gillian Flynn', genreId: mystery.id },
      { title: 'And Then There Were None', author: 'Agatha Christie', genreId: mystery.id },
      { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', genreId: mystery.id },

      // Biography
      { title: 'Steve Jobs', author: 'Walter Isaacson', genreId: biography.id },
      { title: 'Becoming', author: 'Michelle Obama', genreId: biography.id },
      { title: 'Elon Musk', author: 'Walter Isaacson', genreId: biography.id },
    ],
  });

  console.log('✅ Database seeded successfully with 4 genres and 15 books!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
