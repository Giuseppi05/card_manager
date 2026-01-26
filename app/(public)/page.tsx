import { Game } from "@prisma/client";

async function getGames(): Promise<Game[]> {
  try {
    const res = await fetch("http://localhost:3000/api/game", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

export default async function Home() {
  const games = await getGames();
  const noGames = games.length === 0;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Juegos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {noGames ? (
          <p className="text-center text-gray-500 col-span-full">
            No tienes juegos disponibles.
          </p>
        ) : (
          games.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <img
                src={game.image || "placeholders/placeholder_image.png"}
                alt={game.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {game.name}
                </h2>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
