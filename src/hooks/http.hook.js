
export const useHttp = () => {

    const request = (async (url, method = 'GET', body = null, headers = {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Content-Type': 'application/json',
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
    }) => {
        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (e) {
            throw e;
        }
    });

    return {
        request
    }
}
