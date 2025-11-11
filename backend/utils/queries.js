// utils/queries.js
export const GET_ORDERS_QUERY = `
{
  orders(first: 20, sortKey: CREATED_AT, reverse: true) {
    edges {
      node {
        id
        name
        createdAt
        displayFinancialStatus
        totalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        customer {
          firstName
          lastName
        }
        lineItems(first: 10) {
          edges {
            node {
              id
              name
              quantity
              image {
                originalSrc
              }
            }
          }
        }
      }
    }
  }
}
`;
