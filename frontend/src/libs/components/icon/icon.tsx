import { type IconName, iconNameToIcon } from './common.js';

type Properties = {
  iconName: IconName;
};

const Icon: React.FC<Properties> = ({ iconName }) => {
  const SvgIcon = iconNameToIcon[iconName];

  return <SvgIcon />;
};

export { Icon };
