import { useAuth } from "@/context/AuthContext";
import { Game } from "@prisma/client";
import { useFetch } from "@/hooks/useFetch";

export const useActiveGamesByUser = () => {
    const { user, isAuthenticated } = useAuth();
    
    const url = user && isAuthenticated ? `/api/game/${user.id}` : null;
    const { data: games, loading, error, refetch } = useFetch<Game[]>(url);

    return {
        games: games || [],
        loading,
        error,
        refetch
    };
};