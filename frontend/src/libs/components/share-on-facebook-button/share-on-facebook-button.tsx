import { FacebookShareButton } from 'react-share';

import { Icon } from '../icon/icon.js';
import styles from './styles.module.scss';

type Properties = {
  title: string;
  articleUrl: string;
  iconStyle: string;
};

const ShareOnFacebookButton: React.FC<Properties> = ({
  title,
  articleUrl,
  iconStyle,
}) => {
  return (
    <FacebookShareButton
      quote={title}
      url={articleUrl}
      className={styles.button}
    >
      <Icon iconName="facebook" className={iconStyle} />
    </FacebookShareButton>
  );
};

export { ShareOnFacebookButton };
