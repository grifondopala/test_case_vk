type fetchAgeReturnType = {
    name: string,
    age: number,
    count: number,
}

export function fetchAge({ queryKey, signal }: {queryKey: Array<string>, signal: AbortSignal | null | undefined }): Promise<fetchAgeReturnType>{
    const [name] = queryKey;
    return fetch(`https://api.agify.io?name=${name}`, {signal}).then((res) => res.json()) 
}