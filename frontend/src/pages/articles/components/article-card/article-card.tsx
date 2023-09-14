import {
  Avatar,
  Button,
  Icon,
  IconButton,
  Link,
  ShareOnFacebookButton,
  Tags,
  TooltipClickable,
} from '~/libs/components/components.js';
import {
  AppRoute,
  DataTooltipId,
  DateFormat,
  Reaction,
} from '~/libs/enums/enums.js';
import {
  getFormattedDate,
  getFullName,
  getReactionsInfo,
  getValidClassNames,
  sanitizeHtml,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { type TagType, type ValueOf } from '~/libs/types/types.js';
import {
  type ArticleResponseDto,
  getReadTimeString,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';
import {
  type UserAuthResponseDto,
  type UserDetailsResponseDto,
} from '~/packages/users/users.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { MOCKED_REACTIONS } from '../../libs/constants.js';
import { getReactionConvertedToBoolean } from '../../libs/helpers/helpers.js';
import { PopoverButtonsGroup } from './libs/components/components.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleResponseDto;
  author: UserDetailsResponseDto;
  tags: TagType[];
  reactions: ReactionResponseDto[];
};

const ArticleCard: React.FC<Properties> = ({
  article,
  author,
  tags,
  reactions,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ auth }) => auth.user) as UserAuthResponseDto;
  // const { handleToggleModalOpen, isOpen } = useModal();

  const { publishedAt, title, text, id, userId, coverUrl, readTime } = article;
  const { likesCount, dislikesCount, hasAlreadyReactedWith } = getReactionsInfo(
    user.id,
    reactions,
  );
  const { firstName, lastName, avatarUrl } = author;
  const articleUrl = window.location.href;
  const articleRouteById = AppRoute.ARTICLE.replace(':id', String(id));

  const isOwnArticle = user.id === userId;

  // const handleActionsButtonClick = useCallback((): void => {
  //   if (!isOpen) {
  //     handleToggleModalOpen();
  //   }
  // }, [handleToggleModalOpen, isOpen]);

  const handleReaction = (reaction: ValueOf<typeof Reaction>): void => {
    if (isOwnArticle) {
      return;
    }

    if (hasAlreadyReactedWith === reaction) {
      return void dispatch(
        articlesActions.deleteArticleReaction({
          isLike: getReactionConvertedToBoolean(reaction),
          articleId: id,
        }),
      );
    }

    void dispatch(
      articlesActions.reactToArticle({
        isLike: getReactionConvertedToBoolean(reaction),
        articleId: id,
      }),
    );
  };

  const handleLikeReaction = (): void => {
    handleReaction(Reaction.LIKE);
  };

  const handleDislikeReaction = (): void => {
    handleReaction(Reaction.DISLIKE);
  };

  const handleSharedButtonClick = useCallback((): void => {
    void dispatch(articlesActions.shareArticle({ id: id.toString() }));
  }, [dispatch, id]);

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Avatar
            username={getFullName(firstName, lastName)}
            avatarUrl={avatarUrl}
          />
          <span className={styles.publisherName}>
            {getFullName(firstName, lastName)}
          </span>
          {publishedAt && (
            <span className={styles.publicationTime}>
              {getFormattedDate(publishedAt, DateFormat.DAY_SHORT_MONTH)}
            </span>
          )}
          {readTime && (
            <span className={styles.publicationTime}>
              {getReadTimeString(readTime)}
            </span>
          )}
        </div>
        <div className={styles.iconWrapper}>
          <Button
            name="more-actions"
            label={
              <Icon
                iconName="threeDotsVertical"
                className={getValidClassNames(
                  styles.threeDotsIcon,
                  styles.pointerIcon,
                )}
              />
            }
            className={styles.iconButtonDots}
            onClick={(): void => {}}
          />
          <TooltipClickable
            id={DataTooltipId.ARTICLE_ACTIONS_TOOLTIP}
            anchorSelect="button[name='more-actions']"
            className={getValidClassNames(
              styles.buttonsGroup,
              styles.dropdownModal,
              // isOpen && styles.open,
            )}
          >
            <PopoverButtonsGroup
              isOwnArticle={isOwnArticle}
              article={article}
            />
          </TooltipClickable>
        </div>
      </div>
      <div
        className={getValidClassNames(styles.body, coverUrl && styles.hasCover)}
      >
        <div className={styles.articleInfo}>
          <h4 className={styles.title}>{title}</h4>
          <article
            className={getValidClassNames(styles.text, 'text-overflow')}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
          ></article>
          <Tags tags={tags} />
        </div>
        {coverUrl && (
          <div className={styles.coverWrapper}>
            <img src={coverUrl} alt="article cover" className={styles.cover} />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <ul className={styles.reactions}>
          <li>
            <IconButton
              iconName="comment"
              className={styles.footerIcon}
              label={MOCKED_REACTIONS.comments}
            />
          </li>
          <li className={styles.footerIcon}>
            <Icon iconName="view" />
            <span>{MOCKED_REACTIONS.views}</span>
          </li>
          <li>
            <IconButton
              iconName="like"
              className={getValidClassNames(
                styles.footerIcon,
                isOwnArticle ? styles.disabled : styles.reaction,
                hasAlreadyReactedWith === Reaction.LIKE && styles.pressed,
              )}
              label={String(likesCount)}
              onClick={handleLikeReaction}
            />
          </li>
          <li>
            <IconButton
              iconName="dislike"
              className={getValidClassNames(
                styles.footerIcon,
                isOwnArticle ? styles.disabled : styles.reaction,
                hasAlreadyReactedWith === Reaction.DISLIKE && styles.pressed,
              )}
              label={String(dislikesCount)}
              onClick={handleDislikeReaction}
            />
          </li>
        </ul>

        <IconButton
          iconName="share"
          className={styles.iconWrapper}
          onClick={handleSharedButtonClick}
        />
        <ShareOnFacebookButton
          title={title}
          articleUrl={articleUrl}
          iconStyle={styles.facebookIconButton}
        />

        <Link
          to={articleRouteById as typeof AppRoute.ARTICLE}
          className={styles.readMore}
        >
          Read more
        </Link>
      </div>
    </article>
  );
};

export { ArticleCard };
