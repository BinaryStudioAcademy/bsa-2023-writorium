import avatar from '~/assets/img/user-avatar.svg';

const Header: React.FC = () => (
  <header>
    <h4>WRITORIUM</h4>
    <img src={avatar} alt="avatar" />
  </header>
);

export { Header };
