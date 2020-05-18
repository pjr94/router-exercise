import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';

const PostsAPI = {
  posts: [
    {
      id: 0,
      title: "hello world",
      content: "well hello there"
    },
    {
      id: 1,
      title: "Router",
      content: "I'm learning about React Routers"
    },
    {
      id: 2,
      title: "About",
      content: "This is a test project"
    }
  ],
  all: function () { return this.posts },
  get: function (num) {
    const isPost = p => p.id === num
    return this.posts.find(isPost)
  }

}

function Header() {
  return (
    <header>
      <nav>
        <ul className="header">
          <li className="header-item"><Link to='/'>Home</Link></li>
          <li className="header-item"><Link to='/posts'>Journel</Link></li>
          <li className="header-item"><Link to='/plan'>Plan</Link></li>
        </ul>
      </nav>
    </header>
  )
}

function Plan() {
  return (
    <div className="centered-list width-300">
      <h2>Plan</h2>

      <div className="align-left">
        <ul>
          <li>Create-Read-Update-Delete application</li>
          <li>Hacker-News clone</li>
          <li>Webpack</li>
          <li>Server Rendering
          <ul>
              <li>React Server Rendering</li>
              <li>React Server Rendering</li>
            </ul>
          </li>
          <li>MobX
          <ul>
              <li>Redux?</li>
            </ul></li>
        </ul>
      </div>

      <Link to={`/`}>Back</Link>
    </div>
  )
}

function FullPosts() {
  return (
    <div>
      <ul className="centered-list width-80">
        {
          PostsAPI.all().map(p => (
            <li className="align-left" key={p.number}>
              <Link to={`/posts/${p.id}`}>{p.title}</Link>
            </li>
          ))
        }
      </ul>
      <Link to={`/`}>Back</Link>
    </div>
  )
}

function Post(props) {
  const post = PostsAPI.get(
    parseInt(props.match.params.number, 10)
  );

  if (!post) {
    return <div>Sorry Post was not found</div>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to={`/posts`}>Back</Link>
    </div>
  )
}

function Posts() {
  return (
    <div>
      <h2>Journel</h2>
      <Switch>
        <Route exact path='/posts' component={FullPosts} />
        <Route path='/posts/:number' component={Post} />
      </Switch>

    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Hello and welcome to my Router Test Project</h1>
      <p>Click the above links to explore the various pages</p>
      <p>Keep an eye on the URL as you do</p>
    </div>
  );
}

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/posts' component={Posts} />
        <Route path='/plan' component={Plan} />
      </Switch>
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <Header />

      <Main />
    </div>
  );
}

export default App;
