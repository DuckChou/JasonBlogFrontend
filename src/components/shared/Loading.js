import Spinner from "react-bootstrap/Spinner";

export default function Loading({ color }) {
  if (color === "white") {
    return (
      <div className="d-flex justify-content-center">
        <Spinner variant="light" animation="grow" size="sm" className="mx-2" />
        <Spinner variant="light" animation="grow" size="sm" className="mx-2" />
        <Spinner variant="light" animation="grow" size="sm" className="mx-2" />
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center">
      <Spinner variant="primary" animation="grow" size="sm" className="mx-2" />
      <Spinner variant="primary" animation="grow" size="sm" className="mx-2" />
      <Spinner variant="primary" animation="grow" size="sm" className="mx-2" />
    </div>
  );
}
