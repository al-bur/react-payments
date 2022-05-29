import { API_URL } from 'constants';

import {
  validator,
  addCardValidatorConditions,
  getCardsValidatorConditions,
} from 'utils/validator';

async function fetcher({
  method,
  path,
  headers,
  bodyData,
  validatorConditions,
}) {
  const response = await fetch(`${API_URL + path}`, {
    method,
    headers,
    body: bodyData && JSON.stringify({ data: bodyData }),
  });

  const result = await response.json();

  validator({ validatorConditions, response, result });

  return result;
}

function addCardFetcher(cardFormData) {
  return fetcher({
    method: 'POST',
    path: '/api/cards',
    headers: {
      'Content-Type': 'application/json',
    },
    bodyData: cardFormData,
    validatorConditions: addCardValidatorConditions,
  });
}

function getCardsFetcher() {
  return fetcher({
    method: 'GET',
    path: '/api/cards',
    headers: {
      'Content-Type': 'application/json',
    },
    validatorConditions: getCardsValidatorConditions,
  });
}

export { addCardFetcher, getCardsFetcher };