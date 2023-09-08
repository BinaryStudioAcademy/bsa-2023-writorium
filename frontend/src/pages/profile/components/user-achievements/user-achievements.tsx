import { type FC } from 'react';

import { Button, Modal, Tooltip } from '~/libs/components/components.js';
import { DataTooltipId } from '~/libs/enums/enums.js';
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
  NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY,
  PROGRESS_MAX,
  PROGRESS_MIN,
} from '~/pages/profile/libs/constants/constants.js';
import { getRandomNumber } from '~/pages/profile/libs/helpers/helpers.js';
import { type UserAchievement } from '~/pages/profile/libs/types/user-achievement.js';
import { actions as achievementsActions } from '~/slices/achievements/achievements.js';

import { AchievementList } from '../components.js';
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
      .slice(-NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY)
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
    void dispatch(achievementsActions.fetchAll());
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
            hasToShowTooltip={true}
            achievements={achievementsList}
            className={styles.achievementListModal}
            classNameAchievement={styles.achievementItem}
          />
        </div>
      </Modal>
      <Tooltip
        id={DataTooltipId.ACHIEVEMENT_TOOLTIP}
        className={styles.achievementTooltip}
      />
    </div>
  );
};

export { UserAchievements };
