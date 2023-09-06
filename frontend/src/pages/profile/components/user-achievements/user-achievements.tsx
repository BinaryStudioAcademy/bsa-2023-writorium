import { type FC } from 'react';

import { Button, Modal } from '~/libs/components/components.js';
import {
  getShuffledArray,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  useModal,
} from '~/libs/hooks/hooks.js';
import {
  PROGRESS_MAX,
  PROGRESS_MIN,
} from '~/pages/profile/libs/constants/constants.js';
import { getRandomNumber } from '~/pages/profile/libs/helpers/helpers.js';
import { type UserAchievement } from '~/pages/profile/libs/types/user-achievement.js';
import { actions as achievementsActions } from '~/slices/achievements/achievements.js';

import { AchievementList, AchievementTooltip } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
};

const UserAchievements: FC<Properties> = ({ className }) => {
  const { handleToggleModalOpen, isOpen } = useModal();
  const dispatch = useAppDispatch();
  const { achievements } = useAppSelector(({ achievements }) => achievements);

  const mockUserAchievements: UserAchievement[] = useMemo(() => {
    return getShuffledArray(achievements)
      .slice(-3)
      .map((achievement) => ({
        ...achievement,
        progress: getRandomNumber({ min: PROGRESS_MIN, max: PROGRESS_MAX }),
      }));
  }, [achievements]);

  const achievementsList: UserAchievement[] = useMemo(() => {
    return achievements
      .map((achievement) => {
        const userAchievement = mockUserAchievements.find(
          ({ id }) => achievement.id === id,
        );

        return userAchievement ?? { ...achievement, progress: PROGRESS_MIN };
      })
      .sort((a, b) => b.progress - a.progress);
  }, [achievements, mockUserAchievements]);

  useEffect(() => {
    void dispatch(achievementsActions.getAll());
  }, [dispatch]);

  return (
    <div className={getValidClassNames(className, styles.achievementBlock)}>
      <h3 className={styles.title}>Achievements</h3>
      <AchievementList
        achievements={mockUserAchievements}
        className={styles.achievementList}
      />
      <Button
        label="Show all"
        className={styles.buttonShow}
        onClick={handleToggleModalOpen}
      />
      <Modal isOpen={isOpen} onClose={handleToggleModalOpen}>
        <div>
          <h3 className={styles.title}>Achievements</h3>
          <AchievementList
            showTooltip={true}
            achievements={achievementsList}
            className={styles.achievementListModal}
            classNameAchievement={styles.achievementItem}
          />
        </div>
      </Modal>
      <AchievementTooltip />
    </div>
  );
};

export { UserAchievements };
