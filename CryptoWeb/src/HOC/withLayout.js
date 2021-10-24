import "./withLayout.scss";
import Header from "../components/Organisms/Header/Header";

function withLayout(WrappedComponent) {
  function WrapperComponent({ ...props }) {
    return (
      <>
        <main>
          <Header />
          <WrappedComponent {...props} />
        </main>
      </>
    );
  }
  return WrapperComponent;
}

export default withLayout;
