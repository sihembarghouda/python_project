"use client";
import { useEffect, useState } from "react";
import { Table, Typography, Spin, Layout } from "antd";
import HeaderMenu from "@/components/header";

const { Title } = Typography;
const { Content } = Layout;

interface Book {
  id: number;
  title: string;
  price: number;
  availability: string;
  category: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/books") // Update this if your API is hosted elsewhere
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price (£)",
      dataIndex: "price",
      key: "price",
      render: (text: number) => `£${text.toFixed(2)}`,
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderMenu active="books" />
      <Content style={{ padding: "50px" }}>
        <div style={{ padding: "2rem" }}>
          <Title level={2}>Liste des livres</Title>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table
              dataSource={books}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              bordered
            />
          )}
        </div>
      </Content>
    </Layout>
  );
}
