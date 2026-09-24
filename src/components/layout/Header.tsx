interface MenuItem {
  href: string;
  label: string;
}

interface HeaderProps {
  /** The home page renders its menu on top of the carousel. */
  variant?: 'home';
  /** The main menu link of the current page, marked with aria-current. */
  current?: string;
  /** Optional second-level menu with in-page anchors (portfolio sections). */
  secondaryItems?: MenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  { href: '/', label: 'Home' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

interface MenuProps {
  items: MenuItem[];
  className?: string;
  current?: string;
}

function Menu({ items, className, current }: MenuProps) {
  return (
    <menu className={className}>
      {items.map((item) => (
        <li className="item" key={item.href}>
          <a href={item.href} aria-current={item.href === current ? 'page' : undefined}>{item.label}</a>
        </li>
      ))}
    </menu>
  );
}

export default function Header({ variant, current, secondaryItems }: HeaderProps) {
  return (
    <header>
      <Menu items={MENU_ITEMS} className={variant === 'home' ? 'home' : undefined} current={current} />
      {secondaryItems && <Menu items={secondaryItems} className="secondary" />}
    </header>
  );
}
