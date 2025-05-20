"use client";

import { Menu, Layout, notification } from "antd";
import {
  FileAddOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { MenuProps } from "antd";

const { Header } = Layout;

interface HeaderMenuProps {
  active: "dashboard" | "inscription" | "books" | "profil" ;
}

const HeaderMenu = ({ active }: HeaderMenuProps) => {
  const router = useRouter();

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "dashboard":
        router.push("/dashboard");
        break;
      case "inscription":
        router.push("/inscription-cours");
        break;
      case "books":
        router.push("/books");
        break;
      case "profil":
        router.push("/mon-profil");
        break;
      case "logout":
        localStorage.removeItem("currentUser");
        notification.success({
          message: "Déconnexion réussie",
          description: "Vous avez été déconnecté avec succès.",
        });
        router.push("/login");
        break;
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "profil",
      icon: <UserOutlined />,
      label: "Mon Profil",
    },
    {
      key: "inscription",
      icon: <FileAddOutlined />,
      label: "Inscription Cours",
    },
    {
      key: "books",
      icon: <BookOutlined />,
      label: "Livres",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={handleClick}
        selectedKeys={[active]}
        items={menuItems}
      />
    </Header>
  );
};

export default HeaderMenu;
