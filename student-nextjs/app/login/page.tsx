"use client";
import { Button, Form, Input, message, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import api from "@/lib/http";

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      router.push("/dashboard");
    }
  }, [router]);

  const onFinish = async (values: any) => {
    try {
      const user = await api.post("/login", {
        email: values.email,
        password: values.password,
      });

      message.success("Connexion réussie !");
      localStorage.setItem("currentUser", JSON.stringify(user.data));
      router.push("/dashboard");
    } catch (error: any) {
      console.log("HERE");
      message.error("Échec de la connexion");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 100 }}>
      <Title level={2}>Connexion</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mot de passe"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Se connecter
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" block onClick={() => router.push("/register")}>
            Pas de compte ? inscrivez vous 
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
