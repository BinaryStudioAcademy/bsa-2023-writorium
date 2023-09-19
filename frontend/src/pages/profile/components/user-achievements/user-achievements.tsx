import { type FC } from 'react';

import {
  Button,
  Loader,
  Modal,
  Tooltip,
} from '~/libs/components/components.js';
import { DataStatus, DataTooltipId } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  useModal,
} from '~/libs/hooks/hooks.js';
import { type AchievementWithProgressResponseDto } from '~/packages/achievements/achievements.js';
import { NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY } from '~/pages/profile/libs/constants/constants.js';
import { actions as achievementsActions } from '~/slices/achievements/achievements.js';

import { AchievementList } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
};

const UserAchievements: FC<Properties> = ({ className }) => {
  const { handleToggleModalOpen, isOpen } = useModal();
  const dispatch = useAppDispatch();
  const { ownAchievements, ownAchievementsDataStatus } = useAppSelector(
    ({ achievements }) => achievements,
  );

  useEffect(() => {
    void dispatch(achievementsActions.fetchOwnWithProgress());
  }, [dispatch]);

  const achievementsList: AchievementWithProgressResponseDto[] = useMemo(() => {
    return [...ownAchievements].sort((a, b) => b.progress - a.progress);
  }, [ownAchievements]);

  const isLoading = ownAchievementsDataStatus === DataStatus.PENDING;

  return (
    <div className={getValidClassNames(className, styles.achievementBlock)}>
      <h3 className={styles.title}>Achievements</h3>
      <Loader isLoading={isLoading} type="dots">
        <AchievementList
          achievements={achievementsList.slice(
            0,
            NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY,
          )}
          className={styles.achievementList}
        />
        <Button
          label="Show all"
          className={styles.buttonShow}
          onClick={handleToggleModalOpen}
        />
        <Modal
          isOpen={isOpen}
          onClose={handleToggleModalOpen}
          className={styles.modal}
        >
          <div>
            <h2 className={styles.title}>Achievements</h2>
            <AchievementList
              hasToShowTooltip={true}
              achievements={achievementsList}
              className={styles.achievementListModal}
              classNameAchievement={styles.achievementItem}
            />
          </div>
        </Modal>
      </Loader>
      <Tooltip
        id={DataTooltipId.ACHIEVEMENT_TOOLTIP}
        className={styles.achievementTooltip}
      />
    </div>
  );
};

export { UserAchievements };
