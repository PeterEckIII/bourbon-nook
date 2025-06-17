import { Outlet } from 'react-router';
import Navbar from '~/components/UI/Navbar';

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
