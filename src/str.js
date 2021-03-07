[
    {
      key: 'common', status: 'unchanched', children: [
        { key: 'setting1', status: 'unchanched', value: 'Value 1' },
        { key: 'setting2', status: 'deleted', value: '200' },
        { key: 'setting3', status: 'changed', value: null, oldValue: true },
        {
          key: 'setting6', status: 'unchanged', children: [{ key: 'key', status: 'unchanged', value: 'value' },
          {
            key: 'doge', status: 'unchanged', children: [{ key: 'wow', status: 'changed', value: 'so much', oldValue: '' },
            { key: 'ops', status: 'new', value: 'vops' }]
          }]
        },
        { key: 'follow', status: 'new', value: false },
        { key: 'setting4', status: 'new', value: 'blah blah' },
        { key: 'setting5', status: 'new', children: [{ key: 'key5', value: 'value5' }] }]
    }
]
