"use client";

import api from "@/lib/http";
import { Layout, Typography, Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;

export default function RegisterPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  if (localStorage.getItem("currentUser")) {
    router.push("/dashboard");
  }

  const onFinish = async (values: any) => {
    try {
      const res = await api.post("/register", values);

      message.success("Inscription réussie !");
      router.push("/login");
    } catch (error: any) {
      message.error("Échec de la connexion");
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 24,
            width: 500,
            borderRadius: 8,
          }}
        >
          <Title level={2}>Inscription</Title>
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
              name="id"
              label="ID"
              rules={[
                { required: true, message: "Veuillez entrer votre ID" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nom"
              label="Nom"
              rules={[{ required: true, message: "Veuillez entrer votre nom" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="prenom"
              label="Prénom"
              rules={[
                { required: true, message: "Veuillez entrer votre prénom" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Veuillez entrer votre email" },
                { type: "email", message: "Email invalide" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="telephone"
              label="Téléphone"
              rules={[
                { required: true, message: "Veuillez entrer votre téléphone" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mot de passe"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre mot de passe",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirmer le mot de passe"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Veuillez confirmer votre mot de passe",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Les mots de passe ne correspondent pas")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                S'inscrire
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="default" block onClick={handleLoginClick}>
                Se connecter
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}
