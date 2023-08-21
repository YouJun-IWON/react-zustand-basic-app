import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

let todoStore = (set) => ({
  todos: [],
  addTodo: (todoText) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          text: todoText,
          id: getId(),
          isComplete: false,
        },
      ],
    })),
  deleteTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    })),

  completeTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            isCompleted: true,
          };
        }
        return todo;
      }),
    })),
});

todoStore = devtools(todoStore);
todoStore = persist(todoStore, {
  name: 'todo',
  storage: createJSONStorage(() => sessionStorage),
});

export const useTodoStore = create(todoStore);

// export const useTodoStore = create(
//   persist(
//     (set) => ({
//       todos: [],
//       addTodo: (todoText) =>
//         set((state) => ({
//           todos: [
//             ...state.todos,
//             {
//               text: todoText,
//               id: getId(),
//               isComplete: false,
//             },
//           ],
//         })),
//       deleteTodo: (todoId) =>
//         set((state) => ({
//           todos: state.todos.filter((todo) => todo.id !== todoId),
//         })),

//       completeTodo: (todoId) =>
//         set((state) => ({
//           todos: state.todos.map((todo) => {
//             if (todo.id === todoId) {
//               return {
//                 ...todo,
//                 isCompleted: true,
//               };
//             }
//             return todo;
//           }),
//         })),
//     }),
//     {
//       name: 'wow-storage', // name of the item in the storage (must be unique)
//       getStorage: () => sessionStorage

//       // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     }
//   )
// );

let id = 0;
function getId() {
  return id++;
}
