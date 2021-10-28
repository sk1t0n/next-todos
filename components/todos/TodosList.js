import { Table, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';

const TodoList = ({ todos, onRemoveTodo }) => {
  const columns = [
    {
      title: 'Text', dataIndex: 'text', key: 'text',
      sorter: (a, b) => a.text>b.text ? 1 : a.text<b.text ? -1 : 0
    },
    {
      title: 'Completed', dataIndex: 'completed', key: 'completed',
      render: (completed) => (
        <Checkbox
          style={{display: 'flex', justifyContent: 'center'}}
          defaultChecked={completed}
          onChange={(e) => console.log(e.target.checked)}
        />
      ),
      filters: [
        { text: 'Completed', value: true }
      ],
      onFilter: (value, item) => item.completed === value,
      sorter: (a, b) => a.completed>b.completed ? 1 : a.completed<b.completed ? -1 : 0
    },
    {
      title: 'Action', dataIndex: 'id', key: 'id',
      render: (id) => (
        <Button
          type="primary"
          danger
          block
          onClick={() => onRemoveTodo(id)}
        >
          Remove
        </Button>
      )
    },
  ];

  const dataSource = todos.map(todo => ({
    ...todo,
    key: String(todo['id'])
  }));

  const onChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  }

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onChange={onChange}
      pagination={{
        defaultPageSize: '5',
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 15, 20]
      }}
    />
  );
};

TodoList.propTypes = {
  onRemoveTodo: PropTypes.func.isRequired
};

export default TodoList;
