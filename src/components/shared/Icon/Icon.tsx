import cn from 'classnames';
import { type LucideProps } from 'lucide-react';
import React, { lazy } from 'react';

// #region Types
type IconType =
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'ChevronDown'
  | 'Menu'
  | 'Home'
  | 'X'
  | 'MessageSquare'
  | 'SendHorizontal'
  | 'Plus'
  | 'Pencil';

interface Props {
  iconSlug: IconType;
  size?: 'big' | 'small' | 'medium';
  toIncludeBaseIconClass?: boolean;
  className?: string;
}

type LucideIcon = React.LazyExoticComponent<
  React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
>;
// #endregion

// #region Lazy imports
const icons: {
  [key: string]: LucideIcon;
} = {
  ChevronLeft: lazy(() =>
    import('lucide-react').then((module) => ({
      default: module.ChevronLeftIcon,
    })),
  ),
  ChevronRight: lazy(() =>
    import('lucide-react').then((module) => ({
      default: module.ChevronRightIcon,
    })),
  ),
  ChevronUp: lazy(() =>
    import('lucide-react').then((module) => ({
      default: module.ChevronUpIcon,
    })),
  ),
  ChevronDown: lazy(() =>
    import('lucide-react').then((module) => ({ default: module.ChevronDown })),
  ),
  Menu: lazy(() =>
    import('lucide-react').then((module) => ({ default: module.Menu })),
  ),
  Home: lazy(() =>
    import('lucide-react').then((module) => ({ default: module.Home })),
  ),
  X: lazy(() =>
    import('lucide-react').then((module) => ({ default: module.X })),
  ),
  MessageSquare: lazy(() =>
    import('lucide-react').then((module) => ({
      default: module.MessageSquare,
    })),
  ),
  SendHorizontal: lazy(() =>
    import('lucide-react').then((module) => ({
      default: module.SendHorizonal,
    })),
  ),
  Plus: lazy(() =>
    import('lucide-react').then((module) => ({
      default: module.Plus,
    })),
  ),
  Pencil: lazy(() =>
    import('lucide-react').then((module) => ({
      default: module.Pencil,
    })),
  ),
};
// #endregion

export const Icon: React.FC<Props> = ({
  iconSlug,
  size = 'small',
  toIncludeBaseIconClass = true,
  className = '',
}) => {
  const I = icons[iconSlug];

  if (!I) {
    return false;
  }

  return (
    <I
      className={cn(className, {
        icon: toIncludeBaseIconClass,
        'icon--big': size === 'big',
        'icon--medium': size === 'medium',
        'icon--small': size === 'small',
      })}
    ></I>
  );
};
