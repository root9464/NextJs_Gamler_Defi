import * as TrickIcons from '@assets/svg/acceptence-tricks';
import { atom, useAtom } from 'jotai';

export const TRICK_ICONS = [
  'BagIcon',
  'BowIcon',
  'CandeyIcon',
  'CatIcon',
  'CherryIcon',
  'ClipIcon',
  'CloudMoonIcon',
  'CloverIcon',
  'CrownIcon',
  'DiamondIcon',
  'DressIcon',
  'EarringsIcon',
  'FlowerIcon',
  'HairIcon',
  'HeartIcon',
  'LipsIcon',
  'LipstickIcon',
  'MagnetIcon',
  'NecklaceIcon',
  'PerfumeIcon',
  'PuzzleIcon',
  'RocketIcon',
  'SnowflakeIcon',
  'StarIcon',
  'StrawberryIcon',
  'TeddyBearIcon',
] as const;

type TrickIconName = (typeof TRICK_ICONS)[number];

const selectedTrickIconAtom = atom<TrickIconName>(TRICK_ICONS[0]);

const useTrickIcons = () => {
  const [selectedIcon, setSelectedIcon] = useAtom(selectedTrickIconAtom);

  const iconsMap = TRICK_ICONS.reduce(
    (acc, iconName) => {
      acc[iconName] = TrickIcons[iconName];
      return acc;
    },
    {} as Record<TrickIconName, React.ComponentType<React.SVGProps<SVGSVGElement>>>,
  );

  const SelectedIcon = iconsMap[selectedIcon];

  const selectRandomIcon = () => {
    const currentIndex = TRICK_ICONS.indexOf(selectedIcon);
    let nextIndex = Math.floor(Math.random() * TRICK_ICONS.length);

    if (TRICK_ICONS.length > 1 && nextIndex === currentIndex) {
      nextIndex = (nextIndex + 1) % TRICK_ICONS.length;
    }

    setSelectedIcon(TRICK_ICONS[nextIndex]);
  };

  const selectIconByName = (iconName: TrickIconName) => {
    setSelectedIcon(iconName);
  };

  return {
    icon: selectedIcon,
    component: SelectedIcon,
    selectRandomIcon,
    selectIconByName,
    allIcons: TRICK_ICONS,
    iconsMap,
  };
};

export { selectedTrickIconAtom, useTrickIcons };
