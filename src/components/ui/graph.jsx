import { cacheExchange, createClient, fetchExchange, Provider, useQuery } from 'urql';

const client = createClient({
  url: 'https://gateway-arbitrum.network.thegraph.com/api/5592c5b950be4cac6c94c3767dd2f3ce/subgraphs/id/HUZDsRpEVP2AvzDCyzDHtdc64dyDxx8FQjzsmqSg4H3B',
  exchanges: [cacheExchange, fetchExchange],
});

const QUERY = `{
  factories(first: 5) {
    id
    poolCount
    txCount
    totalVolumeUSD
  }
  bundles(first: 5) {
    id
    ethPriceUSD
  }
}`;

const ExampleComponent = () => {
  const [result] = useQuery({ query: QUERY });
  const { data, fetching, error } = result;

    // Log the fetching, error, and data to the console
    console.log('Fetching:', fetching);
    console.log('Error:', error);
    console.log('Data:', data);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

const WrappedExampleComponent = () => (
  <Provider value={client}>
    <ExampleComponent />
  </Provider>
);

export default WrappedExampleComponent;
