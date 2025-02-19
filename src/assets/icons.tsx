import Svg, {Path} from 'react-native-svg';

type IconType = {
  color?: string;
  secondaryColor?: string;
  size?: number;
};
export const ClearIcon: React.FC<IconType> = ({
  color = '#3e4054',
  size = 24,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.3 5.71069C18.1131 5.52344 17.8595 5.4182 17.595 5.4182C17.3305 5.4182 17.0768 5.52344 16.89 5.71069L12 10.5907L7.10997 5.70069C6.92314 5.51344 6.66949 5.4082 6.40497 5.4082C6.14045 5.4082 5.8868 5.51344 5.69997 5.70069C5.30997 6.09069 5.30997 6.72069 5.69997 7.11069L10.59 12.0007L5.69997 16.8907C5.30997 17.2807 5.30997 17.9107 5.69997 18.3007C6.08997 18.6907 6.71997 18.6907 7.10997 18.3007L12 13.4107L16.89 18.3007C17.28 18.6907 17.91 18.6907 18.3 18.3007C18.69 17.9107 18.69 17.2807 18.3 16.8907L13.41 12.0007L18.3 7.11069C18.68 6.73069 18.68 6.09069 18.3 5.71069Z"
        fill={color}
      />
    </Svg>
  );
};
