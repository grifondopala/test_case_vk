import { useQuery } from "@tanstack/react-query";
import { fetchAge } from "../api";

export function QueryAge(name: string){
    return useQuery({
        queryKey: [name],
        queryFn: fetchAge,
        enabled: false,
    })
}