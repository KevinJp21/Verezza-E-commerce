import { gql } from "@apollo/client/core";
import client from "~/lib/apolloClient";
import { json, type LoaderFunction } from "@remix-run/node";

const GET_AVAILABLE_COUNTRIES = gql`
query getAvailableCountries {
    localization {
    availableCountries {
      name
      isoCode
        }
    }
}
`;

export const loader: LoaderFunction = async () => {
    const { data } = await client.query({ 
        query: GET_AVAILABLE_COUNTRIES,
        fetchPolicy: 'cache-first',
    });

    const countriesResponse = data.localization.availableCountries;
    return json(countriesResponse);
};
