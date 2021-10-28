import { Table, Checkbox, Button } from 'antd';

const TodoList = () => {
  const columns = [
    {
      title: 'Title', dataIndex: 'title', key: 'title',
      sorter: (a, b) => a.title>b.title ? 1 : a.title<b.title ? -1 : 0
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
          onClick={() => console.log(id)}
        >
          Remove
        </Button>
      )
    },
  ];

  const dataSource = [
    { id: 1, title: 'Todo 1', completed: true, key: 'todo1' },
    { id: 2, title: 'Todo 2', completed: false, key: 'todo2' },
    { id: 3, title: 'Todo 3', completed: true, key: 'todo3' },
    { id: 4, title: 'Todo 4', completed: true, key: 'todo4' },
    { id: 5, title: 'Todo 5', completed: false, key: 'todo5' },
    { id: 6, title: 'Todo 6', completed: false, key: 'todo6' },
    { id: 7, title: 'Todo 7', completed: true, key: 'todo7' },
    { id: 8, title: 'Todo 8', completed: false, key: 'todo8' },
    { id: 9, title: 'Todo 9', completed: true, key: 'todo9' },
    { id: 10, title: 'Todo 10', completed: true, key: 'todo10' },
    { id: 11, title: 'Todo 11', completed: false, key: 'todo11' },
    { id: 12, title: 'Todo 12', completed: false, key: 'todo12' },
    { id: 13, title: 'Todo 13', completed: true, key: 'todo13' },
    { id: 14, title: 'Todo 14', completed: false, key: 'todo14' },
    { id: 15, title: 'Todo 15', completed: true, key: 'todo15' },
  ];

  const onChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  }

  return (
    <div>
      <h2>Todo list</h2>
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
    </div>
  );
};

export default TodoList;
