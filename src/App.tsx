import React from 'react';
import './assets/style/pages.scss'
import './assets/style/todo.scss'
import { Switch, Route } from 'react-router-dom';
import TodoHome from './pages/TodoHome';
import TodoUpdate from './pages/TodoUpdate';
import { TodoProvider } from './context/TodoConext';

function App() {
  return (
    <div className="content-wrapper">
      <div className="todo">
        <TodoProvider>
          <Switch>
            <Route
              path="/"
              render={() => <TodoHome />}
              exact
            />
            <Route
              path="/update/:itemId"
              render={() => <TodoUpdate />}
            />
            <Route path="/">Not found</Route>
          </Switch>
        </TodoProvider>
      </div>
    </div>
  );
}

export default App;
