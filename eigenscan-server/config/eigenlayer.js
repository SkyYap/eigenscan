const API_ROUTE_BASE_URL = '/api/dune';

function getFullUrl(path) {
    if (typeof window === 'undefined') {
        // Running on the server, use absolute URL
        return `http://localhost:8000${path}`;
    }
    // Running on the client, use relative URL
    return path;
}

async function fetchFromAPIRoute(url) {
    const fullUrl = getFullUrl(url);
    const response = await fetch(fullUrl);
    if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function GetAVSStats(limit = 10, sortBy = 'num_operators desc', nextUri = '') {
    let queryParams = `avs-stats?limit=${limit}&sort_by=${encodeURIComponent(sortBy)}`;
    let url = `${API_ROUTE_BASE_URL}?url=${encodeURIComponent(queryParams)}`;

    if (nextUri) {
        url = `${API_ROUTE_BASE_URL}?url=${encodeURIComponent(nextUri)}`;
    }

    const data = await fetchFromAPIRoute(url);
    const stats = data.result.rows;
    const nextPageUri = data.next_uri;
    return { stats, nextUri: nextPageUri };
}

export async function GetAVSMetadata(avsAddresses) {
    const addresses = avsAddresses.map((addr) => `"${addr}"`).join(',');
    const queryParams = `avs-metadata?filters=avs_contract_address in (${encodeURIComponent(addresses)})`;
    const url = `${API_ROUTE_BASE_URL}?url=${encodeURIComponent(queryParams)}`;
    const data = await fetchFromAPIRoute(url);
    return data.result.rows;
}

export async function GetCombinedAVSData(limit = 8, offset = 0, sortBy = 'num_operators desc', nextUri = '') {
    try {
        const { stats, nextUri: newNextUri } = await GetAVSStats(limit, sortBy, nextUri);
        const avsAddresses = stats.map((stat) => stat.avs_contract_address);
        const metadata = await GetAVSMetadata(avsAddresses);

        const combinedData = stats.map((stat) => {
            const meta = metadata.find((meta) => meta.avs_contract_address === stat.avs_contract_address);
            return { ...meta, ...stat };
        });

        return { combinedData, nextUri: newNextUri };
    } catch (error) {
        console.error('Error combining AVS data:', error);
        throw new Error('Failed to combine AVS data');
    }
}

export async function GetOperators(avsAddress) {
    const queryParams = `operator-to-avs-mapping?filters=avs_contract_address=${encodeURIComponent(avsAddress)}`;
    const url = `${API_ROUTE_BASE_URL}?url=${encodeURIComponent(queryParams)}`;
    const data = await fetchFromAPIRoute(url);
    return data.result.rows.map((op) => ({
        operator_contract_address: op.operator_contract_address,
        registered_time: new Date(op.registered_time).getTime(), // Convert registered_time to timestamp for sorting
        avs_name: op.avs_name
    }));
}

async function fetchOperatorStatsBatch(operatorAddresses) {
    const addresses = operatorAddresses.map((addr) => `"${addr}"`).join(',');
    const queryParams = `operator-stats?filters=operator_contract_address in (${encodeURIComponent(addresses)})`;
    const url = `${API_ROUTE_BASE_URL}?url=${encodeURIComponent(queryParams)}`;
    const data = await fetchFromAPIRoute(url);
    return data.result.rows;
}

async function fetchOperatorMetadataBatch(operatorAddresses) {
    const addresses = operatorAddresses.map((addr) => `"${addr}"`).join(',');
    const queryParams = `operator-metadata?filters=operator_contract_address in (${encodeURIComponent(addresses)})`;
    const url = `${API_ROUTE_BASE_URL}?url=${encodeURIComponent(queryParams)}`;
    const data = await fetchFromAPIRoute(url);
    return data.result.rows;
}

export async function GetOperatorStats(operatorAddresses) {
    const batchSize = 10; // Adjust batch size as needed
    let allStats = [];
    for (let i = 0; i < operatorAddresses.length; i += batchSize) {
        const batch = operatorAddresses.slice(i, i + batchSize);
        const batchStats = await fetchOperatorStatsBatch(batch);
        allStats = [...allStats, ...batchStats];
    }
    return allStats;
}

export async function GetOperatorMetadata(operatorAddresses) {
    const batchSize = 10; // Adjust batch size as needed
    let allMetadata = [];
    for (let i = 0; i < operatorAddresses.length; i += batchSize) {
        const batch = operatorAddresses.slice(i, i + batchSize);
        const batchMetadata = await fetchOperatorMetadataBatch(batch);
        allMetadata = [...allMetadata, ...batchMetadata];
    }
    return allMetadata;
}

export async function GetCombinedOperatorsData(avsAddress, batchStart, batchSize) {
    try {
        const operators = await GetOperators(avsAddress);

        // Sort operators by registered_time
        operators.sort((a, b) => a.registered_time - b.registered_time);

        const operatorAddresses = operators.map((op) => op.operator_contract_address);
        const currentBatchAddresses = operatorAddresses.slice(batchStart, batchStart + batchSize);

        const stats = await GetOperatorStats(currentBatchAddresses);
        const operatorAddressesWithStats = stats.map((stat) => stat.operator_contract_address);
        const operatorMetadata = await GetOperatorMetadata(operatorAddressesWithStats);

        const combinedData = stats.map((stat) => {
            const meta = operatorMetadata.find((meta) => meta.operator_contract_address === stat.operator_contract_address);
            const operator = operators.find((op) => op.operator_contract_address === stat.operator_contract_address);
            return { ...meta, ...stat, registered_time: operator.registered_time };
        });

        const hasMore = batchStart + batchSize < operatorAddresses.length;
        const avsName = operators.length > 0 ? operators[0].avs_name : '';

        return { combinedData, hasMore, avsName };
    } catch (error) {
        console.error('Error combining operator data:', error);
        throw new Error('Failed to combine operator data');
    }
}
