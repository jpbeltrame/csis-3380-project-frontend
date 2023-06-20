import './Header.css';

function Header() {
  const routes = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
  ];

  const menuItens = routes.map((r) => <li><a href={r.path}>{r.name}</a></li>);
  return (
    <div className="header">
      <span>BookTrakr</span>
      <ul>
        {menuItens}
      </ul>
    </div>
  );
}

export default Header;
