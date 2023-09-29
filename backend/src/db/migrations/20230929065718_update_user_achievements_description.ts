import { type Knex } from 'knex';

const ACHIEVEMENTS = [
  {
    key: 'write_first_article',
    description: 'Congratulations on writing your first article!',
  },
  {
    key: 'write_5_articles',
    description: 'You have written 5 articles! Keep up the great work!',
  },
  {
    key: 'write_10_articles',
    description: 'You have reached 10 articles! Your dedication is inspiring!',
  },
  {
    key: 'write_15_articles',
    description: '15 articles written! You are a writing machine!',
  },
  {
    key: 'write_25_articles',
    description:
      '25 articles written! Your commitment to writing is impressive!',
  },
  {
    key: 'write_50_articles',
    description:
      'Wow, you have written 50 articles! You are a prolific writer!',
  },
  {
    key: 'write_first_comment',
    description:
      'You left your first comment! Keep engaging with the community!',
  },
  {
    key: 'write_5_comments',
    description: 'You have written 5 comments! Your insights are valuable!',
  },
  {
    key: 'write_10_comments',
    description:
      'You have left 10 comments! Your contributions are appreciated!',
  },
  {
    key: 'write_15_comments',
    description:
      '15 comments made! You are actively participating in discussions!',
  },
  {
    key: 'write_25_comments',
    description:
      '25 comments written! You are an engaged member of the community!',
  },
  {
    key: 'write_50_comments',
    description: '50 comments made! Your feedback and discussions matter!',
  },
];

const NOT_STARTED_ARTICLE_ACHIEVEMENT_DESCRIPTION =
  'Get started on your writing journey! Your first article is just a few keystrokes away. Dive in and share your thoughts with the world.';
const NOT_STARTED_COMMENT_ACHIEVEMENT_DESCRIPTION =
  'Ready to join the conversation? Leave your first comment and become a part of the discussion!';
const UPDATED_ACHIEVEMENTS = [
  {
    key: 'write_first_article',
    description: {
      notStarted: NOT_STARTED_ARTICLE_ACHIEVEMENT_DESCRIPTION,
      earlyStage: NOT_STARTED_ARTICLE_ACHIEVEMENT_DESCRIPTION,
      inProgress: NOT_STARTED_ARTICLE_ACHIEVEMENT_DESCRIPTION,
      done: 'Congratulations on completing your first article! 🎉 Your journey as a writer has begun. Share your work with pride!',
    },
  },
  {
    key: 'write_5_articles',
    description: {
      notStarted: NOT_STARTED_ARTICLE_ACHIEVEMENT_DESCRIPTION,
      earlyStage:
        'You are off to a great start with your first article! Keep those ideas flowing and your pen moving.',
      inProgress:
        'You are making progress on your path to writing five articles! Keep those creative juices flowing, and you will reach your next milestone soon.',
      done: 'Congratulations on writing your fifth article! 🎉 You are building a substantial body of work. Keep the momentum going!',
    },
  },
  {
    key: 'write_10_articles',
    description: {
      notStarted: NOT_STARTED_ARTICLE_ACHIEVEMENT_DESCRIPTION,
      earlyStage:
        'You are making progress toward writing ten articles! Stay committed, and you will soon reach this significant milestone.',
      inProgress:
        'You are well on your way to completing your tenth article! Keep up the excellent work, and you will achieve this milestone in no time.',
      done: 'Congratulations on writing your tenth article! 🎉 You have proven your dedication to writing. Keep the creativity flowing!',
    },
  },
  {
    key: 'write_15_articles',
    description: {
      notStarted: NOT_STARTED_ARTICLE_ACHIEVEMENT_DESCRIPTION,
      earlyStage: 'You are making progress toward writing fifteen articles!',
      inProgress:
        'You are well on your way to completing your fifteenth article! Keep up the excellent work!',
      done: 'Congratulations on writing your fifteenth article! 🎉 Your dedication to writing is truly impressive. Keep those creative ideas flowing!',
    },
  },
  {
    key: 'write_25_articles',
    description: {
      notStarted: NOT_STARTED_ARTICLE_ACHIEVEMENT_DESCRIPTION,
      earlyStage:
        'You are making headway toward writing twenty-five articles! Keep those creative juices flowing, and you will soon achieve this significant milestone.',
      inProgress:
        'You are well on your way to completing your twenty-fifth article! Your dedication to writing is paying off. Keep up the great work!',
      done: 'Congratulations on writing your twenty-fifth article! 🎉 Your body of work is substantial, and your commitment to writing is commendable. Keep inspiring others!',
    },
  },
  {
    key: 'write_50_articles',
    description: {
      notStarted: NOT_STARTED_ARTICLE_ACHIEVEMENT_DESCRIPTION,
      earlyStage:
        'You are on your way to writing fifty articles! Keep the momentum going!',
      inProgress:
        'You are getting closer to writing your fiftieth article! Your dedication to writing is evident. Keep pushing forward!',
      done: 'Congratulations on writing your fiftieth article! 🎉 You are a prolific writer, and your dedication is an inspiration to others. Keep the words flowing!',
    },
  },
  {
    key: 'write_first_comment',
    description: {
      notStarted: NOT_STARTED_COMMENT_ACHIEVEMENT_DESCRIPTION,
      earlyStage: NOT_STARTED_COMMENT_ACHIEVEMENT_DESCRIPTION,
      inProgress: NOT_STARTED_COMMENT_ACHIEVEMENT_DESCRIPTION,
      done: 'Congratulations on leaving your first comment! 🎉 Your voice matters, and you are making an impact in the community.',
    },
  },
  {
    key: 'write_5_comments',
    description: {
      notStarted: NOT_STARTED_COMMENT_ACHIEVEMENT_DESCRIPTION,
      earlyStage:
        'You are off to a great start with your first comment! Keep up the great work!',
      inProgress:
        'You are actively engaging with discussions! Your participation is valuable, and you are well on your way to achieving this milestone.',
      done: 'Congratulations on leaving your fifth comment! 🎉 You are becoming a respected voice in the community. Keep those insights flowing!',
    },
  },
  {
    key: 'write_10_comments',
    description: {
      notStarted: NOT_STARTED_COMMENT_ACHIEVEMENT_DESCRIPTION,
      earlyStage:
        'You are making great strides in the world of commenting! Keep engaging with the community!',
      inProgress:
        'You are actively engaging with discussions and making an impact! Keep it up, and you will achieve this milestone in no time.',
      done: 'Congratulations on leaving your tenth comment! 🎉 Your contributions are valued, and you are a key part of the community.',
    },
  },
  {
    key: 'write_15_comments',
    description: {
      notStarted: NOT_STARTED_COMMENT_ACHIEVEMENT_DESCRIPTION,
      earlyStage:
        'You are on your way to writing fifteen comments! Keep engaging with the community!',
      inProgress:
        'You are actively participating in discussions and making your voice heard!',
      done: 'Congratulations on leaving your fifteenth comment! 🎉 Your contributions are invaluable, and you are a respected member of the community.',
    },
  },
  {
    key: 'write_25_comments',
    description: {
      notStarted: NOT_STARTED_COMMENT_ACHIEVEMENT_DESCRIPTION,
      earlyStage:
        'You are actively engaging with discussions and contributing to the community! Your dedication is taking you closer to this achievement.',
      inProgress: 'You are well on your way to leaving twenty-five comments!',
      done: 'Congratulations on leaving your twenty-fifth comment! 🎉 You are a valuable member of the community, and your insights are making a difference.',
    },
  },
  {
    key: 'write_50_comments',
    description: {
      notStarted: NOT_STARTED_COMMENT_ACHIEVEMENT_DESCRIPTION,
      earlyStage:
        'You are making substantial contributions to discussions! Keep sharing your insights.',
      inProgress:
        'You are actively participating in discussions and leaving your mark! Your dedication to commenting is paying off as you work toward this achievement.',
      done: 'Congratulations on leaving your fiftieth comment! 🎉 You are a prolific commenter and a cornerstone of the community. Keep the conversations alive!',
    },
  },
];

const TABLE_NAME = 'achievements';

const ColumnName = {
  KEY: 'key',
  DESCRIPTION: 'description',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.DESCRIPTION);
  });

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.jsonb(ColumnName.DESCRIPTION);
  });

  for (const achievement of UPDATED_ACHIEVEMENTS) {
    await knex(TABLE_NAME)
      .where(ColumnName.KEY, achievement.key)
      .update({ [ColumnName.DESCRIPTION]: achievement.description });
  }
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.DESCRIPTION);
  });

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.text(ColumnName.DESCRIPTION);
  });

  for (const achievement of ACHIEVEMENTS) {
    await knex(TABLE_NAME)
      .where(ColumnName.KEY, achievement.key)
      .update({ [ColumnName.DESCRIPTION]: achievement.description });
  }
}

export { down, up };
