export const postJson = (url: string, json: any): Promise<Response> => {
    return fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json),
    })
}
