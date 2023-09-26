import { FacebookShareButton } from 'react-share';

import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { Icon } from '../icon/icon.js';
import styles from './styles.module.scss';

type Properties = {
  title: string;
  articleUrl: string;
  iconStyle?: string;
  className?: string;
  classNameContent?: string;
  label?: string;
};

const ShareOnFacebookButton: React.FC<Properties> = ({
  title,
  articleUrl,
  className,
  classNameContent,
  iconStyle,
  label,
}) => {
  return (
    <FacebookShareButton
      quote={title}
      url={articleUrl}
      className={getValidClassNames(styles.button, className)}
    >
      <div className={classNameContent}>
        <Icon iconName="facebook" className={iconStyle} />
        {label && <span>{label}</span>}
      </div>
    </FacebookShareButton>
  );
};

export { ShareOnFacebookButton };
