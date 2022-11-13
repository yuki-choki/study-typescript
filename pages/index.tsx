import { ChangeEventHandler, useState } from "react"

type Todo = { id: number, label: string, is_done: boolean}[]

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo>([]);

  const toggle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if (todo.id === Number(e.target.value)) {
          return {
            ...todo,
            is_done: !todo.is_done
          }
        }
        return todo;
      })
    })
  }

  const input: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  }

  const add = () => {
    setTodos((prevTodos) => {
      return ([
        ...prevTodos,
        {
          id: Math.random(),
          label: text,
          is_done: false,
        },
      ])
    });
    setText("");
  }

  return (
    <div className="w-96 mx-auto p-20">
      <h1 className="text-xl font-bold">
        Todo
      </h1>
      <div className="flex gap-x-2">
        <input type="text" value={text} onChange={input} className="border border-black" />
        <button className="border border-black flex-shrink-0 px-2" onClick={add}>追加</button>
      </div>
      <ul className="mt-4 space-y-2">
        {todos.map(({ id, label, is_done }) => (
          <li key={id}>
            <label className="flex items-center gap-x-2">
              <input type="checkbox" value={id} checked={is_done} onChange={toggle}/>
              <span>
                {label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
