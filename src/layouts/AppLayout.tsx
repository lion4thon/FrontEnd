// AppLayout.tsx
import { Outlet } from "react-router-dom";
import ModalProvider from "../components/Modal/ModalProvider";
import Header from "../components/Header/Header";

export default function AppLayout() {
  return (
    <ModalProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </ModalProvider>
  );
}
