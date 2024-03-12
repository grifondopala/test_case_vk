import { useQuery } from "@tanstack/react-query";
import { fetchFact } from "../api";

export function QueryFact(){
    return useQuery({
        queryKey: [''],
        queryFn: fetchFact,
        enabled: false,
    })
}