import {
  IconButton,
  Link,
  ShareOnFacebookButton,
  Tags,
} from '~/libs/components/components.js';
import { AppRoute, Reaction } from '~/libs/enums/enums.js';
import {
  configureString,
  getReactionsInfo,
  getValidClassNames,
  sanitizeHtml,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type TagType, type ValueOf } from '~/libs/types/types.js';
import {
  type ArticleWithCommentCountResponseDto,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { getReactionConvertedToBoolean } from '../../../articles/libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  title: string;
  text: string;
  tags: TagType[] | null;
  coverUrl: string | null;
  isShared?: boolean;
  isArticleOwner?: boolean;
  article?: ArticleWithCommentCountResponseDto;
  reactions?: ReactionResponseDto[];
};

const onButtonClick = (): void => {
  /**
   * @todo implement handle logic for buttons clicked events(favorite, comment, share)
   */
};

const ArticleView: React.FC<Properties> = ({
  title,
  text,
  tags,
  coverUrl,
  isShared = false,
  isArticleOwner,
  article,
  reactions = [],
}) => {
  const articleUrl = window.location.href;

  const { id } = useParams();

  const user = useAppSelector(({ auth }) => auth.user) as UserAuthResponseDto;

  const dispatch = useAppDispatch();

  const handleShareButtonClick = useCallback((): void => {
    if (id) {
      void dispatch(articlesActions.shareArticle({ id }));
    }
  }, [dispatch, id]);

  const handleDeleteArticle = useCallback((): void => {
    void dispatch(
      articlesActions.deleteArticle({ id: Number(id), hasRedirect: true }),
    );
  }, [dispatch, id]);

  const { likesCount, dislikesCount, hasAlreadyReactedWith } = user?.id
    ? getReactionsInfo(user.id, reactions)
    : { likesCount: null, dislikesCount: null, hasAlreadyReactedWith: null };

  const handleReaction = (reaction: ValueOf<typeof Reaction>): void => {
    if (isArticleOwner) {
      return;
    }

    if (hasAlreadyReactedWith === reaction) {
      return void dispatch(
        articlesActions.deleteArticleReaction({
          isLike: getReactionConvertedToBoolean(reaction),
          articleId: Number(id),
        }),
      );
    }

    void dispatch(
      articlesActions.reactToArticle({
        isLike: getReactionConvertedToBoolean(reaction),
        articleId: Number(id),
      }),
    );
  };

  const handleLikeReaction = (): void => {
    handleReaction(Reaction.LIKE);
  };

  const handleDislikeReaction = (): void => {
    handleReaction(Reaction.DISLIKE);
  };

  return (
    <div
      className={getValidClassNames(styles.body, coverUrl && styles.hasCover)}
    >
      <div className={styles.coverWrapper}>
        {coverUrl && (
          <img alt="article cover" className={styles.cover} src={coverUrl} />
        )}
        {!isShared && (
          <div className={styles.buttonsWrapper}>
            {isArticleOwner && (
              <>
                <IconButton
                  iconName="trashBin"
                  className={styles.iconButton}
                  iconClassName={styles.icon}
                  onClick={handleDeleteArticle}
                />
                <Link
                  to={
                    configureString(AppRoute.ARTICLES_EDIT_$ID, {
                      id: String(id),
                    }) as typeof AppRoute.ARTICLES_EDIT_$ID
                  }
                  state={article}
                >
                  <IconButton
                    iconName="edit"
                    className={styles.iconButton}
                    iconClassName={styles.icon}
                    onClick={onButtonClick}
                  />
                </Link>
              </>
            )}
            <IconButton
              iconName="favorite"
              className={styles.iconButton}
              iconClassName={styles.icon}
              onClick={onButtonClick}
            />
            <IconButton
              iconName="comment"
              className={styles.iconButton}
              iconClassName={styles.icon}
              onClick={onButtonClick}
            />
            <IconButton
              iconName="share"
              className={styles.iconButton}
              iconClassName={styles.icon}
              onClick={handleShareButtonClick}
            />
            <ShareOnFacebookButton
              title={title}
              articleUrl={articleUrl}
              iconStyle={getValidClassNames(
                styles.iconButton,
                styles.facebookIconButton,
              )}
            />
            <IconButton
              iconName="like"
              iconClassName={styles.icon}
              className={getValidClassNames(
                styles.reactionIcon,
                isArticleOwner && styles.disabled,
                hasAlreadyReactedWith === Reaction.LIKE && styles.pressed,
              )}
              label={String(likesCount)}
              onClick={handleLikeReaction}
            />
            <IconButton
              iconName="dislike"
              iconClassName={styles.icon}
              className={getValidClassNames(
                styles.reactionIcon,
                isArticleOwner && styles.disabled,
                hasAlreadyReactedWith === Reaction.DISLIKE && styles.pressed,
              )}
              label={String(dislikesCount)}
              onClick={handleDislikeReaction}
            />
          </div>
        )}
      </div>
      <div className={styles.articleContent}>
        <h4 className={styles.title}>{title}</h4>
        {tags && <Tags tags={tags} />}
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
        />
      </div>
    </div>
  );
};

export { ArticleView };
