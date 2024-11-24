import React, { useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

const ProductEdit = (selectedProduct) => {
    const [form] = Form.useForm();

    // Khi selectedProduct thay đổi, cập nhật form
   /* useEffect(() => {
        if (selectedProduct) {
            form.setFieldsValue({
                productName: selectedProduct.name,
                price: selectedProduct.price,
                category: selectedProduct.category,
                // Thêm các trường khác nếu cần
            });
        }
    }, [selectedProduct, form]);*/

    const handleSubmit = async (values) => {
        console.log('Form values:', values);
        // Gọi API để sửa sản phẩm
        /*
        try {
            const response = await axios.put(`/api/products/${selectedProduct.id}`, values);
            message.success('Sửa sản phẩm thành công');
            setShowSua(false); // Đóng modal sau khi sửa thành công
        } catch (error) {
            message.error('Có lỗi xảy ra khi sửa sản phẩm');
        }
        */
    };

    return (
        <Form
            form={form}
            layout="vertical"
           
        >
            <Form.Item
                label="Tên sản phẩm"
                name="productName"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Giá sản phẩm"
                name="price"
                rules={[
                    { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                    { type: 'number', min: 0, message: 'Giá phải lớn hơn 0!' }
                ]}
            >
                <Input type="number" min={0} />
            </Form.Item>

            <Form.Item
                label="Danh mục sản phẩm"
                name="category"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
                <Select placeholder="Chọn danh mục">
                    <Option value="Category A">Category A</Option>
                    <Option value="Category B">Category B</Option>
                    {/* Thêm các danh mục khác nếu cần */}
                </Select>
            </Form.Item>

            <Form.Item>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <Button onClick={() => { form.resetFields()}}>
                        Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={()=>handleSubmit}>
                        Lưu
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default ProductEdit;