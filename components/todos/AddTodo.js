import styles from '../../styles/AddTodo.module.less';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/todoSlice';

const AddTodo = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = ({ text }) => {
    dispatch(addTodo({ text }));
    form.resetFields();
    message.info('Task was successfully added!');
  };

  const onFinishFailed = (e) => message.error(
    e.errorFields[0].errors[0]
  );

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      style={{ marginTop: 20 }}
      form={form}
      name="add-todo"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Text"
        name="text"
        rules={[
          {
            required: true,
            message: 'Please enter the task!'
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 18,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={onReset} className={styles.reset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddTodo;
