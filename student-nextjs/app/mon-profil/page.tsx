'use client';

import { Layout, Typography, Descriptions, Spin } from 'antd';
import HeaderMenu from '@/components/header';
import { useEffect, useState } from 'react';

const { Content } = Layout;
const { Title } = Typography;

export default function MonProfilPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);
  }, []);

  if (!currentUser) {
    // Affiche un loader ou un fallback si l'utilisateur n'est pas encore chargé
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <HeaderMenu active="profil" />
        <Content style={{ padding: '50px' }}>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Spin size="large" />
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderMenu active="profil" />
      <Content style={{ padding: '50px' }}>
        <div
          style={{
            background: '#fff',
            padding: 24,
            maxWidth: 600,
            margin: '0 auto',
            borderRadius: 8,
          }}
        >
          <Title level={2}>Mon Profil</Title>

          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{currentUser.id}</Descriptions.Item>
            <Descriptions.Item label="Nom">{currentUser.nom}</Descriptions.Item>
            <Descriptions.Item label="Prénom">{currentUser.prenom}</Descriptions.Item>
            <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
            <Descriptions.Item label="Téléphone">{currentUser.telephone}</Descriptions.Item>
          </Descriptions>
        </div>
      </Content>
    </Layout>
  );
}
