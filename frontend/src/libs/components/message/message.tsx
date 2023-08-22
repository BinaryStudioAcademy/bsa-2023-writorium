import { getValidClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
  children: React.ReactNode;
  className?: string | undefined;
};

const Message: React.FC<Properties> = ({ children, className }) => (
  <div className={getValidClassNames(className)}>{children}</div>
);

export { Message };

