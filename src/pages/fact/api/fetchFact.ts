type fetchFactReturnType = {
    fact: string,
    length: number,
}

export function fetchFact(): Promise<fetchFactReturnType>{
    return fetch('https://catfact.ninja/fact').then((res) =>res.json() )
}