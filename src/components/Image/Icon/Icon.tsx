import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import * as Selection from '@/assets/icomoon/selection.json';

interface IconProps {
  imageName: string;
  width?: number;
  className?: string;
  href?: string;
  stopPropagation?: boolean;
  style?: {
    color?: string;
  };
}

const handleImageName = (iconName: string): string => {
  return Selection.icons?.some((icon) => {
    return icon.icon.tags.some((tag) => {
      return tag === iconName;
    });
  }) ? iconName : '';
};

export const Icon = ({
                       imageName,
                       width,
                       className,
                       href,
                       stopPropagation = false,
                       style,
                     }: IconProps) => {
  const router = useRouter();
  const optionStyle = {
    fontSize: width ? rem(width) : rem(30),
  }

  if (style) {
    Object.assign(optionStyle, style);
  }

  return (
    <i
      className={clsx(
        `icon-${handleImageName(imageName)}`,
        className
      )}
      style={optionStyle}
      onClick={(e) => {
        e.preventDefault();

        if (stopPropagation) {
          e.stopPropagation();
        }

        if (href) {
          router.push(href);
        }
      }}
    />
  );
};
