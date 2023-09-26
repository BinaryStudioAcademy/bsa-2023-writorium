import { type QueryBuilder } from 'objection';

import { type UserDetailsModel } from '../../user-details.model.js';

const getAuthorsSubquery = () => {
  return (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
  ): void => {
    void builder
      .distinctOn('userId')
      .select('userId', 'firstName', 'lastName')
      .from('user_details')
      .whereRaw(
        `
        EXISTS(SELECT 1
        FROM articles, user_details
        WHERE articles.user_id = user_details.user_id)
        `,
      )
      .orderBy('userId')
      .as('subquery');
  };
};

export { getAuthorsSubquery };
