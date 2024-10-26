import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';

const items = [
  {
    title: '',
    url: '#',
  },
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent></SidebarContent>
    </Sidebar>
  );
}
