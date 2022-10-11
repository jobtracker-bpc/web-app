interface AppProps {
  name: string;
}

const App: React.FC<AppProps> = (props) => {
  const { name } = props;

  return <div className="bg-white">Hello</div>;
};

export default App;
