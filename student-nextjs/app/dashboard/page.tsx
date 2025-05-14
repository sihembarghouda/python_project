'use client';

import { Layout, Typography, Table, message } from 'antd';
import HeaderMenu from '@/components/header'; // adjust path if your structure is different
import { useEffect, useState } from 'react';
import api from '@/lib/http';

const { Content } = Layout;
const { Title } = Typography;

// Dummy data for enrolled courses
let followedCourses: any[] = [];

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
    // State to hold courses data and loading state
  const [courses, setCourses] = useState<Cours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    useEffect(() => {
    api
      .get("/cours-etudiant/" + currentUser.id)
      .then((res: any) => {followedCourses = res.data; console.log(followedCourses);})
      .catch(() => message.error("Échec de récupération des formations"));
  }, []);

   // Fetch courses data when the component mounts
  useEffect(() => {
    // Async function to fetch courses
    const fetchCourses = async () => {
      try {
      const response = await api.get("/cours-etudiant/" + currentUser.id);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCourses();
  }, []);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderMenu active="dashboard" />
      <Content style={{ padding: '50px' }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, maxWidth: 800, margin: '0 auto' }}>
          <Title level={2}>Mes Formations</Title>
          <Table rowKey="id" columns={columns} dataSource={followedCourses}  pagination={false} />
        </div>
      </Content>
    </Layout>
  );
}
