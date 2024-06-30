const API_BASE_URL = 'https://api.dune.com/api/v1/eigenlayer';

const duneAPIMiddleware = async (req, res, next) => {
    const { url } = req.query;
    if (typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL parameter' });
    }

    const fullUrl = url.startsWith('https://') ? url : `${API_BASE_URL}/${url}`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'x-dune-api-key': process.env.DUNE_API_KEY || '',
        },
    };

    try {
        const response = await fetch(fullUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from Dune API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Dune API' });
    }
};

export default duneAPIMiddleware;