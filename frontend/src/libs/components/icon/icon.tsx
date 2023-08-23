import { type IconName, iconNameToIcon } from './common.js';

type Properties = {
  iconName: IconName;
  className?: string;
};

const Icon: React.FC<Properties> = ({ iconName, className }) => {
  const SvgIcon = iconNameToIcon[iconName];

  return <SvgIcon className={className} />;
};

export { Icon };
