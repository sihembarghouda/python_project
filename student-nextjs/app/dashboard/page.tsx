'use client';

import { Layout, Typography, Table, message } from 'antd';
import HeaderMenu from '@/components/header';
import { useEffect, useState } from 'react';
import api from '@/lib/http';

const { Content } = Layout;
const { Title } = Typography;

interface Cours {
  id: number;
  nom: string;
}

const columns = [
  {
    title: 'ID Formation',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nom Formation',
    dataIndex: 'nom',
    key: 'nom',
  },
];

export default function DashboardPage() {
  const [courses, setCourses] = useState<Cours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);

  // Récupérer l'utilisateur depuis localStorage après le rendu
  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserId(user.id);
    }
  }, []);

  // Charger les cours une fois qu’on a l’ID de l’utilisateur
  useEffect(() => {
    if (userId === null) return;

    const fetchCourses = async () => {
      try {
        const response = await api.get("/cours-etudiant/" + userId);
        setCourses(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des formations :", error);
        message.error("Échec de récupération des formations");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderMenu active="dashboard" />
      <Content style={{ padding: '50px' }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, maxWidth: 800, margin: '0 auto' }}>
          <Title level={2}>Mes Formations</Title>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={courses}
            loading={loading}
            pagination={false}
          />
        </div>
      </Content>
    </Layout>
  );
}
