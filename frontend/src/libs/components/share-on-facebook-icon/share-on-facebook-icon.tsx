import { FacebookIcon, FacebookShareButton } from 'react-share';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  articleUrl: string;
  bgColor: string;
  size: string;
  iconColor: string;
};

const ShareOnFacebookButton: React.FC<Properties> = ({
  title,
  size,
  // articleUrl,
  bgColor,
  iconColor,
}) => {
  return (
    <FacebookShareButton
      quote={title}
      url="https://www.youtube.com/watch?v=kiSJGGy29fY&ab_channel=CMPG323-ITDevelopments"
      className={styles.button}
    >
      <FacebookIcon
        size={size}
        round={true}
        bgStyle={{ fill: bgColor }}
        iconFillColor={iconColor}
      ></FacebookIcon>
    </FacebookShareButton>
  );
};

export { ShareOnFacebookButton };
