import React from 'react';
import { Card, Typography, Button } from 'antd';
import { CameraOutlined, UnorderedListOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function Home() {
  return (
    <div className="App">
      <Card style={{ width: 300, margin: '0 auto' }}>
        <Title level={3}>THIẾT CHẨN LỤC KHÍ</Title>
        <Text type="secondary">Phiên bản số cấp</Text>
        <Text type="secondary">Tác giả: Bác sĩ Vũ Đức Đại</Text>

        {/* Chẩn đoán Card */}
        <Card hoverable style={{ marginTop: 16 }}>
          <Card.Meta
            title="Chẩn đoán"
            description="Chẩn đoán bằng ảnh"
            avatar={<CameraOutlined style={{ fontSize: 24 }} />}
          />
        </Card>

        {/* Bệnh nhân Card */}
        <Card hoverable style={{ marginTop: 16 }}>
          <Card.Meta
            title="Bệnh nhân"
            description="Danh sách bệnh nhân"
            avatar={<UnorderedListOutlined style={{ fontSize: 24 }} />}
          />
        </Card>

        {/* Thông tin Card */}
        <Card hoverable style={{ marginTop: 16 }}>
          <Card.Meta
            title="Thông tin"
            description="Xem thông tin hữu ích"
            avatar={<InfoCircleOutlined style={{ fontSize: 24 }} />}
          />
        </Card>

        <Button type="primary" block style={{ marginTop: 16 }}>
          Tiếp tục
        </Button>
      </Card>
    </div>
  );
}

export default Home;
