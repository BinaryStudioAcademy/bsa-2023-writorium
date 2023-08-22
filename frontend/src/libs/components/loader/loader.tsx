import { DefaultLoaderColor } from './enum/default-color.enum.js';
import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  color?: string;
  isLoading: boolean;
};

const Loader: React.FC<Properties> = ({
  children,
  color = DefaultLoaderColor.BORDER,
  isLoading,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.loader}
        style={{
          borderColor: color,
          borderTopColor: DefaultLoaderColor.BORDER_TOP,
        }}
      ></div>
    </div>
  );
};

export { Loader };
