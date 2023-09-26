import { type FC } from 'react';

import { IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { Popover } from '../popover/popover.js';
import { ShareGroup } from './share-group.js';
import styles from './styles.module.scss';

type Properties = {
  articleId: string;
  articleTitle: string;
  className?: string;
  classNameContentWrapper?: string;
  classNameIconButton?: string;
  classNameIcon?: string;
};

const SharePopover: FC<Properties> = ({
  articleId,
  articleTitle,
  className,
  classNameContentWrapper,
  classNameIcon,
  classNameIconButton,
}) => {
  return (
    <Popover
      content={<ShareGroup articleId={articleId} articleTitle={articleTitle} />}
      classNameContentWrapper={getValidClassNames(
        styles.popover,
        classNameContentWrapper,
      )}
      className={className}
    >
      <IconButton
        iconName="share"
        className={classNameIconButton}
        iconClassName={classNameIcon}
      />
    </Popover>
  );
};

export { SharePopover };
