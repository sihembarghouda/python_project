'use client';

import { Layout, Typography, Descriptions } from 'antd';
import HeaderMenu from '@/components/header'; // Adjust path if needed

const { Content } = Layout;
const { Title } = Typography;

// Dummy current user data
const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

export default function MonProfilPage() {
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
