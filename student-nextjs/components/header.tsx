'use client';

import { Menu, Layout, notification } from 'antd';
import { FileAddOutlined, UserOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

interface HeaderMenuProps {
  active: 'dashboard' | 'inscription' | 'profil';
}

const HeaderMenu = ({ active }: HeaderMenuProps) => {
  const router = useRouter();

  const handleClick = (e: any) => {
    switch (e.key) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'inscription':
        router.push('/inscription-cours');
        break;
      case 'profil':
        router.push('/mon-profil');
        break;
      case 'logout':
        localStorage.removeItem('currentUser');
        notification.success({
          message: 'Déconnexion réussie',
          description: 'Vous avez été déconnecté avec succès.',
        });
        router.push('/login');
        break;
    }
  };

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={handleClick}
        selectedKeys={[active]}
      >
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="profil" icon={<UserOutlined />}>
          Mon Profil
        </Menu.Item>
        <Menu.Item key="inscription" icon={<FileAddOutlined />}>
          Inscription Cours
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderMenu;
