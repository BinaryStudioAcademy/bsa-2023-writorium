import { type FC } from 'react';

import { Layout } from '~/libs/components/components.js';
import { useParams } from '~/libs/hooks/hooks.js';
import { type TagType } from '~/libs/types/types.js';

import { ArticleView } from './components/article-view/article-view.jsx';
import { Author } from './components/author/author.js';
import styles from './styles.module.scss';

const Article: FC = () => {
  const { id } = useParams();

  const MOCKED_TEXT = `Envision this: there is a technology currently undergoing testing that, when released to the public, will become a long-awaited revolution in energy. This new technology promises to be safer and more efficient than anything we have on the market now. It  will affect that which we consider mundane — power tools, toys, laptops, smartphones —
  and that which we consider exceptional — medical devices, spacecraft, and the innovative new vehicle designs needed to wean us off of fossil fuels. We have known about this  technology for centuries, yet until now we have only been able to take small steps towards its creation. Billions of dollars are pouring into research and billions more will be made once the
  technology has been perfected and released.

  This description may sound a lot like that of fusion power. Yet it’s actually referring to the upcoming innovations in the realm of battery technology — specifically that of solid-state batteries. And while both fusion power and solid-state batteries have been labeled technologies of the future but never of today, advancements and investments in solid-state
  materials have increased tremendously over the years. Today not only are there many major companies and credible researchers involved, it seems we may finally start seeing these batteries released in just the next few years.
  What can we expect once this elusive, transformative technology is finally ready for mass production?`;

  const MOCKED_TAGS: TagType[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'CODE' },
    { id: 3, name: 'Humor' },
    { id: 4, name: 'Work' },
    { id: 5, name: 'Tech' },
  ];

  const MOCKED_ARTICLE = {
    title: 'Modern Full-Stack Developer Tech Stack 2021',
    text: MOCKED_TEXT,
    tags: MOCKED_TAGS,
  };

  return (
    <Layout>
      <div className={styles.container}>
        <ArticleView article={MOCKED_ARTICLE} />
        {id && <Author />}
      </div>
    </Layout>
  );
};

export { Article };
