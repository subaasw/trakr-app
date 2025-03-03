import { Link, useNavigate } from '@remix-run/react';
import { Briefcase, Coins, File, GearSix, HandCoins, House, Rabbit } from '@phosphor-icons/react';
import UserMetadataProps from '~/types/userMetadata';

interface ProfileProps {
  fullName: string;
  email: string;
  imageURL: string;
}

const menus = [
  {
    icon: House,
    label: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: Coins,
    label: 'Expenses',
    link: '/create-expenses',
  },
  {
    icon: HandCoins,
    label: 'Records',
    link: '/records',
  },
  {
    icon: File,
    label: 'Reports',
    link: '/reports',
  },
];

const Profile = ({ fullName, email, imageURL }: ProfileProps) => {
  return (
    <div className="flex w-full items-center justify-start gap-x-2 rounded-lg px-2 py-5 hover:bg-white">
      <img referrerPolicy="no-referrer" className="size-8 rounded-full" src={imageURL} alt={fullName} />
      <div className="w-[85%]">
        <strong className="block text-sm font-semibold">{fullName}</strong>
        <p className="truncate text-xs">{email}</p>
      </div>
    </div>
  );
};

const SidebarLayout = ({ full_name, email, avatar_url }: UserMetadataProps) => {
  return (
    <aside className="sticky left-0 top-0 flex h-screen w-72 max-w-72 flex-col border border-frost-200 px-5 py-4">
      <div className="pointer-events-none mb-4 flex select-none items-center gap-x-1 px-4">
        <Rabbit weight="duotone" size={34} />
        <span className="text-3xl font-bold leading-loose">Trakr.</span>
      </div>
      <hr className="mb-1.5 border-gray" />
      <nav>
        {menus.map((menu) => (
          <Link
            to={menu.link}
            className="flex items-center gap-x-2 rounded-lg px-4 py-3 hover:bg-[#fff]"
            key={'Menu-Item-' + menu.label}
          >
            <menu.icon size={24} />
            {menu.label}
          </Link>
        ))}
      </nav>

      <nav className="mt-auto block">
        <div className="flex items-center gap-x-2 rounded-lg px-4 py-3 hover:bg-[#fff]">
          <GearSix size={24} />
          Settings
        </div>
        <div className="flex items-center gap-x-2 rounded-lg px-4 py-3 hover:bg-[#fff]">
          <Briefcase size={24} />
          Workspace
        </div>
      </nav>
      <hr className="my-1.5 border-t border-gray" />
      <Profile fullName={full_name} email={email} imageURL={avatar_url} />
    </aside>
  );
};

export default SidebarLayout;
