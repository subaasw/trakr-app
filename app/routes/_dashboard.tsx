import UserMetadataProps from '~/types/userMetadata';
import SidebarLayout from '~/components/SidebarLayout';

interface dashboardProps {
  user: UserMetadataProps;
}

export default function Dashboard({ user }: dashboardProps) {
 
  return (
    <div className="flex">
      <SidebarLayout full_name={user.full_name} email={user.email} avatar_url={user.avatar_url} />
      <div className="h-[400vh] w-full bg-[#fff] px-8 py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          {/* <ExpensesTable /> */}
          
          {/* <Pagination totalPages={4} currentPage={1} onPageChange={() => {}} /> */}
        </header>
      </div>
    </div>
  );
}
